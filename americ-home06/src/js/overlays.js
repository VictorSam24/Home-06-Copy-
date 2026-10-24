// Off-canvas panels, search overlay and video lightbox.

const desktop = window.matchMedia('(min-width: 1025px)');
let lastTrigger = null;

function focusFirst(container) {
  (container.querySelector('input') || container.querySelector('a[href], button'))?.focus();
}

function open(el, trigger) {
  lastTrigger = trigger || document.activeElement;
  el.classList.add('is-open');
  el.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  trigger?.setAttribute('aria-expanded', 'true');
  setTimeout(() => focusFirst(el), 50);
}

function close(el) {
  el.classList.remove('is-open');
  el.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.querySelector('[data-burger]')?.setAttribute('aria-expanded', 'false');
  lastTrigger?.focus();
}

// Build the mobile menu from the desktop nav so the two never drift apart.
function buildMobileNav() {
  const list = document.querySelector('[data-mobile-nav]');
  document.querySelectorAll('.nav__list > .nav__item').forEach((item, i) => {
    const link = item.querySelector('.nav__link');
    const sub = item.querySelector('.dropdown');
    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'mobile-nav__row';
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.textContent = link.textContent.trim();
    row.append(a);
    li.append(row);
    if (sub) {
      const id = `mnav-sub-${i}`;
      const toggle = document.createElement('button');
      toggle.className = 'icon-btn mobile-nav__toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', id);
      toggle.setAttribute('aria-label', `${a.textContent} submenu`);
      toggle.innerHTML = '<svg viewBox="0 0 10 6"><use href="#i-caret"/></svg>';
      const ul = sub.cloneNode(true);
      ul.className = 'sub';
      ul.id = id;
      ul.hidden = true;
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        ul.hidden = expanded;
      });
      row.append(toggle);
      li.append(ul);
    }
    list.append(li);
  });
}

export function initOverlays() {
  const info = document.getElementById('info-panel');
  const mobile = document.getElementById('mobile-menu');
  const search = document.getElementById('search');
  const lightbox = document.querySelector('[data-lightbox]');
  const burger = document.querySelector('[data-burger]');

  buildMobileNav();

  // The hamburger opens the info panel on desktop and the menu below 1025px,
  // as on the reference.
  burger.addEventListener('click', () => open(desktop.matches ? info : mobile, burger));
  document.querySelector('[data-open="search"]').addEventListener('click', (e) => open(search, e.currentTarget));

  [info, mobile, search].forEach((el) => {
    el.querySelectorAll('[data-close]').forEach((btn) => btn.addEventListener('click', () => close(el)));
  });
  mobile.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) close(mobile);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    [info, mobile, search].forEach((el) => el.classList.contains('is-open') && close(el));
  });

  // Video lightbox — YouTube is only loaded when the visitor asks for it.
  const frame = lightbox.querySelector('.lightbox__frame');
  document.querySelectorAll('[data-video]').forEach((btn) => {
    btn.addEventListener('click', () => {
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${btn.dataset.video}?autoplay=1&rel=0" title="Company video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      lightbox.showModal();
    });
  });
  lightbox.addEventListener('close', () => (frame.innerHTML = ''));
  lightbox.querySelector('[data-close]').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}
