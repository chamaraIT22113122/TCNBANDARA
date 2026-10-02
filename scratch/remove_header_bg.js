const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* FORCE REMOVE HEADER BACKGROUND IMAGE */
#header:not(.header-top) {
  background-image: none !important;
  background: transparent !important;
}
#header::before {
  display: none !important;
}
`;

fs.appendFileSync(cssPath, override);
console.log("Removed header background.");
