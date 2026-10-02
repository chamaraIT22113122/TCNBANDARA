const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* GLASSMORPHIC HEADER OVERRIDE */
#header.header-top {
  background: rgba(1, 14, 27, 0.7) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
`;

fs.appendFileSync(cssPath, override);
console.log("Header glassmorphism added.");
