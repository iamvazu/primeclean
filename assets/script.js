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
                🏢 <b>Prime Clean</b> operations dispatch has been notified to conduct your walkthrough and prepare your Cleanliness &amp; Compliance Score.
              </div>

              <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:16px">
                <a class="btn btn-gold btn-sm" href="tel:14155728733">Call Prime Clean: (415) 572-8733</a>
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


  // ---------- Universal Pricing Calculator Component ----------
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

  function initCalc(calcContainer, isHero) {
    var freq = "3x";
    var prefix = isHero ? "hero-" : "calc-";
    var sliderEl = calcContainer.querySelector("#" + prefix + "sqft-slider") || calcContainer.querySelector("#calc-sqft-slider");
    var numEl = calcContainer.querySelector("#" + prefix + "sqft") || calcContainer.querySelector("#calc-sqft");
    var typeEl = calcContainer.querySelector("#" + prefix + "calc-type") || calcContainer.querySelector("#calc-type");
    var toggleEl = calcContainer.querySelector("#" + prefix + "freq-toggle") || calcContainer.querySelector("#calc-freq-toggle");
    var rangeEl = calcContainer.querySelector("#" + prefix + "calc-range") || calcContainer.querySelector("#calc-range");
    var sublineEl = calcContainer.querySelector("#" + prefix + "calc-subline") || calcContainer.querySelector("#calc-subline");
    var chipSqft = calcContainer.querySelector("#" + prefix + "chip-sqft") || calcContainer.querySelector("#chip-sqft");
    var chipType = calcContainer.querySelector("#" + prefix + "chip-type") || calcContainer.querySelector("#chip-type");
    var chipFreq = calcContainer.querySelector("#" + prefix + "chip-freq") || calcContainer.querySelector("#chip-freq");
    var ctaWalkthrough = calcContainer.querySelector("#" + prefix + "calc-cta") || calcContainer.querySelector("#calc-cta-walkthrough");
    var ctaQuote = calcContainer.querySelector("#calc-cta-quote");

    function roundTo(n, step){ return Math.round(n/step)*step; }
    function fmt(n){ return "$" + Math.round(n).toLocaleString("en-US"); }

    function compute(){
      if (!typeEl) return null;
      var rawVal = numEl ? numEl.value : (sliderEl ? sliderEl.value : 5000);
      var sqft = Math.max(500, Math.min(500000, parseInt(rawVal,10) || 5000));
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
      if (rangeEl) rangeEl.innerHTML = fmt(r.low) + " – " + fmt(r.high) + (isHero ? '<span style="font-size:.8rem;font-weight:600;color:var(--ink-soft)"> /mo</span>' : '');
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
    } else if (sliderEl) {
      sliderEl.addEventListener("input", renderCalc);
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

  var heroCalc = document.querySelector('#hero-pricing-calculator, .hero-calc-card');
  if (heroCalc) initCalc(heroCalc, true);

  var gridCalc = document.querySelector('.calc-grid');
  if (gridCalc) initCalc(gridCalc, false);


  // ---------- Careers Form & Resume Upload Handler ----------
  var careersForm = document.getElementById('careers-application-form');
  if (careersForm) {
    var resumeInput = document.getElementById('app-resume-file');
    var resumeDropzone = document.getElementById('resume-dropzone');
    var resumeInfo = document.getElementById('resume-file-info');
    var resumeNameSpan = document.getElementById('resume-file-name');
    var resumeRemoveBtn = document.getElementById('resume-remove-btn');
    var positionSelect = document.getElementById('app-position');
    var submitBtn = document.getElementById('careers-submit-btn');
    var statusNote = document.getElementById('app-status-note');
    var successCard = document.getElementById('careers-success-card');

    var selectedResumeData = null;
    var selectedResumeName = null;
    var selectedResumeType = null;

    // 1-click apply buttons from job cards
    document.querySelectorAll('.apply-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        var role = btn.getAttribute('data-role');
        if (positionSelect && role) {
          positionSelect.value = role;
        }
        var formSection = document.getElementById('apply-form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    function handleFile(file) {
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please upload a smaller document.');
        return;
      }
      selectedResumeName = file.name;
      selectedResumeType = file.type;
      
      var reader = new FileReader();
      reader.onload = function(e) {
        var base64 = e.target.result.split(',')[1];
        selectedResumeData = base64;
        if (resumeNameSpan) resumeNameSpan.textContent = '📄 ' + file.name + ' (' + (Math.round(file.size/1024)) + ' KB)';
        if (resumeInfo) resumeInfo.style.display = 'flex';
        if (resumeDropzone) resumeDropzone.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }

    if (resumeInput) {
      resumeInput.addEventListener('change', function(e){
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files[0]);
        }
      });
    }

    if (resumeDropzone) {
      ['dragenter', 'dragover'].forEach(function(evt){
        resumeDropzone.addEventListener(evt, function(e){
          e.preventDefault();
          resumeDropzone.classList.add('dragover');
        });
      });
      ['dragleave', 'drop'].forEach(function(evt){
        resumeDropzone.addEventListener(evt, function(e){
          e.preventDefault();
          resumeDropzone.classList.remove('dragover');
        });
      });
      resumeDropzone.addEventListener('drop', function(e){
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (resumeRemoveBtn) {
      resumeRemoveBtn.addEventListener('click', function(){
        selectedResumeData = null;
        selectedResumeName = null;
        selectedResumeType = null;
        if (resumeInput) resumeInput.value = '';
        if (resumeInfo) resumeInfo.style.display = 'none';
        if (resumeDropzone) resumeDropzone.style.display = 'block';
      });
    }

    careersForm.addEventListener('submit', async function(e){
      e.preventDefault();
      
      var name = document.getElementById('app-name')?.value;
      var email = document.getElementById('app-email')?.value;
      var phone = document.getElementById('app-phone')?.value;
      var city = document.getElementById('app-city')?.value;
      var position = document.getElementById('app-position')?.value;
      var availability = document.getElementById('app-avail')?.value;
      var experience = document.getElementById('app-exp')?.value;
      var authCheck = document.getElementById('app-auth')?.checked;
      var message = document.getElementById('app-msg')?.value;

      if (!name || !email || !phone || !position) {
        alert('Please fill out all required fields.');
        return;
      }

      if (!authCheck) {
        alert('Please confirm that you are legally authorized to work in the United States.');
        return;
      }

      var payload = {
        name: name,
        email: email,
        phone: phone,
        city: city,
        position: position,
        availability: availability,
        experience: experience,
        work_auth: authCheck,
        message: message,
        resume_filename: selectedResumeName,
        resume_data: selectedResumeData,
        resume_type: selectedResumeType
      };

      var originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Submitting Application & Resume...';
      }
      if (statusNote) statusNote.style.display = 'none';

      try {
        var response = await fetch('/api/careers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        var result = await response.json().catch(function(){ return {}; });

        if (response.ok && (result.success || result.message)) {
          careersForm.style.display = 'none';
          if (successCard) {
            successCard.style.display = 'block';
            successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error(result.error || 'Server error occurred.');
        }
      } catch (err) {
        console.error('Application submission error:', err);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
        if (statusNote) {
          statusNote.innerHTML = '⚠️ Note: Direct server dispatch encountered an issue. You can also email your resume directly to <a href="mailto:jackie@primecleanba.com" style="color:var(--blue-700);text-decoration:underline;">jackie@primecleanba.com</a>.';
          statusNote.style.display = 'block';
        }
      }
    });
  }


  // Scroll-reveal: fade + rise elements into view as the user scrolls.
  var revealSelectors = [
    '.step', '.vert-card', '.testi-card', '.reason-card',
    '.feature-panel', '.stat-strip .stat-cell', '.city-grid a',
    '.doc-card', '.trust-float', '.job-card'
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

