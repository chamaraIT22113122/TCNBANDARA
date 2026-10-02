const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

const regex = /\.about-me, \.info-box, \.resume-item, \.icon-box, \.portfolio-wrap {/g;
const replacement = '.about-me, .info-box, .resume-item, .icon-box, .portfolio-wrap, .education-card, .experience-card, .skills-card, .contact-card {';
css = css.replace(regex, replacement);

fs.writeFileSync(cssPath, css);
console.log("Updated glass cards");
