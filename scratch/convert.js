const fs = require('fs');

const oldHtmlPath = '../old_portfolio/index.html';
const newHtmlPath = '../client/index.html';
const appTsxPath = '../client/src/App.tsx';

let html = fs.readFileSync(oldHtmlPath, 'utf8');

// 1. Extract head
const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
let headContent = headMatch ? headMatch[1] : '';

// 2. Extract body
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let fullBody = bodyMatch ? bodyMatch[1] : '';

// 3. Split body at vendor scripts
const splitMarker = '<!-- Vendor JS Files -->';
let bodyParts = fullBody.split(splitMarker);
let bodyHtml = bodyParts[0];
let scriptsHtml = splitMarker + (bodyParts.length > 1 ? bodyParts[1] : '');

// Convert bodyHtml to JSX
let jsx = bodyHtml;
jsx = jsx.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/for=/g, 'htmlFor=');
jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    const styles = p1.split(';').filter(s => s.trim() !== '');
    const styleObj = {};
    styles.forEach(s => {
        const parts = s.split(':');
        if(parts.length === 2) {
            let key = parts[0].trim();
            key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            styleObj[key] = parts[1].trim();
        }
    });
    return `style={${JSON.stringify(styleObj)}}`;
});
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// We have one inline script left (contact form). We need to remove it or convert it to React.
// I will just remove the inline contact form script since we'll handle contact forms the React way, or leave it and let React ignore it (but it's invalid JSX).
jsx = jsx.replace(/<script>[\s\S]*?<\/script>/g, '');

const finalAppTsx = `
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Reload main.js if needed
    if (window.typed) {
        // reinit if necessary
    }
  }, []);

  return (
    <>
      ${jsx}
    </>
  );
}

export default App;
`;

fs.writeFileSync(appTsxPath, finalAppTsx);

const baseNewHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TCN Bandara Portfolio</title>
    ${headContent}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    ${scriptsHtml}
  </body>
</html>`;

fs.writeFileSync(newHtmlPath, baseNewHtml);

console.log('Conversion successful v2!');
