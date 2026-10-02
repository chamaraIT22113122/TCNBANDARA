const fs = require('fs');
const path = '../client/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Check if Admin is already imported
if (!content.includes('import Admin from')) {
  content = content.replace("import Home from './pages/Home';", "import Home from './pages/Home';\nimport Admin from './pages/Admin';");
  
  // Insert the Route
  content = content.replace('<Route path="/" element={<Home />} />', '<Route path="/" element={<Home />} />\n        <Route path="/admin" element={<Admin />} />');
  
  fs.writeFileSync(path, content);
  console.log("Admin route added to App.tsx");
} else {
  console.log("Admin route already exists");
}
