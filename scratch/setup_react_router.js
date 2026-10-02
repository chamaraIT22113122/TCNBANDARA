const fs = require('fs');
const path = require('path');

const oldProjectsDir = '../old_portfolio/projects';
const newProjectsDir = '../client/src/pages/projects';

const files = fs.readdirSync(oldProjectsDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const name = path.basename(file, '.html');
    const componentName = name.charAt(0).toUpperCase() + name.slice(1).replace(/[^a-zA-Z0-9]/g, '') + 'Project';
    const filePath = path.join(oldProjectsDir, file);
    const htmlContent = fs.readFileSync(filePath, 'utf8');

    // Extract <main> content
    let mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    let mainContent = mainMatch ? mainMatch[1] : '';
    
    // Escape backticks and $ for the JS template string we generate
    mainContent = mainContent.replace(/`/g, '\\`').replace(/\$/g, '\\$');

    const componentCode = `
import React from 'react';

const rawHtml = \`
<main id="main">
${mainContent}
</main>
\`;

function ${componentName}() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default ${componentName};
`;
    
    fs.writeFileSync(path.join(newProjectsDir, `${componentName}.tsx`), componentCode);
});

console.log('Fixed project files generated.');
