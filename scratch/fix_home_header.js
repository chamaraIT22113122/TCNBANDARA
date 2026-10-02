const fs = require('fs');
let path = 'client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// I need to find the place where I injected `<section id="education" className="resume">`
// and prepend the rendering of `rawHtmlTop` split by Education Section.

const targetStr = '<section id="education" className="resume">';
const replacement = '<div dangerouslySetInnerHTML={{ __html: rawHtmlTop.split("<!-- ======= Education Section ======= -->")[0] }} />\\n      <section id="education" className="resume">';

if (content.includes(targetStr) && !content.includes('rawHtmlTop.split')) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync(path, content);
  console.log("Fixed Header and About sections missing!");
} else {
  console.log("Could not find target string or already fixed.");
}
