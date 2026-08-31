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
                👤 <b>Jackie</b> and our operations team have been notified to conduct your walkthrough and prepare your Cleanliness &amp; Compliance Score.
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


  // ---------- Pricing Calculator Component ----------
  var calcContainer = document.querySelector('.calc-grid');
  if (calcContainer) {
    var SIZE_BRACKETS = [
      { max: 5000,      low: 0.16, high: 0.26 },
      { max: 20000,     low: 0.11, high: 0.18 },
      { max: 50000,     low: 0.09, high: 0.15 },
      { max: Infinity,  low: 0.08, high: 0.13 }
    ];
    var FREQ_MULT   = { "1x": 0.55, "2x": 0.78, "3x": 1.0, "5x": 1.35 };
    var FREQ_VISITS = { "1x": 4.33, "2x": 8.67, "3x": 13,  "5x": 21.7 };
    var FREQ_LABEL  = { "1x": "1x / week", "2x": "2x / week", "3x": "3x / week", "5x": "5x / week" };
    var TYPE_MULT = {
      "Office": 1.0,
      "Corporate Office": 1.0,
      "Retail / Showroom": 1.0,
      "Property Management / Multifamily": 0.95,
      "Education / School": 1.05,
      "Financial Institution": 1.1,
      "Industrial / Warehouse": 0.6,
      "Medical / Clinical": 1.65,
      "Other": 1.0
    };
    var MONTHLY_MIN = 650;

    var freq = "3x";
    var sliderEl = calcContainer.querySelector("#calc-sqft-slider");
    var numEl = calcContainer.querySelector("#calc-sqft");
    var typeEl = calcContainer.querySelector("#calc-type");
    var toggleEl = calcContainer.querySelector("#calc-freq-toggle");
    var rangeEl = calcContainer.querySelector("#calc-range");
    var sublineEl = calcContainer.querySelector("#calc-subline");
    var chipSqft = calcContainer.querySelector("#chip-sqft");
    var chipType = calcContainer.querySelector("#chip-type");
    var chipFreq = calcContainer.querySelector("#chip-freq");
    var ctaWalkthrough = calcContainer.querySelector("#calc-cta-walkthrough");
    var ctaQuote = calcContainer.querySelector("#calc-cta-quote");

    function roundTo(n, step){ return Math.round(n/step)*step; }
    function fmt(n){ return "$" + Math.round(n).toLocaleString("en-US"); }

    function compute(){
      if (!numEl || !typeEl) return null;
      var sqft = Math.max(500, Math.min(500000, parseInt(numEl.value,10) || 8000));
      var type = typeEl.value;
      var bracket = SIZE_BRACKETS.find(function(b){ return sqft <= b.max; }) || SIZE_BRACKETS[SIZE_BRACKETS.length-1];
      var typeMult = TYPE_MULT[type] != null ? TYPE_MULT[type] : 1.0;
      var freqMult = FREQ_MULT[freq] || 1.0;
      var low = sqft * bracket.low * freqMult * typeMult;
      var high = sqft * bracket.high * freqMult * typeMult;
      low = Math.max(MONTHLY_MIN, low);
      high = Math.max(MONTHLY_MIN + 100, high);
      low = roundTo(low, low < 2000 ? 10 : 50);
      high = roundTo(high, high < 2000 ? 10 : 50);
      if(high <= low) high = low + Math.max(50, Math.round(low*0.15));
      var visits = FREQ_VISITS[freq] || 13;
      return { low: low, high: high, perVisitLow: low/visits, perVisitHigh: high/visits, visits: visits, sqft: sqft, type: type };
    }

    function renderCalc(){
      var r = compute();
      if (!r) return;
      if (rangeEl) rangeEl.textContent = fmt(r.low) + " – " + fmt(r.high);
      if (sublineEl) {
        sublineEl.textContent = "≈ " + fmt(r.perVisitLow) + " – " + fmt(r.perVisitHigh) + " per visit · " + Math.round(r.visits) + " visits/month";
      }
      if (chipSqft) chipSqft.textContent = r.sqft.toLocaleString("en-US") + " sq ft";
      if (chipType) chipType.textContent = r.type;
      if (chipFreq) chipFreq.textContent = FREQ_LABEL[freq] || freq;

      var params = new URLSearchParams();
      params.set("sqft", r.sqft);
      params.set("type", r.type);
      params.set("freq", FREQ_LABEL[freq] || freq);
      params.set("est", fmt(r.low) + "-" + fmt(r.high));
      var qs = "contact.html?" + params.toString() + "#quote-form";
      if (ctaWalkthrough) ctaWalkthrough.href = qs;
      if (ctaQuote && ctaQuote.getAttribute('href') && ctaQuote.getAttribute('href').includes('contact.html')) {
        ctaQuote.href = qs;
      }
    }

    if (sliderEl && numEl) {
      sliderEl.addEventListener("input", function(){ numEl.value = sliderEl.value; renderCalc(); });
      numEl.addEventListener("input", function(){
        var v = parseInt(numEl.value,10) || 0;
        sliderEl.value = Math.max(500, Math.min(100000, v));
        renderCalc();
      });
    }
    if (typeEl) {
      typeEl.addEventListener("change", renderCalc);
    }
    if (toggleEl) {
      toggleEl.querySelectorAll("button").forEach(function(btn){
        btn.addEventListener("click", function(){
          toggleEl.querySelectorAll("button").forEach(function(b){ b.classList.remove("active"); });
          btn.classList.add("active");
          freq = btn.getAttribute("data-freq");
          renderCalc();
        });
      });
    }

    renderCalc();
  }

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
