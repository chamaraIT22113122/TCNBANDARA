const fs = require('fs');
const path = 'c:/Users/Chamara/OneDrive - Wardena Group/Documents/TCNBANDARA/client/index.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /<script type="text\/javascript">[\s\S]*?<\/script>/;
fs.writeFileSync(path, content.replace(regex, ''), 'utf8');
console.log('Removed from index.html');
