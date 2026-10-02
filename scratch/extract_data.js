const fs = require('fs');

const content = fs.readFileSync('../client/src/pages/Home.tsx', 'utf8');

function extractBetween(str, start, end) {
  const i1 = str.indexOf(start);
  if (i1 === -1) return '';
  const i2 = str.indexOf(end, i1 + start.length);
  if (i2 === -1) return '';
  return str.substring(i1 + start.length, i2);
}

const eduHtml = extractBetween(content, '<!-- ======= Education Section ======= -->', '<!-- End Education Section -->');
const expHtml = extractBetween(content, '<!-- Start Experience Section -->', '<!-- End Experience Section -->');

// Extract education cards
const educationData = [];
const eduRegex = /<img src="([^"]+)"[\s\S]*?<p><em>([^<]+)<\/em><\/p>\s*<h5>([^<]+)<\/h5>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<a href="([^"]+)"/g;
let match;
while ((match = eduRegex.exec(eduHtml)) !== null) {
  educationData.push({
    image: match[1],
    title: match[2].trim(),
    date: match[3].trim(),
    description: match[4].trim(),
    link: match[5]
  });
}

// Extract experience cards
const experienceData = [];
const expRegex = /<h4>\s*<a[^>]*>([^<]+)<\/a>\s*<\/h4>\s*<h5>([^<]+)<\/h5>\s*<p><em>([^<]+)<\/em><\/p>\s*<ul>([\s\S]*?)<\/ul>/g;
while ((match = expRegex.exec(expHtml)) !== null) {
  const listItems = match[4].replace(/<li>/g, '').replace(/<\/li>/g, '\n').replace(/&#8226;/g, '').trim();
  experienceData.push({
    company: match[1].trim(),
    date: match[2].trim(),
    role: match[3].trim(),
    description: listItems
  });
}

const fileOutput = `
export const oldEducation = ${JSON.stringify(educationData, null, 2)};
export const oldExperience = ${JSON.stringify(experienceData, null, 2)};
`;

fs.writeFileSync('../client/src/data/legacyData2.ts', fileOutput);
console.log('Extracted ' + educationData.length + ' education and ' + experienceData.length + ' experiences.');
