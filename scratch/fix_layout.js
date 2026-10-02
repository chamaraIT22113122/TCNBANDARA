const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Remove the reveal class CSS
css = css.replace(/\/\* Scroll Animation Classes \*\/[\s\S]*?\.reveal\.active\s*{[^}]*}/g, '');

// 2. Fix the header container centering to ONLY apply when it's NOT .header-top
// My previous script added: #header .container { ... }
// I will replace #header .container with #header:not(.header-top) .container
css = css.replace(/#header \.container {/g, '#header:not(.header-top) .container {');
// Same for the nav-menu
css = css.replace(/#header \.nav-menu ul {/g, '#header:not(.header-top) .nav-menu ul {');
css = css.replace(/#header h1, #header h2 {/g, '#header:not(.header-top) h1, #header:not(.header-top) h2 {');

fs.writeFileSync(cssPath, css);

const homeTsxPath = '../client/src/pages/Home.tsx';
let homeTsx = fs.readFileSync(homeTsxPath, 'utf8');

// Remove the intersection observer
const observerRegex = /\/\/ Add reveal class to sections and elements[\s\S]*?return \(\) => observer\.disconnect\(\);/g;
homeTsx = homeTsx.replace(observerRegex, '');

fs.writeFileSync(homeTsxPath, homeTsx);
console.log("Fixed layout issues.");
