const fs = require('fs');
const path = 'c:/Users/Chamara/OneDrive - Wardena Group/Documents/TCNBANDARA/client/index.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /strings:\s*\[.*?\]/s;
const newStrings = `strings: [
        "Software Developer", 
        "Graphic Designer", 
        "Video Editor", 
        "UI/UX Designer", 
        "Full Stack Developer", 
        "Mobile App Developer",
        "Tech Enthusiast"
      ]`;

if (regex.test(content)) {
    fs.writeFileSync(path, content.replace(regex, newStrings), 'utf8');
    console.log('Successfully updated the typed strings in index.html!');
} else {
    console.log('Regex match failed!');
}
