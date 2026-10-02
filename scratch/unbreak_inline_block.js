const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Undo the global replace mistake!
css = css.replace(/\/\* display: inline-block; \*\//g, 'display: inline-block;');

fs.writeFileSync(cssPath, css);
console.log("Restored inline-block properties globally.");
