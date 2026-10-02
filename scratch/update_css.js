const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Remove body::before background
css = css.replace(/body::before\s*{[^}]*}/g, 'body::before { display: none; }');

// Remove background image from #header
css = css.replace(/background-image:\s*url\('\/assets\/img\/background\/bg.jpg'\);/g, '');

// Center everything in #header
// Find the #header rule and add text-align: center
// Actually, it's safer to just append a new rule for #header .container
css += `
/* Center Header Content */
#header .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

#header .nav-menu ul {
  justify-content: center;
}

#header h1, #header h2 {
  text-align: center;
}
`;

fs.writeFileSync(cssPath, css);
console.log("CSS updated!");
