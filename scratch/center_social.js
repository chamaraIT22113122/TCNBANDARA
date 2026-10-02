const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* Center the social links on the home page */
#header .social-links {
  justify-content: center !important;
  width: 100%;
}
`;

fs.appendFileSync(cssPath, override);
console.log("Social links centered.");
