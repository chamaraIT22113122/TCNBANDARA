const fs = require('fs');

const oldHtmlPath = '../old_portfolio/index.html';
const appTsxPath = '../client/src/App.tsx';

let html = fs.readFileSync(oldHtmlPath, 'utf8');

let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let fullBody = bodyMatch ? bodyMatch[1] : '';

// Split at vendor scripts to exclude them from the injected HTML (they are in index.html now)
const splitMarker = '<!-- Vendor JS Files -->';
let bodyHtml = fullBody.split(splitMarker)[0];

// Remove any inline scripts (like contact form) because they won't execute via dangerouslySetInnerHTML anyway
bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/gi, '');

// Escape backticks and ${} so we can put it in a JS template literal
bodyHtml = bodyHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');

const finalAppTsx = `
import React, { useEffect } from 'react';

const rawHtml = \`
${bodyHtml}
\`;

function App() {
  useEffect(() => {
    // If the typed.js script was already loaded in index.html, it might need to re-run on the new DOM.
    // However, since we use dangerouslySetInnerHTML on first render synchronously, it usually works!
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
  );
}

export default App;
`;

fs.writeFileSync(appTsxPath, finalAppTsx);

console.log('App.tsx updated with dangerouslySetInnerHTML');
