const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* =========================================
   FINAL UI FIXES (CENTERING & VISIBILITY)
   ========================================= */

/* 1. Center the Home Page Header completely */
#header:not(.header-top) {
  justify-content: center !important;
  text-align: center !important;
  width: 100% !important;
}
#header:not(.header-top) .container {
  margin: 0 auto !important;
}

/* 2. Fix the Section Titles being invisible */
.section-title h2 {
  display: block !important;
  line-height: 1.2 !important; /* Original line-height: 1px was breaking the gradient */
  visibility: visible !important;
  opacity: 1 !important;
}
.section-title h2::after {
  display: block !important;
  margin: 10px auto !important; /* Center the underline */
}
.section-title {
  text-align: center !important; /* Center the title container */
}

/* 3. Make sure the background isn't clipping */
body {
  background: transparent !important;
}
`;

fs.appendFileSync(cssPath, override);
console.log("Final UI Fixes Applied.");
