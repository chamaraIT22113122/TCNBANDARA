import React, { useState, useEffect, useRef } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Profile DP state
  const [dpImageUrl, setDpImageUrl] = useState<string>('');
  const [dpUploading, setDpUploading] = useState(false);
  const [dpSaveStatus, setDpSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dpError, setDpError] = useState<string>('');

  // Upload state
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Project form
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('filter-app');
  const [pThumbnail, setPThumbnail] = useState('');       // card thumbnail (images[0])
  const [pGalleryImages, setPGalleryImages] = useState<string[]>([]); // popup gallery
  const [pLink, setPLink] = useState('');
  const [pButtonLabel, setPButtonLabel] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pTechStack, setPTechStack] = useState('');
  const [pImages, setPImages] = useState(''); // kept for legacy compat
  const [projectCategories, setProjectCategories] = useState<any[]>([]);
  const [catName, setCatName] = useState('');

  // Education form
  const [eTitle, setETitle] = useState('');
  const [eDate, setEDate] = useState('');
  const [eDesc, setEDesc] = useState('');
  const [eImage, setEImage] = useState('');
  const [eLink, setELink] = useState('');
  const [eButtonName, setEButtonName] = useState('');

  // Experience form
  const [exCompany, setExCompany] = useState('');
  const [exDate, setExDate] = useState('');
  const [exRole, setExRole] = useState('');
  const [exDesc, setExDesc] = useState('');
  const [exImage, setExImage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchAllData();
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError('');
    } catch {
      setLoginError('Invalid credentials.');
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [pSnap, eSnap, exSnap, sSnap, catSnap] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(collection(db, 'education')),
        getDocs(collection(db, 'experience')),
        getDocs(collection(db, 'skills')),
        getDocs(collection(db, 'projectCategories')),
      ]);
      
      // ─── ONE-TIME MIGRATION OF HARDCODED DESCRIPTIONS ───
      const oldDescriptions: Record<string, string> = {
        'SKY-LIGHT-CINEMA_Web_APP': `<h2>Sky Light Cinema Web Application</h2><ul><li><strong>Tech Stack</strong>: MERN stack (MongoDB, Express.js, React.js, Node.js)</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/SKY-LIGHT-CINEMA" target="_blank">Project Link</a></li></ul><p>A web-based platform built with the <strong>MERN stack</strong> to streamline cinema operations, featuring:</p><ul><li>Sales, Staff, and Inventory Management</li><li>Showtime Scheduling</li><li>Financial and Payment Processing</li><li>Delivery &amp; Supplier Management</li></ul><p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,
        'Blood-Donation-System_Web_APP': `<h2>Blood Donation System</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Blood-Donation-System" target="_blank">Project Link</a></li></ul><p>A user-friendly platform built with PHP to streamline the blood donation process, catering to donors, administrators, and managers.</p><ul><li>User Registration: Quick sign-up with access to donation details and nearby centers.</li><li>Donation Management: Schedule, manage appointments, and provide feedback.</li><li>Administrative Panel: Manage users, appointments, staff, and social media content.</li><li>Managerial Operations: Generate reports and oversee finances for system efficiency.</li></ul><p>Efficient workflows ensure seamless interaction across roles, making the app a valuable tool for life-saving contributions.</p>`,
        'Online-Book-Store_Web_APP': `<h2>Online Book Store</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, and JavaScript</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Book-Store" target="_blank">Project Link</a></li></ul><p>A simple and elegant platform built using HTML and CSS, designed for book lovers. It offers a visually appealing interface with essential features for browsing and searching books.</p><ul><li>Home Page: Showcases featured books and categories.</li><li>Search Functionality: Search books by title, author, or genre.</li><li>Responsive Design: Works seamlessly on desktop and mobile devices.</li><li>Book Details Page: Displays book descriptions, authors, and prices.</li><li>Categories &amp; Filters: Organize books by genre or popularity for easier navigation.</li></ul><p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,
        'Online-Stock-Management-System_Web_APP': `<h2>Online Stock Management System</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Stock-Management-System" target="_blank">Project Link</a></li></ul><p>A comprehensive web-based stock management system for businesses to efficiently track, manage, and analyze inventory.</p><ul><li>Real-time inventory tracking and updates.</li><li>Product categorization and search functionality.</li><li>Stock alerts for low inventory levels.</li><li>Sales and purchase order management.</li><li>Reports and analytics dashboard.</li></ul><p><strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,
        'To_Do_List_APP': `<h2>To-Do List App</h2><ul><li><strong>Tech Stack</strong>: Android (Kotlin), SQLite</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/To-Do-List" target="_blank">Project Link</a></li></ul><p>A clean and minimal Android mobile application to help users manage daily tasks efficiently.</p><ul><li>Add, edit, and delete tasks with ease.</li><li>Mark tasks as complete with a simple checkbox.</li><li>Persistent local storage using SQLite.</li><li>Minimalist UI for distraction-free productivity.</li></ul>`,
        'MediMingle_Mobile_APP': `<h2>MediMingle Mobile App</h2><ul><li><strong>Tech Stack</strong>: Flutter, Firebase</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/MediMingle" target="_blank">Project Link</a></li></ul><p>A healthcare mobile application connecting patients with medical professionals for seamless appointment booking and health management.</p><ul><li>Patient registration and profile management.</li><li>Doctor search and appointment booking.</li><li>Real-time notifications and reminders.</li><li>Medical history tracking.</li><li>Firebase backend for real-time data sync.</li></ul>`,
        'Supplier Manager Dashboard UI Design': `<h2>Supplier Manager Dashboard UI</h2><ul><li><strong>Design Tool</strong>: Figma</li></ul><p>A comprehensive dashboard UI design for managing suppliers, procurement, and inventory for enterprise-level businesses.</p><ul><li>Supplier directory and contact contact management.</li><li>Purchase order tracking and status updates.</li><li>Analytics and performance metrics.</li><li>Responsive design for desktop and tablet.</li></ul>`,
        'Social Media Posts': `<h2>Social Media Posts</h2><ul><li><strong>Tools</strong>: Adobe Photoshop, Illustrator, Canva</li></ul><p>A collection of professionally designed social media post templates and graphics created for various brands and campaigns.</p><ul><li>Instagram, Facebook, and LinkedIn post designs.</li><li>Brand-consistent color schemes and typography.</li><li>Promotional and event announcement graphics.</li><li>Engaging visual content for digital marketing.</li></ul>`
      };

      const pData = pSnap.docs.map(d => ({ id: d.id, ...d.data() as any }));
      for (const p of pData) {
        if (!p.description && oldDescriptions[p.title]) {
          await updateDoc(doc(db, 'projects', p.id), { description: oldDescriptions[p.title] });
          p.description = oldDescriptions[p.title];
        }
      }
      
      // Inject createdAt for existing projects that don't have it
      for (let i = 0; i < pData.length; i++) {
        const p = pData[i];
        if (!p.createdAt) {
          // Give it a fake timestamp in the past, spaced out by 1 minute, so they have SOME order
          const fakeTime = Date.now() - (10000000) + (i * 60000);
          await updateDoc(doc(db, 'projects', p.id), { createdAt: fakeTime });
          p.createdAt = fakeTime;
        }
      }

      setProjects(pData);
      // ───────────────────────────────────────────────────────

      setEducation(eSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setExperience(exSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setSkills(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      let cats = catSnap.docs.map(d => ({ id: d.id, ...d.data() as any }));
      if (cats.length === 0) {
        // Seed default categories
        const defaults = [
          { name: 'Web-App', filter: 'filter-app' },
          { name: 'Mobile App', filter: 'filter-mobile' },
          { name: 'UX/UI Design', filter: 'filter-ux' },
          { name: 'Graphic Design', filter: 'filter-graphic' },
          { name: 'Other', filter: 'filter-other' }
        ];
        for (const def of defaults) {
          const docRef = await addDoc(collection(db, 'projectCategories'), def);
          cats.push({ id: docRef.id, ...def });
        }
      }
      setProjectCategories(cats);

      // Fetch current profile image from Firestore
      const profileDoc = await getDoc(doc(db, 'settings', 'profile'));
      if (profileDoc.exists()) {
        const data = profileDoc.data();
        if (data?.imageBase64) setDpImageUrl(data.imageBase64);
        else if (data?.imageUrl) setDpImageUrl(data.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Base64 Image Upload (No Storage Required) ──────────────
  const uploadImage = (file: File, pathPrefix = 'projects'): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_DIM = 1024; // Increased from 500 to 1024 for better image clarity

          if (width > height && width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          } else if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            
            // Force WebP for massive compression while keeping transparency
            let dataUrl = canvas.toDataURL('image/webp', 0.8);
            
            // If the browser doesn't support WebP (it silently falls back to PNG), 
            // force JPEG to guarantee it fits under 1MB, filling transparent background with white
            if (dataUrl.startsWith('data:image/png') && file.type !== 'image/png') {
                // Fill white background for JPEG
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, width, height);
                dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            } else if (dataUrl.startsWith('data:image/png') && file.type === 'image/png') {
                // If it was originally a PNG and webp isn't supported, we have to use jpeg to compress it
                // because PNG ignores the 0.8 quality and will hit the 1MB limit.
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            }
            
            resolve(dataUrl);
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => reject('Image load error');
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject('File read error');
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadImage(file);
        urls.push(url);
      }
      // Append to existing pImages
      const existing = pImages.trim();
      const combined = existing ? existing + '\n' + urls.join('\n') : urls.join('\n');
      setPImages(combined);
    } catch (err) {
      alert('Upload failed. Check Firebase Storage rules.');
      console.error(err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ─── Project Categories CRUD ────────────────────────────────────────────────
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    const filter = 'filter-' + catName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    await addDoc(collection(db, 'projectCategories'), { name: catName.trim(), filter });
    setCatName('');
    fetchAllData();
  };
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Delete this category?')) {
      await deleteDoc(doc(db, 'projectCategories', id));
      fetchAllData();
    }
  };

  // ─── Project CRUD ───────────────────────────────────────────────────────────
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      // thumbnail first, then gallery images
      const allImages = [pThumbnail, ...pGalleryImages].filter(Boolean);
      const data: any = {
        title: pTitle, category: pCategory,
        thumbnail: pThumbnail,
        images: allImages,
        link: pLink, buttonLabel: pButtonLabel,
        description: pDesc, techStack: pTechStack
      };
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), data);
        setEditingId(null);
      } else {
        data.createdAt = Date.now();
        await addDoc(collection(db, 'projects'), data);
      }
      setPTitle(''); setPThumbnail(''); setPGalleryImages([]); setPLink(''); setPButtonLabel(''); setPCategory('filter-app'); setPDesc(''); setPTechStack('');
      setPImages('');
      fetchAllData();
    } catch (err: any) {
      console.error(err);
      alert('Failed to save project. If you uploaded many images, they might exceed the database size limit. Try adding fewer images. Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditProject = (p: any) => {
    const oldDescriptions: Record<string, string> = {
      'SKY-LIGHT-CINEMA_Web_APP': `<h2>Sky Light Cinema Web Application</h2><ul><li><strong>Tech Stack</strong>: MERN stack (MongoDB, Express.js, React.js, Node.js)</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/SKY-LIGHT-CINEMA" target="_blank">Project Link</a></li></ul><p>A web-based platform built with the <strong>MERN stack</strong> to streamline cinema operations, featuring:</p><ul><li>Sales, Staff, and Inventory Management</li><li>Showtime Scheduling</li><li>Financial and Payment Processing</li><li>Delivery &amp; Supplier Management</li></ul><p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,
      'Blood-Donation-System_Web_APP': `<h2>Blood Donation System</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Blood-Donation-System" target="_blank">Project Link</a></li></ul><p>A user-friendly platform built with PHP to streamline the blood donation process, catering to donors, administrators, and managers.</p><ul><li>User Registration: Quick sign-up with access to donation details and nearby centers.</li><li>Donation Management: Schedule, manage appointments, and provide feedback.</li><li>Administrative Panel: Manage users, appointments, staff, and social media content.</li><li>Managerial Operations: Generate reports and oversee finances for system efficiency.</li></ul><p>Efficient workflows ensure seamless interaction across roles, making the app a valuable tool for life-saving contributions.</p>`,
      'Online-Book-Store_Web_APP': `<h2>Online Book Store</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, and JavaScript</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Book-Store" target="_blank">Project Link</a></li></ul><p>A simple and elegant platform built using HTML and CSS, designed for book lovers. It offers a visually appealing interface with essential features for browsing and searching books.</p><ul><li>Home Page: Showcases featured books and categories.</li><li>Search Functionality: Search books by title, author, or genre.</li><li>Responsive Design: Works seamlessly on desktop and mobile devices.</li><li>Book Details Page: Displays book descriptions, authors, and prices.</li><li>Categories &amp; Filters: Organize books by genre or popularity for easier navigation.</li></ul><p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,
      'Online-Stock-Management-System_Web_APP': `<h2>Online Stock Management System</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Stock-Management-System" target="_blank">Project Link</a></li></ul><p>A comprehensive web-based stock management system for businesses to efficiently track, manage, and analyze inventory.</p><ul><li>Real-time inventory tracking and updates.</li><li>Product categorization and search functionality.</li><li>Stock alerts for low inventory levels.</li><li>Sales and purchase order management.</li><li>Reports and analytics dashboard.</li></ul><p><strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,
      'To_Do_List_APP': `<h2>To-Do List App</h2><ul><li><strong>Tech Stack</strong>: Android (Kotlin), SQLite</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/To-Do-List" target="_blank">Project Link</a></li></ul><p>A clean and minimal Android mobile application to help users manage daily tasks efficiently.</p><ul><li>Add, edit, and delete tasks with ease.</li><li>Mark tasks as complete with a simple checkbox.</li><li>Persistent local storage using SQLite.</li><li>Minimalist UI for distraction-free productivity.</li></ul>`,
      'MediMingle_Mobile_APP': `<h2>MediMingle Mobile App</h2><ul><li><strong>Tech Stack</strong>: Flutter, Firebase</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/MediMingle" target="_blank">Project Link</a></li></ul><p>A healthcare mobile application connecting patients with medical professionals for seamless appointment booking and health management.</p><ul><li>Patient registration and profile management.</li><li>Doctor search and appointment booking.</li><li>Real-time notifications and reminders.</li><li>Medical history tracking.</li><li>Firebase backend for real-time data sync.</li></ul>`,
      'Supplier Manager Dashboard UI Design': `<h2>Supplier Manager Dashboard UI</h2><ul><li><strong>Design Tool</strong>: Figma</li></ul><p>A comprehensive dashboard UI design for managing suppliers, procurement, and inventory for enterprise-level businesses.</p><ul><li>Supplier directory and contact contact management.</li><li>Purchase order tracking and status updates.</li><li>Analytics and performance metrics.</li><li>Responsive design for desktop and tablet.</li></ul>`,
      'Social Media Posts': `<h2>Social Media Posts</h2><ul><li><strong>Tools</strong>: Adobe Photoshop, Illustrator, Canva</li></ul><p>A collection of professionally designed social media post templates and graphics created for various brands and campaigns.</p><ul><li>Instagram, Facebook, and LinkedIn post designs.</li><li>Brand-consistent color schemes and typography.</li><li>Promotional and event announcement graphics.</li><li>Engaging visual content for digital marketing.</li></ul>`
    };

    setEditingId(p.id);
    setPTitle(p.title);
    setPCategory(p.category || 'filter-app');
    const imgs: string[] = p.images || (p.image ? [p.image] : []);
    setPThumbnail(p.thumbnail || imgs[0] || '');
    setPGalleryImages(imgs.slice(p.thumbnail ? 0 : 1));
    setPLink(p.link || '');
    setPButtonLabel(p.buttonLabel || '');
    
    // Automatically load the description from the old dictionary if it's missing in the database
    setPDesc(p.description || oldDescriptions[p.title] || '');
    setPTechStack(p.techStack || '');
    setPImages('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Education CRUD ─────────────────────────────────────────────────────────
  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title: eTitle, date: eDate, description: eDesc, image: eImage, link: eLink, buttonName: eButtonName };
    if (editingId) {
      await updateDoc(doc(db, 'education', editingId), data);
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'education'), data);
    }
    setETitle(''); setEDate(''); setEDesc(''); setEImage(''); setELink(''); setEButtonName('');
    fetchAllData();
  };

  const handleEditEducation = (e: any) => {
    setEditingId(e.id); setETitle(e.title); setEDate(e.date);
    setEDesc(e.description || ''); setEImage(e.image || ''); setELink(e.link || ''); setEButtonName(e.buttonName || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Experience CRUD ────────────────────────────────────────────────────────
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { company: exCompany, date: exDate, role: exRole, description: exDesc, image: exImage };
    if (editingId) {
      await updateDoc(doc(db, 'experience', editingId), data);
      setEditingId(null);
    } else {
      await addDoc(collection(db, 'experience'), data);
    }
    setExCompany(''); setExDate(''); setExRole(''); setExDesc(''); setExImage('');
    fetchAllData();
  };

  const handleEditExperience = (ex: any) => {
    setEditingId(ex.id); setExCompany(ex.company); setExDate(ex.date);
    setExRole(ex.role); setExDesc(ex.description); setExImage(ex.image || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, col: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, col, id));
      fetchAllData();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setPTitle(''); setPThumbnail(''); setPGalleryImages([]); setPLink(''); setPButtonLabel(''); setPCategory('filter-app'); setPDesc(''); setPTechStack('');
    setPImages('');
    setETitle(''); setEDate(''); setEDesc(''); setEImage(''); setELink(''); setEButtonName('');
    setExCompany(''); setExDate(''); setExRole(''); setExDesc(''); setExImage('');
  };

  // ─── Styles ─────────────────────────────────────────────────────────────────
  const cardStyle: React.CSSProperties = { background: '#041627', padding: '20px', borderRadius: '8px', border: '1px solid #1a2a3a', marginBottom: '16px' };
  const inputStyle: React.CSSProperties = { background: '#010e1b', border: '1px solid #1a2a3a', color: '#fff', borderRadius: '6px', padding: '8px 12px', width: '100%' };

  // ─── Login Screen ───────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#010e1b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#041627', padding: '40px', borderRadius: '12px', width: '400px', border: '1px solid #12d640' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>Admin Login</h2>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Admin Email" className="form-control mb-3" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="form-control mb-4" style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn w-100" style={{ background: '#12d640', color: '#010e1b', fontWeight: 'bold' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#010e1b', color: '#fff' }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <div style={{ width: '220px', background: '#041627', padding: '20px', borderRight: '1px solid #1a2a3a', flexShrink: 0 }}>
        <h3 style={{ color: '#12d640', marginBottom: '30px', fontSize: '18px', letterSpacing: '1px' }}>TCN ADMIN</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['projects', 'education', 'experience', 'skills', 'messages', 'profile'].map(tab => (
            <li key={tab}>
              <button onClick={() => { setActiveTab(tab); cancelEdit(); }}
                style={{ background: activeTab === tab ? '#12d640' : 'transparent', color: activeTab === tab ? '#010e1b' : '#a0aec0', border: 'none', borderRadius: '6px', padding: '10px 14px', width: '100%', textAlign: 'left', cursor: 'pointer', fontWeight: activeTab === tab ? 700 : 400, textTransform: 'capitalize' }}>
                {tab}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => signOut(auth)} style={{ marginTop: '40px', background: '#c0392b', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px', width: '100%', cursor: 'pointer' }}>Logout</button>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>

        {/* ══ PROJECTS TAB ══════════════════════════════════════════════════════ */}
        {activeTab === 'projects' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Manage Projects</h2>

            {/* ─── Manage Categories ─── */}
            <div style={{ background: '#041627', padding: '20px', borderRadius: '8px', border: '1px solid #1a2a3a', marginBottom: '30px' }}>
              <h4 style={{ color: '#fff', marginBottom: '20px' }}>Manage Project Categories</h4>
              <form onSubmit={handleSaveCategory} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input style={inputStyle} placeholder="New Category Name (e.g. E-Commerce)" value={catName} onChange={e => setCatName(e.target.value)} required />
                <button type="submit" style={{ background: '#12d640', color: '#010e1b', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 700, whiteSpace: 'nowrap' }}>Add Category</button>
              </form>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {projectCategories.map(c => (
                  <div key={c.id} style={{ background: '#010e1b', border: '1px solid #1a2a3a', borderRadius: '20px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#ccc', fontSize: '13px' }}>{c.name}</span>
                    <button type="button" onClick={() => handleDeleteCategory(c.id)} style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: '16px', cursor: 'pointer', padding: 0, lineHeight: 1 }}>&times;</button>
                  </div>
                ))}
              </div>
            </div>
            {/* Form */}
            <div style={{ ...cardStyle, border: editingId ? '2px solid #12d640' : '1px solid #1a2a3a' }}>
              <h4 style={{ color: '#12d640', marginBottom: '16px' }}>{editingId ? '✏️ Update Project' : '➕ Add New Project'}</h4>
              <form onSubmit={handleSaveProject}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Title</label>
                    <input style={inputStyle} placeholder="Project title" value={pTitle} onChange={e => setPTitle(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Category</label>
                    <select style={inputStyle} value={pCategory} onChange={e => setPCategory(e.target.value)}>
                      {projectCategories.map(c => (
                        <option key={c.id} value={c.filter}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* ── Thumbnail Upload ─────────────────────────────────── */}
                  <div className="col-12">
                    <label style={{ color: '#12d640', fontSize: '13px', fontWeight: 600 }}>🖼 Thumbnail <span style={{ color: '#555', fontWeight: 400 }}>(shown on project card)</span></label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '6px' }}>
                      <input
                        type="file" accept="image/*"
                        style={{ display: 'none' }} id="thumb-upload"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploading(true);
                          try { const url = await uploadImage(file); setPThumbnail(url); }
                          catch { alert('Upload failed.'); }
                          finally { setUploading(false); e.target.value = ''; }
                        }}
                      />
                      <label htmlFor="thumb-upload" style={{ background: '#1565c0', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', flexShrink: 0 }}>
                        📁 Upload Thumbnail
                      </label>
                      <input
                        style={{ ...inputStyle, flex: 1 }}
                        placeholder="or paste thumbnail URL"
                        value={pThumbnail}
                        onChange={e => setPThumbnail(e.target.value)}
                      />
                    </div>
                    {pThumbnail && (
                      <img src={pThumbnail} alt="thumb" style={{ height: '80px', marginTop: '8px', borderRadius: '6px', border: '2px solid #1565c0', objectFit: 'cover' }} />
                    )}
                  </div>

                  {/* ── Gallery Images ───────────────────────────────────── */}
                  <div className="col-12">
                    <label style={{ color: '#12d640', fontSize: '13px', fontWeight: 600 }}>🎞 Gallery Images <span style={{ color: '#555', fontWeight: 400 }}>(shown in popup slideshow)</span></label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                      {pGalleryImages.map((img, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ color: '#555', fontSize: '12px', minWidth: '20px' }}>#{idx + 1}</span>
                          <input
                            style={{ ...inputStyle, flex: 1 }}
                            placeholder={`Gallery image ${idx + 1} URL`}
                            value={img}
                            onChange={e => {
                              const updated = [...pGalleryImages];
                              updated[idx] = e.target.value;
                              setPGalleryImages(updated);
                            }}
                          />
                          <input
                            type="file" accept="image/*"
                            style={{ display: 'none' }} id={`gallery-upload-${idx}`}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploading(true);
                              try {
                                const url = await uploadImage(file);
                                const updated = [...pGalleryImages];
                                updated[idx] = url;
                                setPGalleryImages(updated);
                              } catch { alert('Upload failed.'); }
                              finally { setUploading(false); e.target.value = ''; }
                            }}
                          />
                          <label htmlFor={`gallery-upload-${idx}`} style={{ background: '#1a2a3a', color: '#12d640', border: '1px solid #12d640', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}>📁</label>
                          {img && <img src={img} alt="" style={{ height: '40px', width: '56px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #12d640', flexShrink: 0 }} />}
                          <button type="button" onClick={() => setPGalleryImages(pGalleryImages.filter((_, i) => i !== idx))}
                            style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', flexShrink: 0 }}>✕</button>
                        </div>
                      ))}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button"
                          onClick={() => setPGalleryImages([...pGalleryImages, ''])}
                          style={{ background: '#1a2a3a', color: '#12d640', border: '1px dashed #12d640', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px' }}>
                          + Add Empty Box
                        </button>
                        <input type="file" multiple accept="image/*" id="gallery-bulk" style={{ display: 'none' }}
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            if (!files.length) return;
                            setUploading(true);
                            try {
                              const urls = [];
                              for (const f of files) {
                                urls.push(await uploadImage(f));
                              }
                              setPGalleryImages((prev) => [...prev, ...urls]);
                            } catch (err) { alert('Upload failed.'); }
                            finally { setUploading(false); e.target.value = ''; }
                          }}
                        />
                        <label htmlFor="gallery-bulk" style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', margin: 0 }}>
                          📁 Bulk Upload Images
                        </label>
                      </div>
                      {uploading && (
                        <div style={{ height: '6px', background: '#1a2a3a', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${uploadProgress ?? 0}%`, background: '#12d640', transition: 'width 0.3s' }} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Live Demo / Project URL</label>
                    <input style={inputStyle} placeholder="https://..." value={pLink} onChange={e => setPLink(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Button Label <span style={{ color: '#555' }}>(default: "Open Live Demo")</span></label>
                    <input style={inputStyle} placeholder="e.g. View on GitHub, Visit Website" value={pButtonLabel} onChange={e => setPButtonLabel(e.target.value)} />
                  </div>

                  {/* ── Advanced Customization ────────────────────────────── */}
                  <div className="col-12">
                    <label style={{ color: '#12d640', fontSize: '13px', fontWeight: 600 }}>🛠 Tech Stack</label>
                    <input style={inputStyle} placeholder="e.g. React, Node.js, Firebase..." value={pTechStack} onChange={e => setPTechStack(e.target.value)} />
                  </div>

                  <div className="col-12">
                    <label style={{ color: '#12d640', fontSize: '13px', fontWeight: 600 }}>📝 Project Description <span style={{ color: '#555', fontWeight: 400 }}>(HTML is supported!)</span></label>
                    <textarea 
                      style={{ ...inputStyle, minHeight: '120px', fontFamily: 'monospace', fontSize: '13px' }} 
                      placeholder="Describe your project here... You can use HTML tags like <ul>, <li>, <b>, <br> for advanced styling." 
                      value={pDesc} 
                      onChange={e => setPDesc(e.target.value)} 
                    />
                  </div>

                  <div className="col-12" style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={uploading} style={{ background: '#12d640', color: '#010e1b', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
                      {editingId ? 'Update Project' : 'Save Project'}
                    </button>
                    {editingId && (
                      <button type="button" onClick={cancelEdit} style={{ background: '#1a2a3a', color: '#aaa', border: 'none', borderRadius: '6px', padding: '10px 16px', cursor: 'pointer' }}>Cancel</button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Project cards */}
            {loading ? <p>Loading...</p> : (
              <div className="row">
                {projects.map(p => {
                  const imgs = p.images || (p.image ? [p.image] : []);
                  return (
                    <div key={p.id} className="col-lg-4 col-md-6 mb-3">
                      <div style={cardStyle}>
                        <img src={imgs[0] || ''} alt={p.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />
                        <h5 style={{ color: '#12d640', fontSize: '14px', marginBottom: '4px' }}>{p.title}</h5>
                        <p style={{ color: '#aaa', fontSize: '12px', margin: 0 }}>{(p.category || '').replace('filter-', '')} · {imgs.length} image(s)</p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <button onClick={() => handleEditProject(p)} style={{ flex: 1, background: '#1565c0', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                          <button onClick={() => handleDelete(p.id, 'projects')} style={{ flex: 1, background: '#c0392b', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ EDUCATION TAB ═════════════════════════════════════════════════════ */}
        {activeTab === 'education' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Manage Education</h2>
            <div style={{ ...cardStyle, border: editingId ? '2px solid #12d640' : '1px solid #1a2a3a' }}>
              <h4 style={{ color: '#12d640', marginBottom: '16px' }}>{editingId ? '✏️ Update' : '➕ Add'} Education</h4>
              <form onSubmit={handleSaveEducation}>
                <div className="row g-3">
                  <div className="col-md-6"><label style={{ color: '#aaa', fontSize: '13px' }}>Course / Degree</label><input style={inputStyle} placeholder="e.g. BSc in IT" value={eTitle} onChange={e => setETitle(e.target.value)} required /></div>
                  <div className="col-md-6"><label style={{ color: '#aaa', fontSize: '13px' }}>Date</label><input style={inputStyle} placeholder="e.g. Oct 2021 - Present" value={eDate} onChange={e => setEDate(e.target.value)} required /></div>
                  <div className="col-12"><label style={{ color: '#aaa', fontSize: '13px' }}>Description</label><textarea style={{ ...inputStyle, height: '80px' }} value={eDesc} onChange={e => setEDesc(e.target.value)} /></div>
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Logo/Image Upload</label>
                    <input type="file" style={inputStyle} accept="image/*" onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          const url = await uploadImage(e.target.files[0], 'education');
                          setEImage(url);
                        } catch (err) {
                          alert('Image processing failed.');
                        }
                      }
                    }} />
                    {eImage && <img src={eImage} alt="preview" style={{ marginTop: '8px', height: '40px', objectFit: 'contain' }} />}
                  </div>
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Logo/Image URL (or Paste)</label>
                    <input style={inputStyle} placeholder="https://..." value={eImage} onChange={e => setEImage(e.target.value)} />
                  </div>
                  <div className="col-md-6"><label style={{ color: '#aaa', fontSize: '13px' }}>Certificate Link</label><input style={inputStyle} placeholder="https://..." value={eLink} onChange={e => setELink(e.target.value)} /></div>
                  <div className="col-md-6"><label style={{ color: '#aaa', fontSize: '13px' }}>Button Name</label><input style={inputStyle} placeholder="Check out the Certificate" value={eButtonName} onChange={e => setEButtonName(e.target.value)} /></div>
                  <div className="col-12" style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ background: '#12d640', color: '#010e1b', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>{editingId ? 'Update' : 'Save'}</button>
                    {editingId && <button type="button" onClick={cancelEdit} style={{ background: '#1a2a3a', color: '#aaa', border: 'none', borderRadius: '6px', padding: '10px 16px', cursor: 'pointer' }}>Cancel</button>}
                  </div>
                </div>
              </form>
            </div>
            <div className="row">
              {education.map(e => (
                <div key={e.id} className="col-md-6 mb-3">
                  <div style={cardStyle}>
                    {e.image && <img src={e.image} alt="logo" style={{ height: '50px', objectFit: 'contain', marginBottom: '8px' }} />}
                    <h5 style={{ color: '#12d640', fontSize: '14px' }}>{e.title}</h5>
                    <p style={{ color: '#aaa', fontSize: '12px' }}>{e.date}</p>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <button onClick={() => handleEditEducation(e)} style={{ flex: 1, background: '#1565c0', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                      <button onClick={() => handleDelete(e.id, 'education')} style={{ flex: 1, background: '#c0392b', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ EXPERIENCE TAB ════════════════════════════════════════════════════ */}
        {activeTab === 'experience' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Manage Experience</h2>
            <div style={{ ...cardStyle, border: editingId ? '2px solid #12d640' : '1px solid #1a2a3a' }}>
              <h4 style={{ color: '#12d640', marginBottom: '16px' }}>{editingId ? '✏️ Update' : '➕ Add'} Experience</h4>
              <form onSubmit={handleSaveExperience}>
                <div className="row g-3">
                  <div className="col-md-6"><label style={{ color: '#aaa', fontSize: '13px' }}>Company</label><input style={inputStyle} value={exCompany} onChange={e => setExCompany(e.target.value)} required /></div>
                  <div className="col-md-6"><label style={{ color: '#aaa', fontSize: '13px' }}>Date</label><input style={inputStyle} placeholder="July 2025 - Present" value={exDate} onChange={e => setExDate(e.target.value)} required /></div>
                  <div className="col-12"><label style={{ color: '#aaa', fontSize: '13px' }}>Role</label><input style={inputStyle} value={exRole} onChange={e => setExRole(e.target.value)} required /></div>
                  <div className="col-12"><label style={{ color: '#aaa', fontSize: '13px' }}>Description (one bullet per line)</label><textarea style={{ ...inputStyle, height: '100px' }} value={exDesc} onChange={e => setExDesc(e.target.value)} /></div>
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Company Logo Upload</label>
                    <input type="file" style={inputStyle} accept="image/*" onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          const url = await uploadImage(e.target.files[0], 'experience');
                          setExImage(url);
                        } catch (err) {
                          alert('Image processing failed.');
                        }
                      }
                    }} />
                    {exImage && <img src={exImage} alt="preview" style={{ marginTop: '8px', height: '40px', objectFit: 'contain' }} />}
                  </div>
                  <div className="col-md-6">
                    <label style={{ color: '#aaa', fontSize: '13px' }}>Company Logo URL (or Paste)</label>
                    <input style={inputStyle} placeholder="https://..." value={exImage} onChange={e => setExImage(e.target.value)} />
                  </div>
                  <div className="col-12" style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ background: '#12d640', color: '#010e1b', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>{editingId ? 'Update' : 'Save'}</button>
                    {editingId && <button type="button" onClick={cancelEdit} style={{ background: '#1a2a3a', color: '#aaa', border: 'none', borderRadius: '6px', padding: '10px 16px', cursor: 'pointer' }}>Cancel</button>}
                  </div>
                </div>
              </form>
            </div>
            <div>
              {experience.map(ex => (
                <div key={ex.id} style={{ ...cardStyle }}>
                  {ex.image && <img src={ex.image} alt="logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '8px' }} />}
                  <h5 style={{ color: '#12d640' }}>{ex.company} <small style={{ color: '#ccc', fontWeight: 400 }}>— {ex.role}</small></h5>
                  <p style={{ color: '#aaa', fontSize: '13px' }}>{ex.date}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button onClick={() => handleEditExperience(ex)} style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 20px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                    <button onClick={() => handleDelete(ex.id, 'experience')} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: '6px', padding: '7px 20px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ SKILLS TAB ════════════════════════════════════════════════════════ */}
        {activeTab === 'skills' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Manage Skills</h2>
            <div>
              {skills.map(s => (
                <div key={s.id} style={cardStyle}>
                  <h5 style={{ color: '#12d640' }}>{s.category}</h5>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '10px 0' }}>
                    {s.images && s.images.map((img: string, i: number) => (
                      <img key={i} src={img} alt="skill" style={{ height: '36px', objectFit: 'contain' }} />
                    ))}
                  </div>
                  <button onClick={() => handleDelete(s.id, 'skills')} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 16px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MESSAGES TAB ══════════════════════════════════════════════════════ */}
        {activeTab === 'messages' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Contact Messages</h2>
            <p style={{ color: '#aaa' }}>Messages sent from the Contact form will appear here.</p>
          </div>
        )}

        {/* ══ PROFILE TAB ═══════════════════════════════════════════════════════ */}
        {activeTab === 'profile' && (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Profile / DP Image</h2>
            <div style={{ ...cardStyle, border: '1px solid #1a2a3a', maxWidth: '560px' }}>
              <h4 style={{ color: '#12d640', marginBottom: '20px' }}>🖼 Update Display Picture</h4>

              {/* Current Image Preview */}
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '10px' }}>Current DP</p>
                {dpImageUrl ? (
                  <img
                    src={dpImageUrl}
                    alt="Profile"
                    style={{
                      width: '180px', height: '180px', objectFit: 'cover',
                      borderRadius: '50%', border: '3px solid #12d640',
                      display: 'block', margin: '0 auto'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '180px', height: '180px', borderRadius: '50%',
                    border: '2px dashed #1a2a3a', background: '#010e1b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto', color: '#555', fontSize: '13px'
                  }}>
                    No image set
                  </div>
                )}
              </div>

              {/* Upload Button — Firestore Base64 (no Firebase Storage needed) */}
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="file"
                  accept="image/*"
                  id="dp-upload"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setDpUploading(true);
                    setDpError('');
                    setDpSaveStatus('idle');
                    try {
                      // Compress image using canvas (max 350×350, JPEG 0.75)
                      const base64 = await new Promise<string>((resolve, reject) => {
                        const img = new Image();
                        const reader = new FileReader();
                        reader.onload = (ev) => { img.src = ev.target?.result as string; };
                        reader.onerror = reject;
                        img.onload = () => {
                          const MAX = 800; // high res
                          let { width, height } = img;
                          if (width > MAX || height > MAX) {
                            if (width > height) { height = Math.round((height / width) * MAX); width = MAX; }
                            else { width = Math.round((width / height) * MAX); height = MAX; }
                          }
                          const canvas = document.createElement('canvas');
                          canvas.width = width; canvas.height = height;
                          const ctx = canvas.getContext('2d')!;
                          const isPng = file.type === 'image/png';
                          if (!isPng) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height); }
                          ctx.drawImage(img, 0, 0, width, height);
                          resolve(isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.95));
                        };
                        img.onerror = reject;
                        reader.readAsDataURL(file);
                      });
                      // Save directly to Firestore
                      await setDoc(doc(db, 'settings', 'profile'), { imageBase64: base64 }, { merge: true });
                      setDpImageUrl(base64);
                      setDpSaveStatus('saved');
                      setTimeout(() => setDpSaveStatus('idle'), 3000);
                    } catch (err: any) {
                      setDpError(`❌ Failed to process image: ${err?.message || 'Unknown error'}`);
                    } finally {
                      setDpUploading(false);
                      e.target.value = '';
                    }
                  }}
                />

                <label
                  htmlFor={dpUploading ? '' : 'dp-upload'}
                  style={{
                    display: 'block',
                    background: dpUploading ? '#2a3a4a' : '#12d640',
                    color: dpUploading ? '#888' : '#010e1b',
                    padding: '14px', borderRadius: '8px',
                    cursor: dpUploading ? 'not-allowed' : 'pointer',
                    textAlign: 'center', fontWeight: 700, fontSize: '15px',
                  }}
                >
                  {dpUploading ? '⏳ Compressing & Saving...' : '📁 Choose Image & Save as DP'}
                </label>

                <p style={{ color: '#555', fontSize: '12px', marginTop: '6px', textAlign: 'center' }}>
                  Image will be compressed and saved directly to Firestore (no Storage needed)
                </p>

                {/* Error display */}
                {dpError && (
                  <div style={{
                    marginTop: '10px', padding: '12px 14px', background: '#1a0808',
                    border: '1px solid #c0392b', borderRadius: '8px',
                    color: '#ff8a80', fontSize: '13px', lineHeight: 1.6,
                  }}>
                    {dpError}
                  </div>
                )}
              </div>

              {/* Paste URL */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Or paste image URL directly</label>
                <input
                  style={inputStyle}
                  placeholder="https://..."
                  value={dpImageUrl}
                  onChange={e => { setDpImageUrl(e.target.value); setDpSaveStatus('idle'); }}
                />
              </div>

              {/* Save to Firestore */}
              <button
                disabled={dpUploading || !dpImageUrl}
                onClick={async () => {
                  setDpSaveStatus('saving');
                  try {
                    await setDoc(doc(db, 'settings', 'profile'), { imageUrl: dpImageUrl }, { merge: true });
                    setDpSaveStatus('saved');
                    setTimeout(() => setDpSaveStatus('idle'), 3000);
                  } catch {
                    setDpSaveStatus('error');
                  }
                }}
                style={{
                  width: '100%', padding: '12px', fontWeight: 700, fontSize: '14px',
                  borderRadius: '8px', border: 'none', cursor: dpImageUrl ? 'pointer' : 'not-allowed',
                  background: dpSaveStatus === 'saved' ? '#27ae60' : dpSaveStatus === 'error' ? '#c0392b' : '#12d640',
                  color: '#010e1b'
                }}
              >
                {dpSaveStatus === 'saving' ? '⏳ Saving...' : dpSaveStatus === 'saved' ? '✅ Saved!' : dpSaveStatus === 'error' ? '❌ Error – Try again' : '💾 Save DP to Site'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
