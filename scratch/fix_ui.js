const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Force the sections to have plenty of breathing room below the header
const spacingFix = `
/* UI Layout Space Fix */
section.section-show {
  top: 110px !important; 
}
@media (max-width: 992px) {
  section.section-show {
    top: 90px !important;
  }
}
`;
css += spacingFix;

// 2. Fix the gradient text collapsing issue on the h2
css = css.replace(/display: inline-block;/g, '/* display: inline-block; */');

// 3. Make sure the section titles are explicitly visible and spaced
const titleFix = `
.section-title h2 {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  margin-bottom: 25px !important;
  font-size: 20px !important;
}
`;
css += titleFix;

fs.writeFileSync(cssPath, css);
console.log("UI Layout Fixed");
