const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getHeaderHtml(prefix, activePage) {
  const isHome = activePage === 'home';
  const isAbout = activePage === 'about';
  const isServices = activePage === 'services';
  const isPricing = activePage === 'pricing';
  const isGov = activePage === 'government';
  const isAreas = activePage === 'service-areas';
  const isBlog = activePage === 'blog';
  const isContact = activePage === 'contact';
  const isCareers = activePage === 'careers';
  const isGallery = activePage === 'gallery';

  const homeHref = prefix ? `${prefix}` : '/';
  const aboutHref = `${prefix}about`;
  const servicesHref = `${prefix}services`;
  const pricingHref = `${prefix}pricing`;
  const govHref = `${prefix}government`;
  const areasHref = `${prefix}service-areas`;
  const blogHref = `${prefix}blog`;
  const contactHref = `${prefix}contact`;
  const careersHref = `${prefix}careers`;
  const galleryHref = `${prefix}gallery`;

  return `<header class="site">
  <div class="wrap bar">
    <a class="brand" href="${homeHref}">
      <img class="brand-logo" src="${prefix}assets/logo.png" alt="Prime Clean — Elevate Your Workspace With Our Touch" width="438" height="204">
    </a>
    <nav class="primary">
      <a href="${homeHref}"${isHome ? ' class="active"' : ''}>Home</a>
      <a href="${aboutHref}"${isAbout ? ' class="active"' : ''}>About</a>
      <a href="${servicesHref}"${isServices ? ' class="active"' : ''}>Services</a>
      <a href="${pricingHref}"${isPricing ? ' class="active"' : ''}>Pricing</a>
      <a href="${govHref}"${isGov ? ' class="active"' : ''}>Government</a>
      <a href="${areasHref}"${isAreas ? ' class="active"' : ''}>Service Areas</a>
      <a href="${blogHref}"${isBlog ? ' class="active"' : ''}>Blog</a>
      <a href="${contactHref}"${isContact ? ' class="active"' : ''}>Contact</a>
    </nav>
    <div class="header-actions">
      <a class="phone-pill" href="tel:14155728733" aria-label="Call Prime Clean at (415) 572-8733">
        <span class="phone-pill-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"/></svg>
        </span>
        <span class="phone-pill-num">(415) 572-8733</span>
      </a>
      <a class="btn btn-gold btn-sm" href="${contactHref}">Get a Quote</a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
  <div class="wrap">
    <nav class="mobile-nav">
      <a href="${homeHref}"${isHome ? ' class="active"' : ''}>Home</a>
      <a href="${aboutHref}"${isAbout ? ' class="active"' : ''}>About Prime Clean</a>
      <a href="${servicesHref}"${isServices ? ' class="active"' : ''}>Commercial Services</a>
      <a href="${pricingHref}"${isPricing ? ' class="active"' : ''}>Pricing Calculator</a>
      <a href="${galleryHref}"${isGallery ? ' class="active"' : ''}>Before &amp; After Gallery</a>
      <a href="${govHref}"${isGov ? ' class="active"' : ''}>Government Capabilities</a>
      <a href="${areasHref}"${isAreas ? ' class="active"' : ''}>East Bay Coverage</a>
      <a href="${blogHref}"${isBlog ? ' class="active"' : ''}>Blog &amp; Knowledge Base</a>
      <a href="${careersHref}"${isCareers ? ' class="active"' : ''}>Careers &amp; Jobs</a>
      <a href="${contactHref}"${isContact ? ' class="active"' : ''}>Contact &amp; Free Walkthrough</a>
    </nav>
  </div>
</header>`;
}

function processHeader(filePath, prefix, activePage) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const headerRegex = /<header class="site">[\s\S]*?<\/header>/;
  if (headerRegex.test(content)) {
    const newHeader = getHeaderHtml(prefix, activePage);
    content = content.replace(headerRegex, newHeader);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated header in: ${path.relative(rootDir, filePath)}`);
  }
}

// 1. Root files
const rootFiles = [
  { file: 'index.html', page: 'home' },
  { file: 'about.html', page: 'about' },
  { file: 'services.html', page: 'services' },
  { file: 'pricing.html', page: 'pricing' },
  { file: 'government.html', page: 'government' },
  { file: 'service-areas.html', page: 'service-areas' },
  { file: 'blog.html', page: 'blog' },
  { file: 'contact.html', page: 'contact' },
  { file: 'careers.html', page: 'careers' },
  { file: 'gallery.html', page: 'gallery' },
  { file: 'commercial-cleaning-richmond-ca.html', page: 'services' },
  { file: 'privacy-policy.html', page: '' },
  { file: 'cookie-policy.html', page: '' },
  { file: 'terms-of-service.html', page: '' }
];

rootFiles.forEach(item => {
  const full = path.join(rootDir, item.file);
  if (fs.existsSync(full)) {
    processHeader(full, '', item.page);
  }
});

// 2. Subdirectories
['blog', 'tools'].forEach(dirName => {
  const dirPath = path.join(rootDir, dirName);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    files.forEach(f => {
      processHeader(path.join(dirPath, f), '../', dirName);
    });
  }
});

// 3. Location template
const templatePath = path.join(rootDir, 'templates', 'location_service_template.html');
if (fs.existsSync(templatePath)) {
  processHeader(templatePath, '../', 'service-areas');
}

console.log('Finished updating headers across all HTML files.');
