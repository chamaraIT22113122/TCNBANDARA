const fs = require('fs');
const path = '../client/src/pages/Admin.tsx';

const adminContent = `import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { oldProjects } from '../data/oldProjects';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Project Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('filter-app');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects();
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError('');
    } catch (err: any) {
      setLoginError("Invalid credentials or Authentication not enabled.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMigrate = async () => {
    if (window.confirm("Migrate 14 hardcoded projects to Firestore?")) {
      for (const p of oldProjects) {
        await addDoc(collection(db, "projects"), p);
      }
      alert("Migration successful!");
      fetchProjects();
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "projects"), { title, category, image, link });
    setTitle(''); setImage(''); setLink('');
    fetchProjects();
  };

  const handleDelete = async (id: string, col: string) => {
    if (window.confirm("Delete this item?")) {
      await deleteDoc(doc(db, col, id));
      if (col === 'projects') fetchProjects();
    }
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#010e1b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#041627', padding: '40px', borderRadius: '12px', width: '400px', border: '1px solid #12d640' }}>
          <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '30px' }}>Admin Login</h2>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Admin Email" className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="form-control mb-4" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn btn-success w-100" style={{ background: '#12d640', border: 'none', color: '#010e1b', fontWeight: 'bold' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#010e1b', color: '#fff' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#041627', padding: '20px', borderRight: '1px solid #333' }}>
        <h3 style={{ color: '#12d640', marginBottom: '30px', fontSize: '20px' }}>TCN ADMIN</h3>
        <ul className="nav flex-column gap-2">
          {['profile', 'education', 'experience', 'skills', 'projects', 'messages'].map(tab => (
            <li className="nav-item" key={tab}>
              <button 
                onClick={() => setActiveTab(tab)}
                className={\`nav-link w-100 text-start \${activeTab === tab ? 'active' : ''}\`}
                style={{ background: activeTab === tab ? '#12d640' : 'transparent', color: activeTab === tab ? '#010e1b' : '#a0aec0', border: 'none', borderRadius: '5px' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className="btn btn-danger w-100 mt-5">Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div>
            <h2>Manage Projects</h2>
            <hr style={{ borderColor: '#333' }} />
            
            {projects.length === 0 && (
              <div className="alert alert-warning">
                <p>Database is empty. Migrate your legacy projects to get started.</p>
                <button onClick={handleMigrate} className="btn btn-primary">Migrate 14 Projects</button>
              </div>
            )}

            <div style={{ background: '#041627', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
              <h4>Add New Project</h4>
              <form onSubmit={handleAddProject} className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="filter-app">Web-App</option>
                    <option value="filter-mobile">Mobile Application</option>
                    <option value="filter-ux">UX/UI Design</option>
                    <option value="filter-graphic">Graphic Design</option>
                    <option value="filter-other">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input className="form-control" placeholder="Image URL (e.g. assets/img/project/mo.jpg)" value={image} onChange={e => setImage(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <input className="form-control" placeholder="Project Link (e.g. projects/slc.html)" value={link} onChange={e => setLink(e.target.value)} required />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success">Save Project</button>
                </div>
              </form>
            </div>

            <div className="row">
              {projects.map(p => (
                <div key={p.id} className="col-md-4 mb-3">
                  <div style={{ background: '#041627', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                    <h5 style={{ color: '#12d640' }}>{p.title}</h5>
                    <p style={{ fontSize: '12px', color: '#a0aec0' }}>{p.category}</p>
                    <button onClick={() => handleDelete(p.id, 'projects')} className="btn btn-danger btn-sm w-100">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER TABS (Placeholders for now) */}
        {activeTab !== 'projects' && (
          <div>
            <h2>Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <hr style={{ borderColor: '#333' }} />
            <div className="alert alert-info">
              The {activeTab} editor is being generated by the AI...
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
`;

fs.writeFileSync(path, adminContent);
console.log("Full Admin CMS structure written!");
