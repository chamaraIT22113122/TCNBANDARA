const fs = require('fs');
const path = '../client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// We broke it in the last step, let's fix it properly using ParticlesProvider

// 1. Add ParticlesProvider to imports
content = content.replace(
  "import Particles from '@tsparticles/react';",
  "import Particles, { ParticlesProvider } from '@tsparticles/react';"
);

// 2. Replace the broken block we just inserted
const brokenBlock = `import { ParticlesProvider } from '@tsparticles/react';

// ... (Wait, I cannot just replace lines 860-880 with an import, I need to replace the whole return statement)`;

const correctBlock = `\`;

function Home() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#010e1b' }}
        options={{
          background: { color: { value: "#010e1b" } },`;

content = content.replace(brokenBlock, correctBlock);

// 3. Close the ParticlesProvider at the end of the return statement
content = content.replace(
  '<div dangerouslySetInnerHTML={{ __html: rawHtml }} />\n    </>\n  );\n}',
  '<div dangerouslySetInnerHTML={{ __html: rawHtml }} />\n    </ParticlesProvider>\n  );\n}'
);
content = content.replace(
  '<div dangerouslySetInnerHTML={{ __html: rawHtml }} />\n      </>\n    );\n}',
  '<div dangerouslySetInnerHTML={{ __html: rawHtml }} />\n    </ParticlesProvider>\n  );\n}'
);
// In case the `</>` is indented differently
content = content.replace(
  /<\/?>( |\t|\n)*<div dangerouslySetInnerHTML=\{\{ __html: rawHtml \}\} \/>( |\t|\n)*<\/?>( |\t|\n)*\);/g,
  '<div dangerouslySetInnerHTML={{ __html: rawHtml }} />\n    </ParticlesProvider>\n  );'
);

fs.writeFileSync(path, content);
console.log("Refactored to use ParticlesProvider.");
