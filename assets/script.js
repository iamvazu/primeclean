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

  // Set minimum date for walkthrough date inputs (tomorrow or next business day)
  var dateInputs = document.querySelectorAll('input[type="date"]');
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var minDateStr = tomorrow.toISOString().split('T')[0];
  dateInputs.forEach(function (input) {
    input.setAttribute('min', minDateStr);
  });

  // Schedule Walkthrough submission handler
  var forms = document.querySelectorAll('form[data-quote-form]');
  forms.forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      var note = form.querySelector('.form-note');
      
      // Extract form data
      var formData = new FormData(form);
      var payload = {};
      formData.forEach(function (value, key) {
        payload[key] = value;
      });

      // Show loading state
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Scheduling 15-Min Walkthrough...';
      }
      if (note) {
        note.style.display = 'none';
      }

      try {
        var response = await fetch('/api/schedule-walkthrough', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        var result = await response.json().catch(function () { return {}; });

        if (response.ok && result.success !== false) {
          // Render rich confirmation card
          var formCard = form.closest('.form-card');
          var bookedName = payload.name || 'Valued Client';
          var bookedDate = payload.preferred_date || 'Flexible / Next Available';
          var bookedTime = payload.preferred_time || 'Flexible';
          var bookedAddress = payload.address || 'Facility on record';
          var bookedOrg = payload.company || payload.agency || 'Commercial Facility';

          var successHtml = `
            <div class="form-success-card">
              <div class="form-success-header">
                <div class="form-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div>
                  <span class="eyebrow on-light" style="color:var(--gold-dark);font-size:.78rem">Confirmed Request</span>
                  <h3>Walkthrough Request Received!</h3>
                </div>
              </div>
              <p style="color:var(--ink-soft);font-size:.95rem;margin-bottom:14px">
                Thank you, <strong>${bookedName}</strong>. Your request for a <strong>Free 15-Minute On-Site Walkthrough</strong> has been submitted.
              </p>
              
              <div class="form-success-details">
                <div class="form-success-row">
                  <span class="label">📅 Date:</span>
                  <span class="val">${bookedDate}</span>
                </div>
                <div class="form-success-row">
                  <span class="label">⏰ Time:</span>
                  <span class="val">${bookedTime} (15 min)</span>
                </div>
                <div class="form-success-row">
                  <span class="label">📍 Address:</span>
                  <span class="val">${bookedAddress}</span>
                </div>
                <div class="form-success-row">
                  <span class="label">🏢 Facility:</span>
                  <span class="val">${bookedOrg}</span>
                </div>
              </div>

              <div class="form-success-note">
                📧 <b>Confirmation Sent:</b> A confirmation summary has been sent from <b>info@primecleanba.com</b> to <b>${payload.email}</b>.<br>
                👤 <b>Jackie</b> (<b>jackie@primecleanba.com</b>) has been notified to conduct your walkthrough and prepare your Cleanliness &amp; Compliance Score.
              </div>

              <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px">
                <a class="btn btn-gold btn-sm" href="tel:14155728733">Call Jackie: (415) 572-8733</a>
                <button type="button" class="btn btn-outline btn-sm" onclick="window.location.reload()">Book Another Visit</button>
              </div>
            </div>
          `;

          if (formCard) {
            formCard.innerHTML = successHtml;
            formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error(result.error || 'Server returned an error.');
        }
      } catch (err) {
        console.error('Walkthrough submission error:', err);
        if (submitBtn) {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        if (note) {
          note.innerHTML = '⚠️ Note: Direct server dispatch encountered an issue. Please call us directly at <a href="tel:14155728733" style="color:var(--blue-700);text-decoration:underline;">(415) 572-8733</a> or email <a href="mailto:info@primecleanba.com" style="color:var(--blue-700);text-decoration:underline;">info@primecleanba.com</a>.';
          note.style.display = 'block';
        }
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
