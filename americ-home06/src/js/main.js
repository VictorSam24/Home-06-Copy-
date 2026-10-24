import { initCarousel } from './carousel.js';
import { initOverlays } from './overlays.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Sticky header: the white bar slides in once the hero header is gone ----
function initHeader() {
  const header = document.querySelector('[data-header]');
  const toTop = document.querySelector('[data-to-top]');
  let stuck = false;
  const update = () => {
    const y = window.scrollY;
    const shouldStick = y > 300;
    if (shouldStick !== stuck) {
      stuck = shouldStick;
      header.classList.toggle('is-stuck', stuck);
    }
    toTop.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
}

// ---- Portfolio: hovering or focusing a row swaps the featured image ----
function initPortfolio() {
  const root = document.querySelector('[data-portfolio]');
  if (!root) return;
  const rows = [...root.querySelectorAll('.portfolio-row')];
  const images = [...root.querySelectorAll('.portfolio-stage img')];
  const activate = (i) => {
    rows.forEach((r, j) => r.classList.toggle('is-active', i === j));
    images.forEach((img, j) => img.classList.toggle('is-active', i === j));
  };
  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => activate(i));
    row.addEventListener('focusin', () => activate(i));
  });
}

// ---- Counters: 1 → target over 2s once visible ----
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  const run = (el) => {
    const target = Number(el.dataset.count);
    if (reducedMotion) { el.textContent = target; return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 2000, 1);
      el.textContent = Math.max(1, Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // Clones share the same target; start every copy together.
      document.querySelectorAll(`[data-count="${entry.target.dataset.count}"]`).forEach((el) => {
        if (!el.dataset.done) { el.dataset.done = '1'; run(el); }
      });
    });
  }, { threshold: 0.4 });
  els.forEach((el) => io.observe(el));
}

// ---- Scroll reveal (fadeInUp) ----
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });
  els.forEach((el) => io.observe(el));
}

// ---- Contact form: client-side validation only (no backend in this build) ----
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('.form__status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll('.field').forEach((field) => {
      const ok = field.checkValidity() && field.value.trim() !== '';
      field.setAttribute('aria-invalid', String(!ok));
      if (!ok && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = 'Please fill in your name, a valid email and a message.';
      firstInvalid.focus();
      return;
    }
    status.textContent = 'Thanks — your message is ready to send. Connect a form endpoint to deliver it.';
    form.reset();
  });
  form.addEventListener('input', (e) => e.target.removeAttribute('aria-invalid'));
}

initHeader();
document.querySelectorAll('[data-carousel]').forEach(initCarousel);
initPortfolio();
initCounters();
initReveal();
initOverlays();
initContactForm();
