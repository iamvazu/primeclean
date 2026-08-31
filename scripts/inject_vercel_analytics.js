const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const analyticsSnippet = `  <!-- Vercel Web Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('/_vercel/insights/script.js')) {
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${analyticsSnippet}\n</head>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Injected Vercel Analytics into: ${path.relative(rootDir, filePath)}`);
    }
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    if (file === 'node_modules' || file === '.git') return;
    if (fs.statSync(full).isDirectory()) {
      walkDir(full);
    } else if (file.endsWith('.html')) {
      processFile(full);
    }
  });
}

walkDir(rootDir);
console.log('Finished injecting Vercel Analytics across all HTML pages.');
