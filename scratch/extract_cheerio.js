const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('../client/src/pages/Home.tsx', 'utf8');

// The content in Home.tsx is mostly inside rawHtmlTop and rawHtmlBottom now!
// We'll just load the whole file into Cheerio and let it parse the HTML.
// Wait, the file is a TSX file with backticks. We should extract just the HTML parts.
const htmlMatchTop = content.match(/const rawHtmlTop = `([\s\S]*?)`;/);
const htmlMatchBottom = content.match(/const rawHtmlBottom = `([\s\S]*?)`;/);

const html = (htmlMatchTop ? htmlMatchTop[1] : '') + (htmlMatchBottom ? htmlMatchBottom[1] : content);
const $ = cheerio.load(html);

// 1. EXTRACT EDUCATION
const educationData = [];
$('.education-card').each((i, el) => {
  const image = $(el).find('img').attr('src') || '';
  const title = $(el).find('em').text() || '';
  const date = $(el).find('h5').text() || '';
  
  // The description is usually the p tag after the h6
  const descTag = $(el).find('h6').next('p');
  let description = descTag.text().trim();
  
  // Sometime it's an unordered list or other structure. If empty, grab all text after h5
  if (!description) {
    const listItems = [];
    $(el).find('ul li').each((j, li) => {
      listItems.push($(li).text().replace(/&#8226;/g, '').trim());
    });
    description = listItems.join('\n');
  }

  // If still empty, grab everything after h5 except the link
  if(!description && !$(el).find('ul').length) {
      let current = $(el).find('h5').next();
      while(current.length && current[0].name !== 'a') {
          if(current[0].name !== 'h6') {
             description += current.text() + '\n';
          }
          current = current.next();
      }
  }

  const link = $(el).find('a').attr('href') || '';

  educationData.push({ image, title, date, description: description.trim(), link });
});

// 2. EXTRACT EXPERIENCE
const experienceData = [];
$('.experience-item').each((i, el) => {
  const company = $(el).find('h4 a').text().trim() || $(el).find('h4').text().trim();
  const date = $(el).find('h5').text().trim();
  const role = $(el).find('p em').text().trim();
  
  const listItems = [];
  $(el).find('ul li').each((j, li) => {
    let text = $(li).text().trim();
    if(text.startsWith('•')) text = text.substring(1).trim();
    listItems.push(text);
  });
  
  experienceData.push({ company, date, role, description: listItems.join('\n') });
});

// 3. EXTRACT SKILLS
// Wait, the skills section is highly customized with specific logos.
// We can extract categories and their images.
const skillsData = [];
$('#skills .row').each((i, el) => {
  const category = $(el).find('h4').text().trim();
  if (category) {
    const images = [];
    $(el).find('img').each((j, img) => {
      images.push($(img).attr('src'));
    });
    skillsData.push({ category, images });
  }
});


const fileOutput = `
export const oldEducation = ${JSON.stringify(educationData, null, 2)};
export const oldExperience = ${JSON.stringify(experienceData, null, 2)};
export const oldSkills = ${JSON.stringify(skillsData, null, 2)};
`;

fs.writeFileSync('../client/src/data/legacyData3.ts', fileOutput);
console.log('Extracted ' + educationData.length + ' education, ' + experienceData.length + ' experiences, ' + skillsData.length + ' skills.');
