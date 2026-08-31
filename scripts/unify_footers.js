const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getFooterHtml(prefix) {
  return `<footer class="site">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="foot-brand-link" href="${prefix}index.html" aria-label="Prime Clean Homepage">
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
          <li><a href="${prefix}services.html">Commercial Janitorial</a></li>
          <li><a href="${prefix}services.html">Day Porter Service</a></li>
          <li><a href="${prefix}services.html">Restroom Deep Cleaning</a></li>
          <li><a href="${prefix}services.html">Hard Floor Strip &amp; Wax</a></li>
          <li><a href="${prefix}services.html">Carpet Steam Extraction</a></li>
          <li><a href="${prefix}services.html">Post-Construction Cleaning</a></li>
          <li><a href="${prefix}services.html">Terminal Disinfection</a></li>
        </ul>
      </div>
      <div>
        <h4>Industries Serviced</h4>
        <ul>
          <li><a href="${prefix}industries/commercial-office-cleaning.html">Corporate &amp; Class A Offices</a></li>
          <li><a href="${prefix}industries/medical-clinic-cleaning.html">Medical &amp; Clinical Facilities</a></li>
          <li><a href="${prefix}industries/industrial-warehouse-cleaning.html">Industrial &amp; Warehouses</a></li>
          <li><a href="${prefix}industries/retail-storefront-cleaning.html">Retail &amp; Showrooms</a></li>
          <li><a href="${prefix}industries/property-management-cleaning.html">Property Management &amp; HOAs</a></li>
          <li><a href="${prefix}industries/school-educational-cleaning.html">Schools &amp; Education</a></li>
          <li><a href="${prefix}industries/bank-financial-cleaning.html">Financial Institutions</a></li>
          <li><a href="${prefix}government.html">Government &amp; Public Sector</a></li>
        </ul>
      </div>
      <div>
        <h4>East Bay Coverage</h4>
        <ul>
          <li><a href="${prefix}locations/san-francisco-commercial-office-cleaning.html">San Francisco</a></li>
          <li><a href="${prefix}locations/oakland-commercial-office-cleaning.html">Oakland</a></li>
          <li><a href="${prefix}locations/richmond-commercial-office-cleaning.html">Richmond (HQ)</a></li>
          <li><a href="${prefix}locations/berkeley-commercial-office-cleaning.html">Berkeley</a></li>
          <li><a href="${prefix}locations/fremont-commercial-office-cleaning.html">Fremont</a></li>
          <li><a href="${prefix}locations/walnut-creek-commercial-office-cleaning.html">Walnut Creek</a></li>
          <li><a href="${prefix}locations/concord-commercial-office-cleaning.html">Concord</a></li>
          <li><a href="${prefix}locations/pleasanton-commercial-office-cleaning.html">Pleasanton</a></li>
          <li><a href="${prefix}service-areas.html" style="color:var(--gold);font-weight:700">View All 16+ Cities →</a></li>
        </ul>
      </div>
      <div>
        <h4>Company &amp; Tools</h4>
        <ul>
          <li><a href="${prefix}about.html">About Prime Clean</a></li>
          <li><a href="${prefix}pricing.html">Pricing Calculator</a></li>
          <li><a href="${prefix}tools/walkthrough-scorecard.html">Walkthrough Scorecard Tool</a></li>
          <li><a href="${prefix}government.html">Government Contracting</a></li>
          <li><a href="${prefix}service-areas.html">Service Coverage</a></li>
          <li><a href="${prefix}blog.html">Blog &amp; Resources</a></li>
          <li><a href="${prefix}careers.html">Careers &amp; Jobs</a></li>
          <li><a href="${prefix}contact.html">Contact &amp; Free Walkthrough</a></li>
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
