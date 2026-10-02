const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

const override = `
/* Fix the Project Details Modal styling */
.portfolio-details {
  background: #010e1b !important;
  color: #e2e8f0 !important;
  min-height: 100vh;
  padding: 30px;
}
.portfolio-details h2 {
  color: #00ff87 !important;
}
.portfolio-details p, .portfolio-details li {
  color: #a0aec0 !important;
}
.portfolio-details strong {
  color: #fff !important;
}
`;

fs.appendFileSync(cssPath, override);
console.log("Project Details Modal CSS fixed.");
