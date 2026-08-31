const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'industries');
const cities = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'cities.json'), 'utf8'));

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6"/></svg>`;

const industriesData = [
  {
    slug: "commercial-office-cleaning",
    category: "OFFICES & CORPORATE",
    name: "Commercial Office Cleaning",
    h1: "Commercial & Class A Office Cleaning Services in the East Bay & San Francisco",
    metaTitle: "Commercial Office Cleaning Services East Bay & SF | Prime Clean",
    metaDescription: "Professional commercial office cleaning in the East Bay & San Francisco. Certified WOSB & CA Small Business providing daily janitorial, workstation sanitation, day porters & after-hours keycard service.",
    heroImage: "service_offices.jpg",
    heroAlt: "Professional commercial cleaner sanitizing executive office workstation in the Bay Area",
    badgeNumber: "Class A & B",
    badgeLabel: "Corporate Suites Serviced",
    intro: "A clean, well-maintained office is essential for employee productivity, health, and projecting executive professionalism to clients. Prime Clean provides comprehensive commercial office cleaning tailored specifically to corporate headquarters, law firms, tech campuses, financial suites, and multi-tenant office towers across the San Francisco Bay Area and East Bay.",
    differentiators: [
      {
        title: "Quiet Day Porter or Keycard After-Hours",
        desc: "Schedule service during business hours for continuous upkeep or seamless after-hours cleaning adhering to alarm and keycard protocols."
      },
      {
        title: "Digital Quality Logs on Every Shift",
        desc: "Field supervisors perform scheduled inspections and digital checklists, providing transparent audit trails for facility managers."
      },
      {
        title: "Green Seal Certified Chemistry",
        desc: "EPA-registered, eco-friendly cleaning agents that improve indoor air quality without harsh chemical odors or VOCs."
      }
    ],
    scopeItems: [
      { title: "Workstation & Desk Sanitation", desc: "Dusting surfaces, sanitizing high-touch areas, wiping monitor bezels, and disinfecting keyboard/mouse zones." },
      { title: "Conference Rooms & Whiteboard Care", desc: "Streak-free interior glass, polished conference tables, sanitized AV remotes, and reset chairs." },
      { title: "Breakroom & Executive Kitchen Hygiene", desc: "Appliance exterior sanitization (refrigerators, microwaves, dishwashers), degreased sinks, wiped counters, and restocked paper goods." },
      { title: "Restroom Deep Disinfection", desc: "Hospital-grade touchpoint disinfection, porcelain sanitization, high-pressure grout cleaning, mirror polishing, and continuous consumable restocking." },
      { title: "Comprehensive Floor Care", desc: "HEPA multi-stage vacuuming for low-pile office carpets, microfiber dust mopping, VCT strip & waxing, and periodic hot-water carpet extraction." },
      { title: "High-Touch Point Infection Control", desc: "Continuous sanitizing of doorknobs, stair railings, elevator call buttons, light switches, and shared water stations." }
    ],
    options: [
      { name: "Nightly Janitorial Service", freq: "3x – 7x / week", desc: "Thorough after-hours reset covering workstations, trash/recycling, restrooms, and floors ready for the morning opening." },
      { name: "Dedicated Day Porter", freq: "Daily 8 AM – 5 PM", desc: "Continuous daytime maintenance for high-traffic lobbies, mid-day restroom refreshes, kitchen monitoring, and meeting room resets." },
      { name: "Periodic Deep Clean Reset", freq: "Monthly / Quarterly", desc: "Carpet hot-water steam extraction, hard-floor high-speed burnishing, high-dusting of vents/light fixtures, and window glass detailing." }
    ],
    faqs: [
      {
        q: "How do you handle security and keycard access for after-hours office cleaning?",
        a: "All Prime Clean janitorial technicians are direct W-2 employees who are rigorously background-checked, bonded, and insured. We follow strict keycard, alarm arming/disarming, and perimeter lock-up protocols verified via electronic timestamps on our supervisor dispatch portal."
      },
      {
        q: "What is included in a daily commercial office cleaning scope?",
        a: "A standard daily scope includes complete trash and zero-waste recycling removal, workstation dusting, touchpoint disinfection, executive kitchen/breakroom sanitization, complete restroom deep cleaning with restocking, and HEPA vacuuming/floor mopping."
      },
      {
        q: "Do you provide day porters for busy corporate facilities?",
        a: "Yes. Our day porters provide discreet, continuous upkeep throughout the business day—keeping breakrooms spotless, refreshing restrooms between shifts, wiping conference tables, and handling sudden spills without disrupting staff."
      },
      {
        q: "Are your cleaners W-2 employees or subcontractors?",
        a: "Prime Clean employs 100% direct W-2 janitorial staff. We do not subcontract our cleaning accounts. This ensures strict accountability, standardized training, fair wages, and consistent quality."
      },
      {
        q: "What certifications does Prime Clean hold?",
        a: "Prime Clean is a certified Women-Owned Small Business (WOSB), State of California Small Business (#2048444), California Department of Industrial Relations (DIR #1001318678) registered contractor, and active vendor on SAM.gov and Cal eProcure."
      }
    ]
  },
  {
    slug: "medical-clinic-cleaning",
    category: "HEALTHCARE & CLINICAL",
    name: "Medical & Healthcare Clinic Cleaning",
    h1: "Medical, Dental & Healthcare Clinic Disinfection in the East Bay & San Francisco",
    metaTitle: "Medical Clinic Cleaning & Disinfection Services East Bay | Prime Clean",
    metaDescription: "Hospital-grade medical facility cleaning and terminal disinfection in the East Bay & SF. EPA List N disinfectants, OSHA compliance, and cross-contamination prevention for clinics & dental offices.",
    heroImage: "service_medical.jpg",
    heroAlt: "Medical clinic sanitation technician performing infection control disinfection in healthcare facility",
    badgeNumber: "EPA List N",
    badgeLabel: "Hospital-Grade Disinfection",
    intro: "Healthcare and outpatient clinical facilities demand sanitation protocols where cleanliness is a standard of patient care and regulatory compliance. Prime Clean delivers terminal cleaning, medical-grade disinfection, and strict cross-contamination control for private practices, urgent cares, dental clinics, physical therapy centers, and ambulatory surgical suites across the Bay Area.",
    differentiators: [
      {
        title: "EPA-Registered List N Disinfectants",
        desc: "Hospital-grade bactericidal, virucidal, and fungicidal chemistry with certified dwell times for total pathogen inactivation."
      },
      {
        title: "Color-Coded Microfiber System",
        desc: "Strict color-coding protocols that guarantee mop heads and towels used in restrooms never cross-contaminate clinical exam rooms."
      },
      {
        title: "OSHA & Bloodborne Pathogen Trained",
        desc: "Janitorial staff rigorously trained in PPE usage, bio-waste awareness, and healthcare infection prevention guidelines."
      }
    ],
    scopeItems: [
      { title: "Exam Room Terminal Cleaning", desc: "Detailed sanitization of patient exam tables, physician stools, counters, diagnostic equipment exteriors, and sinks." },
      { title: "Waiting Room & Reception Sterilization", desc: "High-frequency disinfection of waiting room seating, check-in touchscreens, acrylic partitions, and reception desks." },
      { title: "Color-Coded Microfiber Wipe-Downs", desc: "Separated microfiber color zones to prevent cross-contamination between restrooms, waiting areas, and treatment zones." },
      { title: "Clinical Restroom Sanitation", desc: "Medical-grade disinfection of all fixtures, touchless dispensers, grab bars, floors, and emergency pull cords." },
      { title: "HEPA Multi-Stage Floor Filtration", desc: "HEPA vacuuming capturing 99.97% of airborne particulates down to 0.3 microns, combined with disinfectant flat-mopping." },
      { title: "Bio-Waste Touchpoint Awareness", desc: "Strict adherence to facility bio-waste handling guidelines and non-porous surface antimicrobial wipe-downs." }
    ],
    options: [
      { name: "Nightly Healthcare Janitorial", freq: "5x – 7x / week", desc: "After-hours terminal disinfection and clinical reset ensuring sterile readiness for the next morning's patients." },
      { name: "High-Traffic Clinic Day Porter", freq: "Daily 8 AM – 5 PM", desc: "Continuous wipe-downs of high-turnover patient waiting areas, reception check-in counters, and staff restrooms." },
      { name: "Terminal Deep Sanitization", freq: "Weekly / Monthly", desc: "Electrostatic antimicrobial fogging, high-pressure tile steam scrubbing, and comprehensive clinical resets." }
    ],
    faqs: [
      {
        q: "What disinfection chemistry do you use for healthcare facilities?",
        a: "We utilize EPA-registered List N hospital-grade disinfectants with verified kill claims against human coronavirus, influenza, MRSA, norovirus, and bloodborne pathogens, respecting strict surface dwell times."
      },
      {
        q: "How do you prevent cross-contamination between rooms?",
        a: "We enforce an institutional color-coded microfiber towel and flat-mop system (e.g., red for clinical restrooms, yellow for lab/prep zones, blue for waiting rooms). Mop pads and towels are never shared across zones."
      },
      {
        q: "Are your cleaning technicians trained in OSHA healthcare standards?",
        a: "Yes. All healthcare cleaning team members complete comprehensive training on OSHA Bloodborne Pathogen standards (29 CFR 1910.1030), proper PPE donning/doffing, and CDC environmental infection control guidelines."
      },
      {
        q: "Can you accommodate discreet evening cleaning after clinic operating hours?",
        a: "Absolutely. We schedule clinical cleaning exclusively after patient care hours or over weekends to ensure zero interference with patient appointments and complete confidentiality."
      }
    ]
  },
  {
    slug: "industrial-warehouse-cleaning",
    category: "INDUSTRIAL & LOGISTICS",
    name: "Industrial & Warehouse Floor Care",
    h1: "Industrial, Warehouse & Logistics Center Cleaning Services in the East Bay & SF",
    metaTitle: "Industrial Warehouse Cleaning & Floor Scrubbing East Bay | Prime Clean",
    metaDescription: "Industrial warehouse cleaning, concrete floor scrubbing, and logistics facility maintenance in the East Bay & SF. Heavy-duty ride-on scrubbers, degreasing & OSHA compliance.",
    heroImage: "service_industrial.jpg",
    heroAlt: "Industrial warehouse concrete floor being scrubbed with professional ride-on machinery",
    badgeNumber: "Heavy Duty",
    badgeLabel: "Ride-On Scrubbers & Degreasers",
    intro: "High-throughput logistics hubs, manufacturing plants, distribution warehouses, and industrial parks face heavy dust accumulation, forklift tire marks, oil spills, and safety hazards. Prime Clean provides heavy-duty industrial cleaning, concrete power-scrubbing, and facility sanitation tailored around demanding shift schedules across the East Bay.",
    differentiators: [
      {
        title: "Industrial Ride-On & Walk-Behind Scrubbers",
        desc: "High-capacity commercial scrubbing equipment equipped with industrial degreasers for fast, deep concrete restoration."
      },
      {
        title: "Zero Disruption to 24/7 Logistics",
        desc: "Work scheduled by designated warehouse aisle zones or during shift turnover windows to maintain uninterrupted fulfillment."
      },
      {
        title: "OSHA & Industrial Safety Compliance",
        desc: "High-visibility PPE, slip-and-fall hazard mitigation, safety signage, and chemical SDS compliance on every job."
      }
    ],
    scopeItems: [
      { title: "Concrete Floor Scrubbing & Degreasing", desc: "Automated machine scrubbing removing forklift tire rubber, oil drips, grime, and industrial soil." },
      { title: "Loading Dock & Staging Bay Sweeping", desc: "Power sweeping and debris clearing for indoor/outdoor truck loading docks, ramps, and staging areas." },
      { title: "High-Bay Rafter & Overhead Pipe Dusting", desc: "Mitigation of combustible dust on overhead conduits, HVAC ductwork, and structural beams for fire safety compliance." },
      { title: "Shift Restroom & Locker Room Sanitation", desc: "Heavy-duty sanitizing of shift worker restrooms, showers, locker benches, and high-touch dispensers." },
      { title: "Breakroom & Driver Welfare Areas", desc: "Sanitizing cafeteria tables, microwaves, vending machine touchpoints, and trash/recycling compaction." },
      { title: "Warehouse Office & Dispatch Suite Upkeep", desc: "Full janitorial for shipping/receiving offices, dispatch booths, and mezzanine supervisor desks." }
    ],
    options: [
      { name: "Scheduled Warehouse Maintenance", freq: "2x – 5x / week", desc: "Routine industrial sweeping, employee restroom/breakroom sanitization, and priority aisle maintenance." },
      { name: "Periodic Concrete Scrub & Degrease", freq: "Monthly / Quarterly", desc: "Full-facility ride-on machine scrubbing, deep concrete degreasing, and safety line restriping prep." },
      { name: "Post-Lease & Turnaround Reset", freq: "One-Time / As-Needed", desc: "Complete high-to-low industrial decommissioning cleanup for incoming tenants or facility audits." }
    ],
    faqs: [
      {
        q: "What types of machinery do you deploy for warehouse floor cleaning?",
        a: "We utilize industrial electric ride-on scrubbers, cylindrical sweepers, high-CFM HEPA vacuum systems, and commercial walk-behind scrubbers suitable for spaces from 5,000 to 200,000+ sq ft."
      },
      {
        q: "Can you clean while our warehouse or distribution center is actively operating?",
        a: "Yes. We coordinate zone-by-zone cleaning with your operations supervisor, utilizing safety cones, caution tape, and quick-drying squeegee scrubbers to prevent forklift delays or slip hazards."
      },
      {
        q: "Do you clean high-bay pipes, beams, and lighting trusses?",
        a: "Yes. We provide high-dusting services utilizing specialized extension poles and lift equipment to remove accumulated dust, helping you maintain fire code and air quality standards."
      },
      {
        q: "Are your technicians insured for industrial and manufacturing environments?",
        a: "Prime Clean carries $2,000,000+ in general liability coverage, comprehensive workers' compensation, and surety bonding specifically structured for industrial commercial accounts."
      }
    ]
  },
  {
    slug: "retail-storefront-cleaning",
    category: "RETAIL & SHOWROOMS",
    name: "Retail & Showroom Cleaning",
    h1: "Retail Storefront, Boutique & Showroom Cleaning in the East Bay & San Francisco",
    metaTitle: "Retail Storefront & Auto Showroom Cleaning East Bay | Prime Clean",
    metaDescription: "Immaculate retail storefront, boutique, and auto showroom cleaning in the East Bay & SF. High-gloss floor polishing, streak-free display glass & morning store-opening readiness.",
    heroImage: "service_retail.jpg",
    heroAlt: "Immaculate retail showroom with high-gloss polished floors and crystal-clear display glass",
    badgeNumber: "Store Ready",
    badgeLabel: "Flawless Opening Presentation",
    intro: "In retail and customer-facing showrooms, visual cleanliness directly drives customer trust, foot traffic, and sales conversions. Prime Clean delivers pristine storefront glass, mirror-finish floor buffing, sanitized fitting rooms, and spotless customer amenities completed before your doors open each morning.",
    differentiators: [
      {
        title: "Guaranteed Pre-Opening Readiness",
        desc: "Services completed before your first customer arrives, ensuring an immaculate sales floor free of chemical odors or drying floors."
      },
      {
        title: "Crystal-Clear Display & Window Glass",
        desc: "Professional streak-free cleaning of exterior entry glass, display cases, fitting room mirrors, and interior partitions."
      },
      {
        title: "High-Gloss Floor Buffing & Polishing",
        desc: "Daily high-speed burnishing and microfiber dust mopping to keep luxury vinyl, terrazzo, and hardwood gleaming."
      }
    ],
    scopeItems: [
      { title: "Storefront Glass & Entrance Detailing", desc: "Streak-free polishing of entrance doors, display windows, brass handles, and entrance floor mats." },
      { title: "Sales Floor Buffing & Dust Mopping", desc: "Removal of heel scuffs, daily high-gloss burnishing, and thorough under-rack dust mopping." },
      { title: "Cash Wrap & POS Touchpoint Sanitizing", desc: "Sanitizing checkout counters, touchscreen terminals, barcode scanners, and payment card readers." },
      { title: "Fitting Room Disinfection & Mirror Care", desc: "Mirrors polished without streaks, benches sanitized, floors vacuumed, and discarded tags cleared." },
      { title: "Customer & Staff Restroom Hygiene", desc: "Deep sanitization of restrooms, touchless fixture polishing, and complete soap/towel replenishment." },
      { title: "Stockroom & Staff Breakroom Upkeep", desc: "Back-of-house organization, breakroom appliance wipe-downs, and cardboard/packaging recycling." }
    ],
    options: [
      { name: "Daily Morning Opening Reset", freq: "5x – 7x / week", desc: "Pre-opening cleaning covering the sales floor, windows, checkout, and restrooms ready for opening hour." },
      { name: "After-Hours Retail Night Turn", freq: "3x – 6x / week", desc: "Full post-closing cleanup: sweeping, mopping, trash extraction, fitting room resets, and restocking." },
      { name: "High-Gloss Floor Strip & Wax", freq: "Bi-Annual / Quarterly", desc: "Complete VCT strip, seal, and 4-coat high-gloss waxing to withstand heavy weekend shopping traffic." }
    ],
    faqs: [
      {
        q: "Can retail cleaning be scheduled before our store opens in the morning?",
        a: "Yes. Most of our retail clients prefer early-morning service (e.g., 6:00 AM – 9:00 AM) so the sales floor is pristine, completely dry, and freshly scented when store associates and shoppers arrive."
      },
      {
        q: "What types of retail flooring can you maintain?",
        a: "We maintain luxury vinyl tile (LVT), polished concrete, hardwood, terrazzo, VCT, ceramic tile, and commercial carpet using manufacturer-recommended pH-neutral chemistry."
      },
      {
        q: "Do you handle outdoor entrance pressure washing or sidewalk cleanup?",
        a: "Yes. We offer sidewalk power-washing, gum removal, and entryway canopy cleaning as part of comprehensive retail exterior maintenance packages."
      }
    ]
  },
  {
    slug: "property-management-cleaning",
    category: "PROPERTY MANAGEMENT",
    name: "Property Management & Multifamily Cleaning",
    h1: "Multifamily, HOA & Commercial Property Management Janitorial in the Bay Area",
    metaTitle: "Property Management & HOA Common Area Cleaning East Bay | Prime Clean",
    metaDescription: "Common area cleaning for multifamily properties, HOAs, and commercial building portfolios in the East Bay & SF. Lobbies, elevators, fitness centers, and turnover deep cleans.",
    heroImage: "service_property.jpg",
    heroAlt: "Luxury multifamily residential lobby and common area maintained by commercial janitorial team",
    badgeNumber: "Multifamily",
    badgeLabel: "HOA & Commercial Portfolios",
    intro: "For property managers and HOA board directors, spotless common areas are the #1 driver of tenant retention, leasing tour conversion, and protecting real estate asset value. Prime Clean provides reliable daily maintenance for residential high-rises, commercial office parks, and condominium communities across the Bay Area.",
    differentiators: [
      {
        title: "Portfolio Pricing & Unified Invoicing",
        desc: "Streamlined multi-property management with a single dedicated account supervisor and consolidated monthly billing."
      },
      {
        title: "Resident Amenity & Fitness Disinfection",
        desc: "Specialized daily cleaning for gym equipment, yoga studios, tenant lounges, package hubs, and co-working spaces."
      },
      {
        title: "Rapid Turnaround Deep Cleans",
        desc: "Fast-response unit turnover packages between tenant move-outs to minimize vacancy downtime."
      }
    ],
    scopeItems: [
      { title: "Grand Lobby & Reception Detailing", desc: "Polishing entrance glass, dusting concierge desks, vacuuming entry mats, and maintaining lounge seating." },
      { title: "Elevator Cabs & Stainless Steel Polishing", desc: "Removing fingerprints, polishing stainless walls, detailing button panels, and vacuuming floor tracks." },
      { title: "Residential Corridors & Stairwells", desc: "Hallway vacuuming, baseboard wiping, light fixture cleaning, and safety stairwell sweeping." },
      { title: "Fitness Center & Amenity Sanitation", desc: "EPA disinfectant wipe-downs of workout machines, dumbbells, yoga mats, and hydration stations." },
      { title: "Package Room & Mail Hub Organization", desc: "Clearing discarded packaging, sanitizing parcel locker keypads, and sweeping sorting counters." },
      { title: "Move-Out Unit Turnover Cleaning", desc: "Deep kitchen/bath sanitization, inside appliance cleaning, floor polishing, and window washing for vacant units." }
    ],
    options: [
      { name: "Daily Common Area Janitorial", freq: "5x – 7x / week", desc: "Routine morning/midday service covering lobbies, elevators, mailrooms, corridors, and fitness amenities." },
      { name: "Comprehensive HOA Community Care", freq: "2x – 4x / week", desc: "Clubhouse upkeep, pool cabana restroom sanitizing, breezeway sweeping, and trash enclosure policing." },
      { name: "Vacant Unit Turnover Package", freq: "On-Demand", desc: "Deep interior unit cleaning making apartments move-in ready within 24-48 hours of lease end." }
    ],
    faqs: [
      {
        q: "What areas are included in your standard multifamily cleaning package?",
        a: "Standard scopes include main lobbies, entrance glass, elevator cabs and tracks, mail/package rooms, residential corridors, stairwells, fitness centers, community clubhouses, and shared restrooms."
      },
      {
        q: "Can you provide services for multiple properties in our management portfolio?",
        a: "Yes. We manage multi-site portfolios across Richmond, Oakland, Berkeley, San Francisco, and surrounding cities with customized scopes, dedicated supervisors, and unified invoicing."
      },
      {
        q: "How do you handle emergency cleanup requests (such as leaks or common area spills)?",
        a: "Property management clients receive direct phone access to their assigned account supervisor for rapid-response dispatch to handle unexpected spills, trash overflows, or inspection prep."
      }
    ]
  },
  {
    slug: "school-educational-cleaning",
    category: "EDUCATION & CAMPUSES",
    name: "School & Educational Facility Cleaning",
    h1: "School, Campus & Childcare Center Cleaning Services in the East Bay & SF",
    metaTitle: "School & Educational Facility Cleaning Services East Bay | Prime Clean",
    metaDescription: "Safe, non-toxic school and educational facility cleaning in the East Bay & SF. Green Seal certified products, classroom sanitization, gym floor care, and break deep cleans.",
    heroImage: "service_education.jpg",
    heroAlt: "Educational classroom and school hallway polished and sanitized with child-safe green chemistry",
    badgeNumber: "Child-Safe",
    badgeLabel: "Green Seal Certified Chemistry",
    intro: "Educational facilities require an elevated duty of care to protect students, teachers, and staff from infectious illnesses while maintaining safe indoor air quality. Prime Clean provides eco-friendly janitorial services for private schools, charter academies, university campus buildings, and early learning childcare centers across the Bay Area.",
    differentiators: [
      {
        title: "Non-Toxic Green Seal Chemistry",
        desc: "Child-safe, low-VOC cleaning products that eliminate pathogens without toxic chemical residues or asthma triggers."
      },
      {
        title: "Academic Calendar Flexibility",
        desc: "Schedules tailored around school bell times, sporting events, and comprehensive summer, winter, and spring break deep cleans."
      },
      {
        title: "Fully Cleared & Backgrounded Staff",
        desc: "LiveScan fingerprinting and background verification compliant with California Department of Education vendor guidelines."
      }
    ],
    scopeItems: [
      { title: "Classroom Desk & Surface Sanitization", desc: "Disinfecting student desks, teachers' lecterns, whiteboards, computer keyboards, and door hardware." },
      { title: "High-Traffic Hallway Floor Care", desc: "Daily dust mopping, auto-scrubbing, and periodic high-traffic VCT floor stripping and waxing." },
      { title: "Cafeteria & Lunchroom Sanitation", desc: "Sanitizing lunch tables, food service line wipe-downs, floor degreasing, and trash/recycling removal." },
      { title: "Student & Faculty Restrooms", desc: "Deep hospital-grade disinfection, porcelain descaling, graffiti removal, and touchless dispenser restocking." },
      { title: "Gymnasium & Athletic Locker Rooms", desc: "Hardwood gym floor dust mopping, locker bench disinfection, shower descaling, and odor control." },
      { title: "Seasonal Deep Clean Resets", desc: "Full-campus summer and winter break deep carpet extraction, window washing, and wax coats." }
    ],
    options: [
      { name: "Daily After-School Janitorial", freq: "5x / week", desc: "Complete post-school-day sanitization of all classrooms, hallways, restrooms, and administrative offices." },
      { name: "Daytime Campus Porter", freq: "Daily 7:30 AM – 4 PM", desc: "Continuous cafeteria monitoring, restroom refreshes, playground trash clearing, and immediate spill response." },
      { name: "Term Break Deep Reset", freq: "Summer / Winter / Spring", desc: "Comprehensive floor stripping & waxing, carpet extraction, high-dusting, and thorough wall washing." }
    ],
    faqs: [
      {
        q: "Are your cleaning chemicals safe for children and students with asthma?",
        a: "Yes. We prioritize Green Seal certified, EPA Safer Choice, and fragrance-free cleaning products that eliminate pathogens without releasing harmful VOCs or respiratory irritants."
      },
      {
        q: "Are all cleaning crew members background-checked for school environments?",
        a: "Yes. All staff assigned to educational accounts undergo comprehensive criminal background checks and security vetting in full compliance with state educational standards."
      },
      {
        q: "How do you coordinate with district or school academic calendars?",
        a: "We work directly with your head of school or facility director to scale services up during term break deep cleans and adjust service hours during minimum days, exams, or campus events."
      }
    ]
  },
  {
    slug: "bank-financial-cleaning",
    category: "FINANCIAL & BANKING",
    name: "Bank & Financial Institution Cleaning",
    h1: "Bank Branch & Financial Institution Janitorial in the East Bay & San Francisco",
    metaTitle: "Bank & Financial Institution Cleaning Services East Bay | Prime Clean",
    metaDescription: "Secure, vetted after-hours bank cleaning services in the East Bay & SF. Polished marble floors, teller station sanitization, ATM cleanliness, and security protocol adherence.",
    heroImage: "service_financial.jpg",
    heroAlt: "Bank branch lobby and teller counter polished to mirror-finish executive standards",
    badgeNumber: "Vetted & Bonded",
    badgeLabel: "Secure Financial Protocols",
    intro: "Financial institutions require uncompromising security, strict confidentiality, and a pristine executive presentation that reflects trust and prestige. Prime Clean delivers bonded, background-checked commercial janitorial services for retail bank branches, credit unions, wealth management firms, and regional financial offices across the Bay Area.",
    differentiators: [
      {
        title: "Rigorous Security Clearance & Bonding",
        desc: "Direct W-2 technicians thoroughly vetted, bonded, and trained in bank perimeter alarms and secure lock-up procedures."
      },
      {
        title: "Prestige Marble & Terrazzo Floor Care",
        desc: "Specialized stone polishing, buffing, and maintenance delivering mirror-gloss finishes that convey institutional excellence."
      },
      {
        title: "Teller Station & ATM Sanitization",
        desc: "Disinfecting customer touchscreens, drive-through kiosks, deposit boxes, and teller glass without damaging sensitive hardware."
      }
    ],
    scopeItems: [
      { title: "Teller Counter & Cashier Station Detailing", desc: "Sanitizing counter surfaces, acrylic sneeze guards, signature pads, and under-counter stations." },
      { title: "ATM Kiosk & Drive-Through Sanitization", desc: "Streak-free screen cleaning, keypad disinfection, deposit slot wipe-downs, and exterior kiosk policing." },
      { title: "Marble, Stone & Hardwood Floor Polishing", desc: "High-speed burnishing, diamond pad stone polishing, and microfiber dust mopping for spotless lobbies." },
      { title: "Executive Offices & Boardroom Upkeep", desc: "Dusting mahogany/glass tables, vacuuming executive carpets, and detailing private client consultation rooms." },
      { title: "Customer & Employee Restrooms", desc: "Hospital-grade touchpoint disinfection, porcelain sanitization, and continuous premium consumable replenishment." },
      { title: "Secure Trash & Document Safeguarding", desc: "Emptying non-confidential waste bins while strictly adhering to clear-desk and shredding protocols." }
    ],
    options: [
      { name: "After-Hours Bank Janitorial", freq: "3x – 6x / week", desc: "Discreet evening or weekend cleaning with strict alarm setting and supervisor key verification." },
      { name: "Multi-Branch Portfolio Routing", freq: "Custom Schedule", desc: "Synchronized janitorial routes across regional branch networks with centralized management." },
      { name: "Stone & Floor Restoration", freq: "Quarterly / Bi-Annual", desc: "Deep marble hone/polish, carpet hot-water extraction, and high-gloss protective sealing." }
    ],
    faqs: [
      {
        q: "What security vetting process do your bank cleaning technicians undergo?",
        a: "Every janitorial team member undergoes thorough criminal background checks, identity verification, and drug testing. We are fully bonded and insured with strict chain-of-custody key management."
      },
      {
        q: "How do you handle security codes, keycards, and alarm procedures?",
        a: "Our technicians strictly follow individual access code protocols, verified check-in/check-out timestamps, and perimeter deadbolt verification. Alarm setting is confirmed electronically on our supervisor dashboard."
      },
      {
        q: "What floor care is provided for luxury marble or terrazzo bank lobbies?",
        a: "We deploy specialized high-speed stone burnishers with diamond-impregnated pads and neutral pH cleaners that enhance the natural stone luster without chemical buildup or slip hazards."
      }
    ]
  },
  {
    slug: "government-facility-janitorial",
    category: "GOVERNMENT & PUBLIC SECTOR",
    name: "Government & Municipal Janitorial",
    h1: "Government & Public Facility Janitorial Contractor in the East Bay & California",
    metaTitle: "Government & Public Facility Janitorial Contractor East Bay | Prime Clean",
    metaDescription: "Certified WOSB & CA Small Business government janitorial contractor. NAICS 561720, active SAM.gov & Cal eProcure, DIR #1001318678 for municipal, county, and state contracts.",
    heroImage: "gov_building.jpg",
    heroAlt: "Government civic facility and municipal courthouse maintained by certified small business contractor",
    badgeNumber: "WOSB & CA SB",
    badgeLabel: "Certified Small Business Vendor",
    intro: "Prime Clean is an independently certified Women-Owned Small Business (WOSB), State of California Small Business (#2048444), and Department of Industrial Relations (DIR #1001318678) registered contractor. We provide compliant, prevailing-wage janitorial services for city halls, county administration complexes, public health centers, courthouses, and municipal utility facilities.",
    differentiators: [
      {
        title: "Certified Small Business Set-Aside Credits",
        desc: "WOSB and CA Small Business certifications count directly toward municipal, county, and state procurement diversity goals."
      },
      {
        title: "DIR Registered & Prevailing Wage Compliant",
        desc: "Full compliance with California Labor Code, certified payroll reporting, and prevailing wage determinations."
      },
      {
        title: "Active SAM.gov & Cal eProcure Vendor",
        desc: "CAGE code, NAICS 561720, bonded, insured, and verified past performance with municipal and state agencies."
      }
    ],
    scopeItems: [
      { title: "Municipal Administration & City Halls", desc: "Daily cleaning for council chambers, administrative suites, public service counters, and executive offices." },
      { title: "Courthouses & Civic Buildings", desc: "High-traffic public lobby sanitization, courtroom cleaning, judge's chambers, and holding area upkeep." },
      { title: "Public Health Clinics & Community Centers", desc: "EPA hospital-grade disinfection, touchpoint sanitization, and multi-purpose recreational hall care." },
      { title: "Public Works & Operations Yards", desc: "Maintenance of operations offices, locker rooms, crew breakrooms, and muster facilities." },
      { title: "Electronic Audit Logs for Contracting Officers", desc: "Detailed digital shift logs, inspection reports, and supervisor sign-offs ready for audit." },
      { title: "Transit Hubs & Public Restroom Facilities", desc: "Heavy-duty sanitization of high-volume public restrooms with continuous consumable replenishment." }
    ],
    options: [
      { name: "Full Municipal Contract Janitorial", freq: "5x – 7x / week", desc: "Comprehensive custodial coverage for civic centers, public administration buildings, and city facilities." },
      { name: "Public Sector Day Porter", freq: "Daily Shifts", desc: "Continuous daytime policing of public lobbies, council meetings, public restrooms, and municipal events." },
      { name: "Periodic Facility Restoration", freq: "Scheduled Contract Terms", desc: "Hard floor strip and waxing, exterior window washing, high-pressure washing, and carpet extraction." }
    ],
    faqs: [
      {
        q: "What certifications and registrations does Prime Clean hold for public bidding?",
        a: "Prime Clean holds SBA Women-Owned Small Business (WOSB) certification, State of California Small Business (#2048444), California DIR (#1001318678), Cal eProcure vendor registration, and active SAM.gov status under NAICS 561720."
      },
      {
        q: "Do you comply with California Prevailing Wage and certified payroll requirements?",
        a: "Yes. We strictly adhere to California Department of Industrial Relations (DIR) prevailing wage determinations, submit electronic certified payroll records (eCPR), and maintain complete labor compliance documentation."
      },
      {
        q: "Can you provide a formal Capability Statement?",
        a: "Yes. You can download or request our comprehensive Capability Statement including past performance with Caltrans, California DMV, CDCR, and Alameda ARPD on our Government Contracting page or by emailing info@primecleanba.com."
      }
    ]
  }
];

function generateIndustryHtml(ind) {
  const schemaFaqs = ind.faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }));

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": ind.name,
        "serviceType": ind.name,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Prime Clean",
          "telephone": "+1-415-572-8733",
          "email": "info@primecleanba.com",
          "url": "https://primecleanba.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Richmond",
            "addressRegion": "CA",
            "addressCountry": "US"
          }
        },
        "areaServed": "San Francisco Bay Area & East Bay, CA",
        "description": ind.metaDescription
      },
      {
        "@type": "FAQPage",
        "mainEntity": schemaFaqs
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primecleanba.com/index.html" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://primecleanba.com/services.html" },
          { "@type": "ListItem", "position": 3, "name": ind.name, "item": `https://primecleanba.com/industries/${ind.slug}.html` }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${ind.metaTitle}</title>
  <meta name="description" content="${ind.metaDescription}">
  <link rel="canonical" href="https://primecleanba.com/industries/${ind.slug}.html">
  <meta property="og:title" content="${ind.metaTitle}">
  <meta property="og:description" content="${ind.metaDescription}">
  <meta property="og:image" content="https://primecleanba.com/assets/images/${ind.heroImage}">
  <meta property="og:url" content="https://primecleanba.com/industries/${ind.slug}.html">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="../assets/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  ${JSON.stringify(schemaJson, null, 2)}
  </script>
  <!-- Vercel Web Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>

<div class="topline">
  <div class="wrap">
    <div class="badges">
      <span>Women-Owned Small Business</span>
      <span>CA Small Business Certified</span>
      <span>Licensed · Bonded · Insured</span>
    </div>
    <span class="topline-region">Serving the East Bay &amp; San Francisco</span>
  </div>
</div>

<header class="site">
  <div class="wrap bar">
    <a class="brand" href="../index.html">
      <img class="brand-logo" src="../assets/logo.png" alt="Prime Clean — Elevate Your Workspace With Our Touch" width="438" height="204">
    </a>
    <nav class="primary">
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
      <a href="../services" class="active">Services</a>
      <a href="../pricing">Pricing</a>
      <a href="../government">Government</a>
      <a href="../service-areas">Service Areas</a>
      <a href="../blog">Blog</a>
      <a href="../contact">Contact</a>
    </nav>
    <div class="header-actions">
      <a class="phone-pill" href="tel:14155728733" aria-label="Call Prime Clean at (415) 572-8733">
        <span class="phone-pill-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
        </span>
        <span class="phone-pill-num">(415) 572-8733</span>
      </a>
      <a class="btn btn-gold btn-sm" href="../contact">Get a Quote</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>
  </div>
  <div class="wrap"><nav class="mobile-nav">
    <a href="../">Home</a>
    <a href="../about">About</a>
    <a href="../services">Services</a>
    <a href="../pricing">Pricing</a>
    <a href="../government">Government</a>
    <a href="../service-areas">Service Areas</a>
    <a href="../blog">Blog</a>
    <a href="../careers">Careers</a>
    <a href="../contact">Contact</a>
  </nav></div>
</header>

<main>
  <!-- HERO -->
  <div class="wrap page-hero">
    <div class="page-hero-grid">
      <div>
        <div class="breadcrumb"><a href="../">Home</a> / <a href="../services">Services</a> / ${ind.name}</div>
        <span class="eyebrow on-light">${ind.category} //</span>
        <h1>${ind.h1}</h1>
        <p>${ind.intro}</p>
        <div class="hero-ctas" style="margin-top:24px">
          <a class="btn btn-gold" href="../contact?type=${encodeURIComponent(ind.name)}#quote-form">Schedule Free Walkthrough</a>
          <a class="btn btn-outline" href="../pricing">Calculate Monthly Cost</a>
        </div>
        <div class="hero-checks" style="margin-top:22px">
          <div class="check-row"><span class="check-dot">${checkSvg}</span>Women-Owned &amp; CA Small Business Certified</div>
          <div class="check-row"><span class="check-dot">${checkSvg}</span>100% Direct W-2, Background-Checked Staff</div>
        </div>
      </div>
      <div class="page-hero-media">
        <img src="../assets/images/${ind.heroImage}" alt="${ind.heroAlt}">
        <div class="page-hero-badge">
          <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/></svg></span>
          <div><b>${ind.badgeNumber}</b><span>${ind.badgeLabel}</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- STANDARDS & HIGHLIGHTS -->
  <section style="padding-top:20px">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow on-light">Industry Standards</span>
        <h2>Built specifically for ${ind.name.toLowerCase()} requirements.</h2>
        <p>Every facility type has distinct compliance standards, foot-traffic demands, and security requirements. Here's how Prime Clean executes on your account.</p>
      </div>

      <div class="reason-grid">
        ${ind.differentiators.map(d => `
        <div class="reason-card">
          <div class="reason-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <h3>${d.title}</h3>
          <p>${d.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- DETAILED SCOPE OF WORK -->
  <section style="padding-top:20px">
    <div class="wrap">
      <div class="feature-panel" style="grid-template-columns:1fr 1fr;gap:40px;align-items:start">
        <div>
          <span class="eyebrow on-light">Detailed Scope</span>
          <h2 style="margin-top:10px">What's included in our ${ind.name.toLowerCase()} program.</h2>
          <p class="desc">A written scope of work verified on every shift with supervisor electronic audit logs.</p>
          
          <div class="feature-list" style="margin-top:24px">
            ${ind.scopeItems.slice(0, 3).map(s => `
            <div style="margin-bottom:16px">
              <h4 style="font-size:1.02rem;color:var(--blue-900);margin-bottom:4px;display:flex;align-items:center;gap:8px">
                <span style="color:var(--gold)">✓</span> ${s.title}
              </h4>
              <p style="font-size:.88rem;color:var(--muted);margin:0;line-height:1.5">${s.desc}</p>
            </div>`).join('')}
          </div>
        </div>

        <div style="background:#ffffff;border:1px solid var(--line);border-radius:var(--radius-md);padding:28px;box-shadow:var(--shadow-card)">
          <div class="feature-list">
            ${ind.scopeItems.slice(3).map(s => `
            <div style="margin-bottom:16px">
              <h4 style="font-size:1.02rem;color:var(--blue-900);margin-bottom:4px;display:flex;align-items:center;gap:8px">
                <span style="color:var(--gold)">✓</span> ${s.title}
              </h4>
              <p style="font-size:.88rem;color:var(--muted);margin:0;line-height:1.5">${s.desc}</p>
            </div>`).join('')}
          </div>
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line);text-align:center">
            <a class="btn btn-gold btn-sm" style="width:100%;justify-content:center" href="../contact.html?type=${encodeURIComponent(ind.name)}#quote-form">Request Customized Scope &amp; Quote →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FREQUENCY OPTIONS -->
  <section style="padding-top:20px">
    <div class="wrap">
      <div class="section-head center">
        <span class="eyebrow on-light">Service Schedules</span>
        <h2>Flexible cleaning cadences matched to your operations.</h2>
        <p>From high-touch daily maintenance to periodic deep restorative cleans, we build schedules around your building.</p>
      </div>

      <div class="reason-grid">
        ${ind.options.map(opt => `
        <div class="vert-card" style="border-top:3px solid var(--blue-600)">
          <span style="font-size:.76rem;font-family:'IBM Plex Mono',monospace;color:var(--blue-700);font-weight:600">${opt.freq}</span>
          <h3 style="margin-top:4px">${opt.name}</h3>
          <p>${opt.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- LOCAL CITIES SERVED FOR THIS INDUSTRY -->
  <section style="padding-top:20px">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow on-light">Regional Coverage</span>
        <h2>${ind.name} across the East Bay &amp; San Francisco.</h2>
        <p>Dedicated janitorial crews serving commercial and public facilities throughout Northern California:</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:14px;margin-top:20px">
        ${cities.map(c => `
        <a href="../locations/${c.slug}-${ind.slug}.html" style="background:#ffffff;border:1px solid var(--line);border-radius:var(--radius-sm);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;transition:all .2s ease" class="hover-lift">
          <span style="font-weight:700;color:var(--blue-900);font-size:.92rem">${c.name}</span>
          <span style="color:var(--blue-700);font-size:.82rem;font-weight:600">View City Scope →</span>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <!-- FAQS -->
  <section style="padding-top:20px">
    <div class="wrap" style="max-width:820px">
      <div class="section-head center">
        <span class="eyebrow on-light">Frequently Asked Questions</span>
        <h2>Frequently Asked Questions About ${ind.name}</h2>
      </div>

      <div style="display:flex;flex-direction:column;gap:16px;margin-top:24px">
        ${ind.faqs.map(faq => `
        <div style="background:#ffffff;border:1px solid var(--line);border-radius:var(--radius-md);padding:22px 26px;box-shadow:var(--shadow-card)">
          <h3 style="font-size:1.08rem;color:var(--blue-900);margin-bottom:8px">${faq.q}</h3>
          <p style="color:var(--muted);font-size:.92rem;line-height:1.6;margin:0">${faq.a}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- CTA BAND -->
  <section style="padding-top:20px">
    <div class="wrap">
      <div class="band-bold" style="text-align:center;padding:48px 32px">
        <span class="eyebrow on-dark" style="color:var(--gold)">READY FOR INSPECTION-GRADE CLEANING? //</span>
        <h2 style="color:#fff;margin-top:12px">Get a transparent quote and free Cleanliness Score for your facility.</h2>
        <p style="color:rgba(255,255,255,.9);max-width:54ch;margin:14px auto 26px;font-size:1.02rem">Our team visits on-site, assesses your exact square footage, and provides a guaranteed itemized scope within 24 hours.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-gold" href="../contact.html?type=${encodeURIComponent(ind.name)}#quote-form">Schedule Free 15-Min Walkthrough</a>
          <a class="btn btn-outline-light" href="tel:14155728733">Call Direct: (415) 572-8733</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="site">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="foot-brand-link" href="../index.html" aria-label="Prime Clean Homepage">
          <img class="brand-logo brand-logo--footer" src="../assets/logo-white.png" alt="Prime Clean" width="438" height="204">
        </a>
        <p>Women-Owned, California Small Business Certified commercial and government cleaning contractor serving the East Bay and San Francisco.</p>
        <div class="foot-badges-inline">
          <span class="foot-badge">WOSB Certified</span>
          <span class="foot-badge">CA Small Business #2048444</span>
          <span class="foot-badge">DIR #1001318678</span>
          <span class="foot-badge">Cal eProcure</span>
        </div>
      </div>
      <div>
        <h4>Cleaning Solutions</h4>
        <ul>
          <li><a href="../services.html">Commercial Janitorial</a></li>
          <li><a href="../services.html">Day Porter Service</a></li>
          <li><a href="../services.html">Restroom Deep Cleaning</a></li>
          <li><a href="../services.html">Hard Floor Strip &amp; Wax</a></li>
          <li><a href="../services.html">Carpet Steam Extraction</a></li>
          <li><a href="../services.html">Post-Construction Cleaning</a></li>
          <li><a href="../services.html">Terminal Disinfection</a></li>
        </ul>
      </div>
      <div>
        <h4>Industries Serviced</h4>
        <ul>
          <li><a href="commercial-office-cleaning.html">Corporate &amp; Class A Offices</a></li>
          <li><a href="medical-clinic-cleaning.html">Medical &amp; Clinical Facilities</a></li>
          <li><a href="industrial-warehouse-cleaning.html">Industrial &amp; Warehouses</a></li>
          <li><a href="retail-storefront-cleaning.html">Retail &amp; Showrooms</a></li>
          <li><a href="property-management-cleaning.html">Property Management &amp; HOAs</a></li>
          <li><a href="school-educational-cleaning.html">Schools &amp; Education</a></li>
          <li><a href="bank-financial-cleaning.html">Financial Institutions</a></li>
          <li><a href="../government.html">Government &amp; Public Sector</a></li>
        </ul>
      </div>
      <div>
        <h4>East Bay Coverage</h4>
        <ul>
          <li><a href="../locations/san-francisco-commercial-office-cleaning.html">San Francisco</a></li>
          <li><a href="../locations/oakland-commercial-office-cleaning.html">Oakland</a></li>
          <li><a href="../locations/richmond-commercial-office-cleaning.html">Richmond (HQ)</a></li>
          <li><a href="../locations/berkeley-commercial-office-cleaning.html">Berkeley</a></li>
          <li><a href="../locations/walnut-creek-commercial-office-cleaning.html">Walnut Creek</a></li>
          <li><a href="../locations/concord-commercial-office-cleaning.html">Concord</a></li>
          <li><a href="../locations/martinez-commercial-office-cleaning.html">Martinez</a></li>
          <li><a href="../locations/benicia-commercial-office-cleaning.html">Benicia</a></li>
          <li><a href="../locations/albany-commercial-office-cleaning.html">Albany</a></li>
          <li><a href="../locations/pleasanton-commercial-office-cleaning.html">Pleasanton</a></li>
          <li><a href="../service-areas.html" style="color:var(--gold);font-weight:700">View All 16+ Cities →</a></li>
        </ul>
      </div>
      <div>
        <h4>Company &amp; Tools</h4>
        <ul>
          <li><a href="../about.html">About Prime Clean</a></li>
          <li><a href="../pricing.html">Pricing Calculator</a></li>
          <li><a href="../gallery.html">Before &amp; After Gallery</a></li>
          <li><a href="../tools/walkthrough-scorecard.html">Walkthrough Scorecard Tool</a></li>
          <li><a href="../government.html">Government Contracting</a></li>
          <li><a href="../service-areas.html">Service Coverage</a></li>
          <li><a href="../blog.html">Blog &amp; Resources</a></li>
          <li><a href="../careers.html">Careers &amp; Jobs</a></li>
          <li><a href="../contact.html">Contact &amp; Free Walkthrough</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:14155728733" style="color:#fff;font-weight:700">(415) 572-8733</a></li>
          <li><a href="mailto:info@primecleanba.com">info@primecleanba.com</a></li>
          <li style="color:#9db8c8;font-size:.9rem">353 S 24th St, Richmond, CA 94804</li>
          <li style="color:#7fa3ba;font-size:.82rem;margin-top:6px;line-height:1.5">Mon–Fri: 7:00 AM – 7:00 PM<br>24/7 Operations Dispatch</li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; 2026 Prime Clean, a brand of FG Digital Agency LLC · WOSB · CA Small Business Certified</span>
      <span>UEI on file · SAM.gov active · DIR Reg. No. JS-LR-1001318678</span>
    </div>
    <div class="foot-legal">
      <a href="../privacy-policy.html">Privacy Policy</a>
      <a href="../cookie-policy.html">Cookie Policy</a>
      <a href="../terms-of-service.html">Terms of Service</a>
    </div>
  </div>
</footer>

<script src="../assets/script.js"></script>
</body>
</html>`;
}

// Generate all 8 pages
industriesData.forEach(ind => {
  const filePath = path.join(outDir, `${ind.slug}.html`);
  const html = generateIndustryHtml(ind);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated industry page: industries/${ind.slug}.html`);
});
