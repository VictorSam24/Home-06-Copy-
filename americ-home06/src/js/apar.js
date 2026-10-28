// Apar Innosys pages: sticky header, back-to-top, scroll reveal and the
// mobile menu. Carousel, counters and lightbox from main.js aren't needed here.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Sticky header + back to top --------------------------------------
function initHeader() {
  const header = document.querySelector('[data-header]');
  const toTop = document.querySelector('[data-to-top]');
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-stuck', y > 300);
    toTop.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
}

// ---- Scroll reveal (fadeInUp) -----------------------------------------
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

// ---- Mobile menu: focus trap, inert page, Escape to close ---------------
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('[data-burger]');
  if (!menu || !burger) return;

  // Same links as the desktop nav, so the two never drift apart.
  const list = menu.querySelector('[data-mobile-nav]');
  document.querySelectorAll('.nav__list .nav__link').forEach((link) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.getAttribute('href');
    a.textContent = link.textContent.trim();
    li.className = 'mobile-nav__row';
    li.append(a);
    list.append(li);
  });

  const outside = [...document.body.children].filter((el) => el !== menu && el.tagName !== 'SCRIPT');
  const panel = menu.querySelector('.offcanvas__panel');

  const open = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    outside.forEach((el) => (el.inert = true));
    document.body.style.overflow = 'hidden';
    panel.querySelector(FOCUSABLE)?.focus();
  };
  const close = () => {
    if (!menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    outside.forEach((el) => (el.inert = false));
    document.body.style.overflow = '';
    burger.focus();
  };

  burger.addEventListener('click', open);
  menu.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', close));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) close();
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    const items = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Leaving the mobile breakpoint with the menu open would strand the inert page.
  window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => e.matches && close());
}

initHeader();
initReveal();
initMobileMenu();
