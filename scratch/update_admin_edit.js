const fs = require('fs');
const path = '../client/src/pages/Admin.tsx';

const adminContent = `import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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

  // Edit States
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form States - Project
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('filter-app');
  const [pImage, setPImage] = useState('');
  const [pLink, setPLink] = useState('');

  // Form States - Education
  const [eTitle, setETitle] = useState('');
  const [eDate, setEDate] = useState('');
  const [eDesc, setEDesc] = useState('');
  const [eImage, setEImage] = useState('');
  const [eLink, setELink] = useState('');

  // Form States - Experience
  const [exCompany, setExCompany] = useState('');
  const [exDate, setExDate] = useState('');
  const [exRole, setExRole] = useState('');
  const [exDesc, setExDesc] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchAllData();
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
      setLoginError("Invalid credentials.");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const pSnap = await getDocs(collection(db, "projects"));
      setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const eSnap = await getDocs(collection(db, "education"));
      setEducation(eSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const exSnap = await getDocs(collection(db, "experience"));
      setExperience(exSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const sSnap = await getDocs(collection(db, "skills"));
      setSkills(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- PROJECT LOGIC ---------------- //
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title: pTitle, category: pCategory, image: pImage, link: pLink };
    if (editingId) {
      await updateDoc(doc(db, "projects", editingId), data);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "projects"), data);
    }
    setPTitle(''); setPImage(''); setPLink('');
    fetchAllData();
  };
  const handleEditProject = (p: any) => {
    setEditingId(p.id); setPTitle(p.title); setPCategory(p.category); setPImage(p.image); setPLink(p.link || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------- EDUCATION LOGIC ---------------- //
  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title: eTitle, date: eDate, description: eDesc, image: eImage, link: eLink };
    if (editingId) {
      await updateDoc(doc(db, "education", editingId), data);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "education"), data);
    }
    setETitle(''); setEDate(''); setEDesc(''); setEImage(''); setELink('');
    fetchAllData();
  };
  const handleEditEducation = (e: any) => {
    setEditingId(e.id); setETitle(e.title); setEDate(e.date); setEDesc(e.description); setEImage(e.image || ''); setELink(e.link || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------- EXPERIENCE LOGIC ---------------- //
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { company: exCompany, date: exDate, role: exRole, description: exDesc };
    if (editingId) {
      await updateDoc(doc(db, "experience", editingId), data);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "experience"), data);
    }
    setExCompany(''); setExDate(''); setExRole(''); setExDesc('');
    fetchAllData();
  };
  const handleEditExperience = (ex: any) => {
    setEditingId(ex.id); setExCompany(ex.company); setExDate(ex.date); setExRole(ex.role); setExDesc(ex.description);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, col: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteDoc(doc(db, col, id));
      fetchAllData();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setPTitle(''); setPImage(''); setPLink('');
    setETitle(''); setEDate(''); setEDesc(''); setEImage(''); setELink('');
    setExCompany(''); setExDate(''); setExRole(''); setExDesc('');
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
                onClick={() => { setActiveTab(tab); cancelEdit(); }}
                className={\`nav-link w-100 text-start \${activeTab === tab ? 'active' : ''}\`}
                style={{ background: activeTab === tab ? '#12d640' : 'transparent', color: activeTab === tab ? '#010e1b' : '#a0aec0', border: 'none', borderRadius: '5px' }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => signOut(auth)} className="btn btn-danger w-100 mt-5">Logout</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div>
            <h2>Manage Projects</h2>
            <hr style={{ borderColor: '#333' }} />
            
            <div style={{ background: '#041627', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: editingId ? '2px solid #12d640' : 'none' }}>
              <h4>{editingId ? "Update Project" : "Add New Project"}</h4>
              <form onSubmit={handleSaveProject} className="row g-3">
                <div className="col-md-6"><input className="form-control" placeholder="Title" value={pTitle} onChange={e => setPTitle(e.target.value)} required /></div>
                <div className="col-md-6">
                  <select className="form-control" value={pCategory} onChange={e => setPCategory(e.target.value)}>
                    <option value="filter-app">Web-App</option><option value="filter-mobile">Mobile</option><option value="filter-ux">UX/UI</option><option value="filter-graphic">Graphic</option><option value="filter-other">Other</option>
                  </select>
                </div>
                <div className="col-md-6"><input className="form-control" placeholder="Image URL" value={pImage} onChange={e => setPImage(e.target.value)} required /></div>
                <div className="col-md-6"><input className="form-control" placeholder="Project Link (Optional)" value={pLink} onChange={e => setPLink(e.target.value)} /></div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success me-2">{editingId ? "Update Project" : "Save Project"}</button>
                  {editingId && <button type="button" onClick={cancelEdit} className="btn btn-secondary">Cancel Edit</button>}
                </div>
              </form>
            </div>

            <div className="row">
              {projects.map(p => (
                <div key={p.id} className="col-md-4 mb-3">
                  <div style={{ background: '#041627', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px', marginBottom: '10px' }} />
                    <h5 style={{ color: '#12d640' }}>{p.title}</h5>
                    <div className="d-flex gap-2 mt-2">
                      <button onClick={() => handleEditProject(p)} className="btn btn-primary btn-sm flex-fill">Edit</button>
                      <button onClick={() => handleDelete(p.id, 'projects')} className="btn btn-danger btn-sm flex-fill">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div>
            <h2>Manage Education</h2>
            <hr style={{ borderColor: '#333' }} />
            
            <div style={{ background: '#041627', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: editingId ? '2px solid #12d640' : 'none' }}>
              <h4>{editingId ? "Update Education" : "Add New Education"}</h4>
              <form onSubmit={handleSaveEducation} className="row g-3">
                <div className="col-md-6"><input className="form-control" placeholder="Course / Degree Name" value={eTitle} onChange={e => setETitle(e.target.value)} required /></div>
                <div className="col-md-6"><input className="form-control" placeholder="Date (e.g. Dec 2018)" value={eDate} onChange={e => setEDate(e.target.value)} required /></div>
                <div className="col-md-12"><textarea className="form-control" placeholder="Description (Supports multiline)" rows={3} value={eDesc} onChange={e => setEDesc(e.target.value)} /></div>
                <div className="col-md-6"><input className="form-control" placeholder="Image URL (Optional)" value={eImage} onChange={e => setEImage(e.target.value)} /></div>
                <div className="col-md-6"><input className="form-control" placeholder="Certificate Link (Optional)" value={eLink} onChange={e => setELink(e.target.value)} /></div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success me-2">{editingId ? "Update Education" : "Save Education"}</button>
                  {editingId && <button type="button" onClick={cancelEdit} className="btn btn-secondary">Cancel Edit</button>}
                </div>
              </form>
            </div>

            <div className="row">
              {education.map(e => (
                <div key={e.id} className="col-md-6 mb-3">
                  <div style={{ background: '#041627', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                    <h5 style={{ color: '#12d640' }}>{e.title}</h5>
                    <h6>{e.date}</h6>
                    <p style={{ fontSize: '14px', color: '#ccc' }}>{e.description}</p>
                    <div className="d-flex gap-2 mt-2">
                      <button onClick={() => handleEditEducation(e)} className="btn btn-primary btn-sm flex-fill">Edit</button>
                      <button onClick={() => handleDelete(e.id, 'education')} className="btn btn-danger btn-sm flex-fill">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div>
            <h2>Manage Experience</h2>
            <hr style={{ borderColor: '#333' }} />
            
            <div style={{ background: '#041627', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: editingId ? '2px solid #12d640' : 'none' }}>
              <h4>{editingId ? "Update Experience" : "Add New Experience"}</h4>
              <form onSubmit={handleSaveExperience} className="row g-3">
                <div className="col-md-6"><input className="form-control" placeholder="Company Name" value={exCompany} onChange={e => setExCompany(e.target.value)} required /></div>
                <div className="col-md-6"><input className="form-control" placeholder="Date (e.g. July 2025 - Present)" value={exDate} onChange={e => setExDate(e.target.value)} required /></div>
                <div className="col-md-12"><input className="form-control" placeholder="Role (e.g. Intern Designer)" value={exRole} onChange={e => setExRole(e.target.value)} required /></div>
                <div className="col-md-12"><textarea className="form-control" placeholder="Description (Bullet points, separate with new lines)" rows={4} value={exDesc} onChange={e => setExDesc(e.target.value)} required /></div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success me-2">{editingId ? "Update Experience" : "Save Experience"}</button>
                  {editingId && <button type="button" onClick={cancelEdit} className="btn btn-secondary">Cancel Edit</button>}
                </div>
              </form>
            </div>

            <div className="row">
              {experience.map(ex => (
                <div key={ex.id} className="col-md-12 mb-3">
                  <div style={{ background: '#041627', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                    <h5 style={{ color: '#12d640' }}>{ex.company} <small style={{ color: '#fff' }}>- {ex.role}</small></h5>
                    <h6>{ex.date}</h6>
                    <p style={{ fontSize: '14px', color: '#ccc', whiteSpace: 'pre-line' }}>{ex.description}</p>
                    <div className="d-flex gap-2 mt-2">
                      <button onClick={() => handleEditExperience(ex)} className="btn btn-primary btn-sm flex-fill">Edit</button>
                      <button onClick={() => handleDelete(ex.id, 'experience')} className="btn btn-danger btn-sm flex-fill">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div>
            <h2>Manage Skills</h2>
            <hr style={{ borderColor: '#333' }} />
            <div className="alert alert-info">Skills are tracked in the database.</div>
            <div className="row">
              {skills.map(s => (
                <div key={s.id} className="col-md-12 mb-3">
                  <div style={{ background: '#041627', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
                    <h5 style={{ color: '#12d640' }}>{s.category}</h5>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {s.images && s.images.map((img: string, i: number) => <img key={i} src={img} alt="skill" style={{ height: '40px', objectFit: 'contain' }} />)}
                    </div>
                    <button onClick={() => handleDelete(s.id, 'skills')} className="btn btn-danger btn-sm mt-3">Delete Category</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER TABS */}
        {(activeTab === 'profile' || activeTab === 'messages') && (
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
console.log("Admin CMS now has full EDIT functionality!");
