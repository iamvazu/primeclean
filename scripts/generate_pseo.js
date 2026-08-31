const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const templatePath = path.join(rootDir, 'templates', 'location_service_template.html');
const outputDir = path.join(rootDir, 'locations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load data
const cities = JSON.parse(fs.readFileSync(path.join(dataDir, 'cities.json'), 'utf8'));
const verticals = JSON.parse(fs.readFileSync(path.join(dataDir, 'verticals.json'), 'utf8'));
const template = fs.readFileSync(templatePath, 'utf8');

const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6"/></svg>`;

const generatedUrls = [];

cities.forEach(city => {
  verticals.forEach(vertical => {
    const pageSlug = `${city.slug}-${vertical.slug}`;
    const pageTitle = `${vertical.headline} in ${city.name}, CA | Prime Clean`;
    const metaDescription = vertical.metaDescription.replace(/{city}/g, city.name);
    const verticalIntro = vertical.intro.replace(/{city}/g, city.name);

    // Scope list HTML
    const scopeListHtml = vertical.scopeItems.map(item => {
      return `<div class="check-row" style="color:var(--ink);align-items:flex-start">
        <span class="check-dot" style="margin-top:2px">${checkSvg}</span>
        <span>${item}</span>
      </div>`;
    }).join('\n');

    // Highlights HTML
    const highlightsHtml = vertical.highlights.map(h => {
      return `<div class="reason-card">
        <div class="reason-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/></svg>
        </div>
        <h3>${h.title}</h3>
        <p>${h.desc}</p>
      </div>`;
    }).join('\n');

    // Other services in this city
    const otherServicesHtml = verticals
      .filter(v => v.slug !== vertical.slug)
      .slice(0, 5)
      .map(v => {
        return `<li><a href="${city.slug}-${v.slug}.html" style="color:var(--blue-700);font-weight:600;font-size:.9rem;text-decoration:none">→ ${v.name} in ${city.name}</a></li>`;
      }).join('\n');

    // Same vertical in nearby cities
    const nearbyCitiesHtml = cities
      .filter(c => c.slug !== city.slug)
      .slice(0, 5)
      .map(c => {
        return `<li><a href="${c.slug}-${vertical.slug}.html" style="color:var(--blue-700);font-weight:600;font-size:.9rem;text-decoration:none">→ ${vertical.shortName} in ${c.name}, CA</a></li>`;
      }).join('\n');

    // Replace placeholders
    let pageHtml = template
      .replace(/{{pageTitle}}/g, pageTitle)
      .replace(/{{metaDescription}}/g, metaDescription)
      .replace(/{{pageSlug}}/g, pageSlug)
      .replace(/{{cityName}}/g, city.name)
      .replace(/{{countyName}}/g, city.county)
      .replace(/{{cityDescription}}/g, city.description)
      .replace(/{{verticalName}}/g, vertical.name)
      .replace(/{{verticalShortName}}/g, vertical.shortName)
      .replace(/{{verticalHeadline}}/g, vertical.headline)
      .replace(/{{verticalScopeTitle}}/g, vertical.scopeTitle)
      .replace(/{{verticalHeroImage}}/g, vertical.heroImage)
      .replace(/{{verticalIntro}}/g, verticalIntro)
      .replace(/{{verticalSlug}}/g, vertical.slug)
      .replace(/{{scopeListHtml}}/g, scopeListHtml)
      .replace(/{{highlightsHtml}}/g, highlightsHtml)
      .replace(/{{otherServicesHtml}}/g, otherServicesHtml)
      .replace(/{{nearbyCitiesHtml}}/g, nearbyCitiesHtml);

    const outPath = path.join(outputDir, `${pageSlug}.html`);
    fs.writeFileSync(outPath, pageHtml, 'utf8');
    generatedUrls.push(`locations/${pageSlug}.html`);
  });
});

console.log(`Generated ${generatedUrls.length} programmatic location pages in ${outputDir}`);

// Generate sitemap.xml
const corePages = [
  'index.html',
  'commercial-cleaning-richmond-ca.html',
  'about.html',
  'services.html',
  'pricing.html',
  'government.html',
  'service-areas.html',
  'contact.html'
];

const legalPages = [
  'privacy-policy.html',
  'cookie-policy.html',
  'terms-of-service.html'
];

const baseUrl = 'https://primecleanba.com';
const today = new Date().toISOString().split('T')[0];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${corePages.map(page => `  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
${generatedUrls.map(url => `  <url>
    <loc>${baseUrl}/${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${legalPages.map(page => `  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`Generated sitemap.xml with ${corePages.length + generatedUrls.length} total indexed URLs`);
