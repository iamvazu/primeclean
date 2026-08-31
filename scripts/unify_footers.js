const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getFooterHtml(prefix) {
  const homeHref = prefix ? `${prefix}` : '/';
  return `<footer class="site">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="foot-brand-link" href="${homeHref}" aria-label="Prime Clean Homepage">
          <img class="brand-logo brand-logo--footer" src="${prefix}assets/logo-white.png" alt="Prime Clean" width="438" height="204">
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
          <li><a href="${prefix}services">Commercial Janitorial</a></li>
          <li><a href="${prefix}services">Day Porter Service</a></li>
          <li><a href="${prefix}services">Restroom Deep Cleaning</a></li>
          <li><a href="${prefix}services">Hard Floor Strip &amp; Wax</a></li>
          <li><a href="${prefix}services">Carpet Steam Extraction</a></li>
          <li><a href="${prefix}services">Post-Construction Cleaning</a></li>
          <li><a href="${prefix}services">Terminal Disinfection</a></li>
        </ul>
      </div>
      <div>
        <h4>Industries Serviced</h4>
        <ul>
          <li><a href="${prefix}industries/commercial-office-cleaning">Corporate &amp; Class A Offices</a></li>
          <li><a href="${prefix}industries/medical-clinic-cleaning">Medical &amp; Clinical Facilities</a></li>
          <li><a href="${prefix}industries/industrial-warehouse-cleaning">Industrial &amp; Warehouses</a></li>
          <li><a href="${prefix}industries/retail-storefront-cleaning">Retail &amp; Showrooms</a></li>
          <li><a href="${prefix}industries/property-management-cleaning">Property Management &amp; HOAs</a></li>
          <li><a href="${prefix}industries/school-educational-cleaning">Schools &amp; Education</a></li>
          <li><a href="${prefix}industries/bank-financial-cleaning">Financial Institutions</a></li>
          <li><a href="${prefix}government">Government &amp; Public Sector</a></li>
        </ul>
      </div>
      <div>
        <h4>East Bay Coverage</h4>
        <ul>
          <li><a href="${prefix}locations/san-francisco-commercial-office-cleaning">San Francisco</a></li>
          <li><a href="${prefix}locations/oakland-commercial-office-cleaning">Oakland</a></li>
          <li><a href="${prefix}locations/richmond-commercial-office-cleaning">Richmond (HQ)</a></li>
          <li><a href="${prefix}locations/berkeley-commercial-office-cleaning">Berkeley</a></li>
          <li><a href="${prefix}locations/walnut-creek-commercial-office-cleaning">Walnut Creek</a></li>
          <li><a href="${prefix}locations/concord-commercial-office-cleaning">Concord</a></li>
          <li><a href="${prefix}locations/martinez-commercial-office-cleaning">Martinez</a></li>
          <li><a href="${prefix}locations/benicia-commercial-office-cleaning">Benicia</a></li>
          <li><a href="${prefix}locations/albany-commercial-office-cleaning">Albany</a></li>
          <li><a href="${prefix}locations/pleasanton-commercial-office-cleaning">Pleasanton</a></li>
          <li><a href="${prefix}service-areas" style="color:var(--gold);font-weight:700">View All 16+ Cities →</a></li>
        </ul>
      </div>
      <div>
        <h4>Company &amp; Tools</h4>
        <ul>
          <li><a href="${prefix}about">About Prime Clean</a></li>
          <li><a href="${prefix}pricing">Pricing Calculator</a></li>
          <li><a href="${prefix}gallery">Before &amp; After Gallery</a></li>
          <li><a href="${prefix}tools/walkthrough-scorecard">Walkthrough Scorecard Tool</a></li>
          <li><a href="${prefix}government">Government Contracting</a></li>
          <li><a href="${prefix}service-areas">Service Coverage</a></li>
          <li><a href="${prefix}blog">Blog &amp; Resources</a></li>
          <li><a href="${prefix}careers">Careers &amp; Jobs</a></li>
          <li><a href="${prefix}contact">Contact &amp; Free Walkthrough</a></li>
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
      <a href="${prefix}privacy-policy.html">Privacy Policy</a>
      <a href="${prefix}cookie-policy.html">Cookie Policy</a>
      <a href="${prefix}terms-of-service.html">Terms of Service</a>
    </div>
  </div>
</footer>`;
}

function processFile(filePath, prefix) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <footer class="site">...</footer>
  const footerRegex = /<footer class="site">[\s\S]*?<\/footer>/;
  if (footerRegex.test(content)) {
    const newFooter = getFooterHtml(prefix);
    content = content.replace(footerRegex, newFooter);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated footer in: ${path.relative(rootDir, filePath)}`);
  }
}

// 1. Root files
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
rootFiles.forEach(f => processFile(path.join(rootDir, f), ''));

// 2. Subdirectories: industries, blog, tools
['industries', 'blog', 'tools'].forEach(dirName => {
  const dirPath = path.join(rootDir, dirName);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    files.forEach(f => processFile(path.join(dirPath, f), '../'));
  }
});

// 3. Location template
const templatePath = path.join(rootDir, 'templates', 'location_service_template.html');
if (fs.existsSync(templatePath)) {
  processFile(templatePath, '../');
}

console.log('Finished updating footers across all HTML files.');
