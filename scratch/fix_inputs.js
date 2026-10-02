const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Change background shorthand to background-color to avoid breaking browser extensions (like Temp Mail)
css = css.replace(/background: rgba\(255, 255, 255, 0\.05\) !important;/g, 'background-color: rgba(255, 255, 255, 0.05) !important;');

fs.writeFileSync(cssPath, css);
console.log("Fixed form-control background bug.");
