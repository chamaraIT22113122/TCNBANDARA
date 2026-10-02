const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* REMOVE BACKGROUND IMAGE */
body {
  background-image: none !important;
  background: transparent !important;
}
`;

fs.appendFileSync(cssPath, override);
console.log("Removed background image.");
