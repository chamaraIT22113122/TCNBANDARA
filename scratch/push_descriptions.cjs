// push_descriptions.cjs
// Reads all Firestore projects and updates description field from old HTML content.

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const path = require('path');

// ── Firebase Admin init ──────────────────────────────────────────────────────
// Using the client SDK config with REST isn't ideal; use service account if you have one.
// For now we use firebase-admin with applicationDefault or embed config:
const app = initializeApp({
  credential: cert(require(path.join(__dirname, '../server/serviceAccount.json'))),
  projectId: 'tcn-bandara',
});

const db = getFirestore(app);

// ── Description map: title keyword → HTML description ───────────────────────
const descriptions = {
  'SKY-LIGHT-CINEMA': `
<h2>Sky Light Cinema Web Application</h2>
<ul>
  <li><strong>Tech Stack</strong>: MERN stack (MongoDB, Express.js, React.js, Node.js)</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/SKY-LIGHT-CINEMA" target="_blank">Project Link</a></li>
</ul>
<p>A web-based platform built with the <strong>MERN stack</strong> to streamline cinema operations, featuring:</p>
<ul>
  <li>Sales, Staff, and Inventory Management</li>
  <li>Showtime Scheduling</li>
  <li>Financial and Payment Processing</li>
  <li>Delivery &amp; Supplier Management</li>
</ul>
<p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>
`.trim(),

  'Blood-Donation': `
<h2>Blood Donation System</h2>
<ul>
  <li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Blood-Donation-System" target="_blank">Project Link</a></li>
</ul>
<p>A user-friendly platform built with PHP to streamline the blood donation process, catering to donors, administrators, and managers.</p>
<ul>
  <li>User Registration: Quick sign-up with access to donation details and nearby centers.</li>
  <li>Donation Management: Schedule, manage appointments, and provide feedback.</li>
  <li>Administrative Panel: Manage users, appointments, staff, and social media content.</li>
  <li>Managerial Operations: Generate reports and oversee finances for system efficiency.</li>
</ul>
<p>Efficient workflows ensure seamless interaction across roles, making the app a valuable tool for life-saving contributions.</p>
`.trim(),

  'Online-Book-Store': `
<h2>Online Book Store</h2>
<ul>
  <li><strong>Tech Stack</strong>: HTML, PHP, CSS, and JavaScript</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Book-Store" target="_blank">Project Link</a></li>
</ul>
<p>A simple and elegant platform built using HTML and CSS, designed for book lovers. It offers a visually appealing interface with essential features for browsing and searching books.</p>
<ul>
  <li>Home Page: Showcases featured books and categories.</li>
  <li>Search Functionality: Search books by title, author, or genre.</li>
  <li>Responsive Design: Works seamlessly on desktop and mobile devices.</li>
  <li>Book Details Page: Displays book descriptions, authors, and prices.</li>
  <li>Categories &amp; Filters: Organize books by genre or popularity for easier navigation.</li>
</ul>
<p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>
`.trim(),

  'Online-Stock-Management': `
<h2>Online Stock Management System</h2>
<ul>
  <li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Stock-Management-System" target="_blank">Project Link</a></li>
</ul>
<p>A comprehensive web-based stock management system designed for businesses to efficiently track, manage, and analyze their inventory.</p>
<ul>
  <li>Real-time inventory tracking and updates.</li>
  <li>Product categorization and search functionality.</li>
  <li>Stock alerts for low inventory levels.</li>
  <li>Sales and purchase order management.</li>
  <li>Reports and analytics dashboard.</li>
</ul>
<p><strong>GitHub</strong> is used for version control, ensuring smooth collaboration across team members.</p>
`.trim(),

  'To_Do_List': `
<h2>To-Do List App</h2>
<ul>
  <li><strong>Tech Stack</strong>: Android (Kotlin), SQLite</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/To-Do-List" target="_blank">Project Link</a></li>
</ul>
<p>A clean and minimal Android mobile application to help users manage daily tasks efficiently.</p>
<ul>
  <li>Add, edit, and delete tasks with ease.</li>
  <li>Mark tasks as complete with a simple checkbox.</li>
  <li>Persistent local storage using SQLite.</li>
  <li>Minimalist UI for distraction-free productivity.</li>
</ul>
`.trim(),

  'MediMingle': `
<h2>MediMingle Mobile App</h2>
<ul>
  <li><strong>Tech Stack</strong>: Flutter, Firebase</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/MediMingle" target="_blank">Project Link</a></li>
</ul>
<p>A healthcare mobile application connecting patients with medical professionals for seamless appointment booking and health management.</p>
<ul>
  <li>Patient registration and profile management.</li>
  <li>Doctor search and appointment booking.</li>
  <li>Real-time notifications and reminders.</li>
  <li>Medical history tracking.</li>
  <li>Firebase backend for real-time data sync.</li>
</ul>
`.trim(),

  'Supplier Manager': `
<h2>Supplier Manager Dashboard UI</h2>
<ul>
  <li><strong>Tech Stack</strong>: Figma (UI/UX Design)</li>
</ul>
<p>A comprehensive dashboard UI design for managing suppliers, procurement, and inventory for enterprise-level businesses.</p>
<ul>
  <li>Supplier directory and contact management.</li>
  <li>Purchase order tracking and status updates.</li>
  <li>Analytics and performance metrics.</li>
  <li>Responsive design for desktop and tablet.</li>
</ul>
`.trim(),

  'Social Media': `
<h2>Social Media Posts</h2>
<ul>
  <li><strong>Tools</strong>: Adobe Photoshop, Illustrator, Canva</li>
</ul>
<p>A collection of professionally designed social media post templates and graphics created for various brands and campaigns.</p>
<ul>
  <li>Instagram, Facebook, and LinkedIn post designs.</li>
  <li>Brand-consistent color schemes and typography.</li>
  <li>Promotional and event announcement graphics.</li>
  <li>Engaging visual content for digital marketing.</li>
</ul>
`.trim(),
};

// ── Match project title to description ──────────────────────────────────────
function findDescription(title) {
  for (const [key, desc] of Object.entries(descriptions)) {
    if (title.toLowerCase().includes(key.toLowerCase().replace(/-/g, ' ').toLowerCase()) ||
        title.replace(/_/g, ' ').toLowerCase().includes(key.toLowerCase().replace(/-/g, ' '))) {
      return desc;
    }
  }
  return null;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const snap = await db.collection('projects').get();
  let updated = 0;

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const title = data.title || '';
    const desc = findDescription(title);

    if (desc && !data.description) {
      await docSnap.ref.update({ description: desc });
      console.log(`✅ Updated: ${title}`);
      updated++;
    } else if (data.description) {
      console.log(`⏭  Already has description: ${title}`);
    } else {
      console.log(`❌ No match found: ${title}`);
    }
  }

  console.log(`\nDone. ${updated} project(s) updated.`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
