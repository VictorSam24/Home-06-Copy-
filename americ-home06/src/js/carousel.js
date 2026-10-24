// Looping autoplay carousel, matching the reference's Swiper settings:
// autoplay 5s, 500ms slide, loop, no arrows or dots. Slides per view come
// from the CSS custom property --per-view so breakpoints stay in CSS.

const DELAY = 5000;
const SPEED = 500;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function makeClone(slide) {
  const clone = slide.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.dataset.clone = '';
  clone.querySelectorAll('a, button, [tabindex]').forEach((el) => (el.tabIndex = -1));
  return clone;
}

export function initCarousel(root) {
  const track = root.querySelector('.carousel__track');
  const slides = [...track.children];
  const count = slides.length;
  if (count < 2) return;

  // One full set of clones on each side lets us loop seamlessly.
  slides.forEach((s) => track.append(makeClone(s)));
  [...slides].reverse().forEach((s) => track.prepend(makeClone(s)));

  let index = count;
  let timer = null;
  let paused = false;
  let inView = false;

  const slideWidth = () => track.children[0].getBoundingClientRect().width;

  function go(i, animate = true) {
    index = i;
    track.style.transition = animate ? `transform ${SPEED}ms ease` : 'none';
    track.style.transform = `translate3d(${-index * slideWidth()}px, 0, 0)`;
  }

  track.addEventListener('transitionend', () => {
    if (index >= count * 2) go(index - count, false);
    else if (index < count) go(index + count, false);
  });

  function schedule() {
    clearInterval(timer);
    if (reducedMotion.matches) return;
    timer = setInterval(() => {
      if (!paused && inView && !document.hidden) go(index + 1);
    }, DELAY);
  }

  // Pause while hovered or focused (WCAG 2.2.2 — there are no visible controls).
  root.addEventListener('mouseenter', () => (paused = true));
  root.addEventListener('mouseleave', () => (paused = false));
  root.addEventListener('focusin', () => (paused = true));
  root.addEventListener('focusout', () => (paused = false));

  new IntersectionObserver(([entry]) => (inView = entry.isIntersecting)).observe(root);

  // Pointer swipe
  let startX = 0;
  let deltaX = 0;
  let dragging = false;
  root.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    deltaX = 0;
    track.style.transition = 'none';
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 5) root.classList.add('is-dragging');
    track.style.transform = `translate3d(${-index * slideWidth() + deltaX}px, 0, 0)`;
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    const threshold = slideWidth() / 5;
    if (deltaX < -threshold) go(index + 1);
    else if (deltaX > threshold) go(index - 1);
    else go(index);
    requestAnimationFrame(() => root.classList.remove('is-dragging'));
  });
  // A drag should not follow the link under the pointer.
  root.addEventListener('click', (e) => {
    if (Math.abs(deltaX) > 5) e.preventDefault();
  }, true);

  window.addEventListener('resize', () => go(index, false));
  reducedMotion.addEventListener('change', schedule);

  go(index, false);
  schedule();
}
