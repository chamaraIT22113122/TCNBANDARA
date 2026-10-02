const fs = require('fs');

const oldHtmlPath = '../old_portfolio/index.html';
const appTsxPath = '../client/src/App.tsx';

let html = fs.readFileSync(oldHtmlPath, 'utf8');

// 1. Extract body
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let fullBody = bodyMatch ? bodyMatch[1] : '';

// 2. Split body at vendor scripts
const splitMarker = '<!-- Vendor JS Files -->';
let bodyHtml = fullBody.split(splitMarker)[0];

// FIX HTML ERRORS:
// There is an extra </div> in the About Me section.
bodyHtml = bodyHtml.replace(/<\/div>\s*<\/div><!-- End About Me -->/g, '</div><!-- End About Me -->');
// There is a missing closing tag for Interests section? The error was: Expected `</section>`
// Let's see:
// <section id="about" class="about">
//   <div class="about-me container"> ... </div>
//   <div class="interests container"> ... </div>
// </section> <!-- End About Section -->
// If we removed the extra div, maybe the section closes properly.

// Let's also remove inline scripts to avoid React execution issues
bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

// Convert bodyHtml to JSX
let jsx = bodyHtml;
jsx = jsx.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
jsx = jsx.replace(/class=/g, 'className=');
jsx = jsx.replace(/for=/g, 'htmlFor=');
// Add trailing slashes to self closing tags
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

const finalAppTsx = `
import React, { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    // We can initialize things here
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

console.log('Conversion to JSX successful!');
