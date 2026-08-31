# Prime Clean — Commercial & Government Janitorial Services Website

Official website and digital lead generation engine for **Prime Clean** (https://primecleanweb.vercel.app), an East Bay & San Francisco commercial cleaning contractor specializing in Class-A office buildings, medical/clinical facilities, industrial warehouses, retail spaces, and certified government/municipal facilities.

---

## 🏢 Company Profile & Credentials
* **Entity**: Prime Clean (WOSB & California Certified Small Business)
* **Coverage**: San Francisco & East Bay Area (Contra Costa, Alameda, Solano, and San Francisco Counties)
* **Certifications & Registrations**:
  * **SBA WOSB**: Women-Owned Small Business Certified
  * **California Small Business (SB)**: Certification #`2048444`
  * **Cal eProcure**: Active Registered State Vendor
  * **DIR Janitorial Contractor**: Registration No. `JS-LR-1001318678`
  * **Insurance**: $2,000,000 Commercial General Liability & Full Bonding
* **Key Service Lines**: Daily Janitorial, Day Porters, Medical Disinfection, VCT Strip & Wax, Hot-Water Carpet Extraction, Window Detailing, and Post-Construction Turnover.

---

## 🚀 Key Features & Capabilities

### 1. High-Converting Landing & Marketing Pages
* **`index.html` (Homepage)**: 
  * Dual-track hero for **Facility/Office Managers** vs. **Government Contracting Officers**.
  * Interactive **Instant Estimate Cost Calculator** with live square footage sliders, frequency toggles, and instant scope generation.
  * **Infinite Logo Marquee Slider**: Smooth continuous hardware-accelerated carousel displaying official agency badges and certifications (*SBA, CA.gov, DIR, Caltrans, DMV, CDCR, Alameda ARPD*).
  * **3-Step Onboarding Process** with animated step transitions.
  * **Digital Service Log Interactive Live Mockup** highlighting electronic shift check-in and quality scorecards.
  * **Authentic Verified Google Reviews** featuring real facility directors, 5-star badges, and timestamps.
  * Uniformed team photography showcasing navy **Prime Clean** branded apparel.

### 2. Core Service & Industry Architecture
* **`services.html`**:
  * Interactive **Expandable Core Services Accordion** with detailed scopes of work, quality checklists, and half-cut image cards (*Daily Janitorial, Deep Cleaning, Floor Care, Disinfection, Window Cleaning, Post-Construction*).
* **`industries/` (Dedicated Industry Pages)**:
  * [`commercial-office-cleaning.html`](industries/commercial-office-cleaning.html)
  * [`medical-clinic-cleaning.html`](industries/medical-clinic-cleaning.html)
  * [`industrial-warehouse-cleaning.html`](industries/industrial-warehouse-cleaning.html)
  * [`retail-storefront-cleaning.html`](industries/retail-storefront-cleaning.html)
  * [`property-management-cleaning.html`](industries/property-management-cleaning.html)
  * [`school-educational-cleaning.html`](industries/school-educational-cleaning.html)
  * [`bank-financial-cleaning.html`](industries/bank-financial-cleaning.html)
  * [`government-facility-janitorial.html`](industries/government-facility-janitorial.html)

### 3. Public Sector & Government Contracting Hub
* **`government.html`**:
  * Comprehensive procurement capabilities statement.
  * NAICS codes list (`561720`, `561740`, `561790`, `238990`), PSC codes (`S201`), set-aside differentiators, past performance credentials, and downloadable capability statement PDF link.

### 4. Interactive Tools & Conversion Calculators
* **`pricing.html`**: Transparent East Bay commercial cleaning rate estimator with per-visit and monthly budget breakdowns.
* **`tools/walkthrough-scorecard.html`**: Interactive 100-point facility inspection scorecard tool for facility managers.
* **`gallery.html`**: Before & After slider visual transformations (VCT floor strip & wax, commercial restroom sanitation).
* **`careers.html`**: Transparent career portal highlighting W-2 pay rates ($20–$28/hr), paid training, shift schedules, and online applicant intake.

### 5. Content Marketing & SEO Authority Hub
* **`blog/` (12 In-Depth Authority Guides)**:
  * Commercial cleaning cost benchmarks & pricing calculators.
  * Day Porter vs. Night Janitorial comparative guides.
  * Commercial floor care (VCT strip & wax protocols).
  * Janitorial RFP writing guide & free downloadable scope templates.
  * Medical office cleaning standards & CDC/OSHA compliance.
  * Government janitorial contracting with WOSB & CA SB set-asides.
  * Post-construction cleanup checklists.
  * Restroom sanitation and odor remediation protocols.

### 6. Programmatic SEO (pSEO) Engine
* **`locations/` (176 City + Service Target Pages)**:
  * High-intent localized pages for all East Bay cities (*Richmond, Oakland, Berkeley, Emeryville, Alameda, San Leandro, Hayward, Fremont, Concord, Walnut Creek, Martinez, Benicia, Albany, etc.*).
  * Auto-generated via `scripts/generate_pseo.js` with structured Schema.org JSON-LD local business markup.
  * Comprehensive [`sitemap.xml`](sitemap.xml) indexing 198+ search-optimized URLs.

---

## 🛠️ Technology Stack & Architecture

* **Markup & Frontend**: Semantic HTML5, Vanilla JavaScript (ES6+), Modern Vanilla CSS (Design Tokens, Responsive Flexbox/CSS Grid, Glassmorphism, Micro-Animations).
* **Analytics**: Official Vercel Web Analytics integration (`@vercel/analytics`).
* **API Endpoints**: Serverless API routes in `/api/` (e.g. `api/schedule-walkthrough.js`).
* **Asset Optimization**: High-resolution imagery, SVG icons, and responsive WebP/JPEG formats.
* **SEO & Compliance**: Schema.org LocalBusiness, BreadcrumbList, Service, and FAQ schemas, OpenGraph meta tags, `robots.txt`, and `llms.txt`.

---

## 📁 Repository Structure

```
├── .gitignore
├── README.md                                  # Repository documentation
├── index.html                                 # Homepage
├── about.html                                 # Company Story, Philosophy, & Team
├── services.html                              # Interactive Services & Accordion Hub
├── pricing.html                               # Pricing Calculator & Rate Card
├── government.html                            # Government Contracting & Capabilities
├── gallery.html                               # Before & After Visual Gallery
├── careers.html                               # Careers & Job Applications
├── contact.html                               # Quote & Walkthrough Booking
├── service-areas.html                         # Service Coverage Map & City Directory
├── commercial-cleaning-richmond-ca.html       # Primary Hub Location Page
├── privacy-policy.html                        # CCPA/Privacy Policy
├── cookie-policy.html                         # Cookie Policy
├── terms-of-service.html                      # Terms of Service
├── robots.txt                                 # Search Engine Crawling Instructions
├── sitemap.xml                                # 198+ URL Search Engine Sitemap
├── llms.txt                                   # AI & LLM Knowledge Index
├── package.json                               # Dependencies (@vercel/analytics)
│
├── api/                                       # Serverless API Handlers
│   └── schedule-walkthrough.js                # Walkthrough booking endpoint
│
├── assets/
│   ├── style.css                              # Main CSS Design System
│   ├── script.js                              # Interactive Site Script & Handlers
│   ├── images/                                # High-Res Photography & Assets
│   └── logos/                                 # Official Agency & Certification Logos
│
├── blog/                                      # SEO Authority Articles (12 Guides)
│   ├── index.html
│   ├── commercial-cleaning-cost-richmond-ca-guide.html
│   ├── commercial-floor-care-strip-wax-tile-maintenance.html
│   ├── day-porter-vs-night-janitorial-commercial-buildings.html
│   ├── government-janitorial-contracting-wosb-california.html
│   ├── green-commercial-cleaning-leed-certification-california.html
│   ├── how-to-choose-commercial-cleaning-contractor-east-bay.html
│   ├── how-to-prepare-for-facility-cleaning-walkthrough.html
│   ├── janitorial-rfp-template-scope-of-work-guide.html
│   ├── medical-office-cleaning-standards-contra-costa.html
│   ├── post-construction-cleaning-checklist-bay-area.html
│   ├── restroom-sanitation-odor-control-commercial-offices.html
│   └── warehouse-industrial-facility-cleaning-checklist.html
│
├── industries/                                # 8 Specific Industry Service Pages
│   ├── bank-financial-cleaning.html
│   ├── commercial-office-cleaning.html
│   ├── government-facility-janitorial.html
│   ├── industrial-warehouse-cleaning.html
│   ├── medical-clinic-cleaning.html
│   ├── property-management-cleaning.html
│   ├── retail-storefront-cleaning.html
│   └── school-educational-cleaning.html
│
├── locations/                                 # 176 Programmatic City Landing Pages
├── tools/                                     # Interactive Facility Inspection Tools
│   └── walkthrough-scorecard.html
│
├── templates/                                 # HTML Generation Templates
│   └── location_service_template.html
│
└── scripts/                                   # Automation & Build Maintenance
    ├── generate_pseo.js                       # Generates 176 location pages + sitemap.xml
    ├── generate_industry_pages.js             # Generates industry landing pages
    ├── unify_headers.js                       # Syncs unified navigation header
    ├── unify_footers.js                       # Syncs unified footer & contact credentials
    └── inject_vercel_analytics.js             # Injects Vercel Web Analytics
```

---

## ⚡ Automation & Build Scripts

To maintain complete consistency across all 218+ pages, run the automated generator scripts using Node.js:

```bash
# 1. Synchronize the unified navigation header across all pages
node scripts/unify_headers.js

# 2. Synchronize the unified footer and certifications across all pages
node scripts/unify_footers.js

# 3. Regenerate all 8 industry landing pages
node scripts/generate_industry_pages.js

# 4. Regenerate all 176 programmatic location landing pages and update sitemap.xml
node scripts/generate_pseo.js
```

---

## 🌐 Deployment & Git Remotes

The project is hosted and automatically deployed to Vercel upon pushing to the `main` branch:

* **Production URL**: [https://primecleanweb.vercel.app](https://primecleanweb.vercel.app)
* **GitHub Remotes**:
  * `origin`: `https://github.com/iamvazu/primeclean.git`
  * `private-web`: `https://github.com/iamvazu/primecleanweb.git`

```bash
# Push updates to both remotes:
git add .
git commit -m "Describe your update"
git push origin main
git push private-web main
```

---

## 📞 Contact & Business Inquiries
* **Phone**: [(415) 572-8733](tel:14155728733)
* **Email**: `info@primecleansf.com`
* **Address**: 1221 Brickyard Cove Rd, Suite 200, Richmond, CA 94801
* **Service Hours**: 24/7 Dispatch & Operations | Emergency Response Available
