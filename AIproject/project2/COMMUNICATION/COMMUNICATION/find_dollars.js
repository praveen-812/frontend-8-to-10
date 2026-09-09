const fs = require('fs');
const files = ['index.html', 'js/app.js'];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Look for dollar signs not inside template literals or regex
    if (line.includes('$') && !line.includes('${')) {
      console.log(`${f}:${idx + 1}: ${line.trim()}`);
    }
  });
});
