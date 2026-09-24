const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const gtagSnippet = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-202VFCD2WZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-202VFCD2WZ');
</script>`;

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);
let updatedCount = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already contains this Google Tag
  if (content.includes('G-202VFCD2WZ')) {
    return;
  }
  
  if (content.includes('<head>')) {
    content = content.replace('<head>', `<head>\n${gtagSnippet}`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  } else if (content.includes('<head\n')) {
    content = content.replace(/<head[^>]*>/, `$& \n${gtagSnippet}`);
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Successfully injected Google Tag (G-202VFCD2WZ) into ${updatedCount} HTML files.`);
