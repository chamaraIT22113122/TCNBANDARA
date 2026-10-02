const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* FORCE SECTION VISIBILITY */
section.section-show {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 9999 !important;
  top: 100px !important;
  height: auto !important;
  min-height: 100vh !important;
  bottom: auto !important;
}

section.section-show .container {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
`;

fs.appendFileSync(cssPath, override);
console.log("Appended visibility override.");
