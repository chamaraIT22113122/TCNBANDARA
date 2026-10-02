const fs = require('fs');
const path = '../client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports
const importsToAdd = `import { collection, addDoc } from "firebase/firestore";\nimport { db } from "../firebase";\n`;
if (!content.includes('firebase/firestore')) {
  content = content.replace("import { loadSlim } from '@tsparticles/slim';", "import { loadSlim } from '@tsparticles/slim';\n" + importsToAdd);
}

// Add the useEffect for the form
const formEffect = `
  useEffect(() => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById('submit-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date()
      };

      try {
        await addDoc(collection(db, "contacts"), data);
        const successMsg = document.getElementById('success-message');
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 5000);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to send message. Please check Firebase configuration.");
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);
`;

// Insert the formEffect before return statement
content = content.replace("return (", formEffect + "\n  return (");

fs.writeFileSync(path, content);
console.log("Firebase contact form interception added to Home.tsx");
