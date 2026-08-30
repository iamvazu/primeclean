// Prime Clean — shared site behavior
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileNav.classList.toggle('open');
      var expanded = mobileNav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close when clicking any nav link
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileNav.contains(e.target) && !toggle.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Segmented quote form toggle (Commercial vs Government)
  var tabButtons = document.querySelectorAll('.form-toggle button');
  var panels = document.querySelectorAll('[data-form-panel]');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var target = btn.getAttribute('data-target');
      panels.forEach(function (p) {
        p.style.display = (p.getAttribute('data-form-panel') === target) ? 'block' : 'none';
      });
    });
  });

  // Basic client-side submit handling (no backend wired up yet)
  var forms = document.querySelectorAll('form[data-quote-form]');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Thanks — this form is a working draft. Connect it to your email or CRM before launch.';
        note.style.display = 'block';
      }
    });
  });

  // Scroll-reveal: fade + rise elements into view as the user scrolls.
  var revealSelectors = [
    '.step', '.vert-card', '.testi-card', '.reason-card',
    '.feature-panel', '.stat-strip .stat-cell', '.city-grid a',
    '.doc-card', '.trust-float'
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(','));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length && !reduceMotion && 'IntersectionObserver' in window) {
    revealEls.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 90) + 'ms';
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // No IntersectionObserver support or reduced-motion preference: show immediately.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
});
