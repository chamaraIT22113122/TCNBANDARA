const fs = require('fs');
let path = 'client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find the start: "{/* Dynamic React Portfolio Section */}"
// Find the end: "export default Home;"
const startMarker = '      {/* Dynamic React Portfolio Section */}';
const endMarker = 'export default Home;';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.log('Markers not found!', startIdx, endIdx);
  process.exit(1);
}

const before = content.substring(0, startIdx);
const after = endMarker + '\n';

const newSection = `      {/* Dynamic React Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                {[
                  { label: 'All', val: '*' },
                  { label: 'Web-App', val: '.filter-app' },
                  { label: 'Mobile', val: '.filter-mobile' },
                  { label: 'UX/UI', val: '.filter-ux' },
                  { label: 'Graphic Design', val: '.filter-graphic' },
                  { label: 'Other', val: '.filter-other' },
                ].map(f => (
                  <li key={f.val} onClick={() => setActiveFilter(f.val)}
                    className={activeFilter === f.val ? 'filter-active' : ''}
                    style={{ cursor: 'pointer' }}>{f.label}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {loading ? (
              <div className="col-12 text-center"><p style={{ color: '#fff' }}>Loading Projects...</p></div>
            ) : projects
                .filter(p => activeFilter === '*' || p.category === activeFilter.replace('.', ''))
                .map(p => {
                  const imgs = p.images?.length ? p.images : (p.image ? [p.image] : []);
                  const thumb = imgs[0] || '';
                  return (
                    <div key={p.id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        onClick={() => openProject({ ...p, images: imgs })}
                        style={{
                          borderRadius: '12px', overflow: 'hidden', position: 'relative',
                          cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                          background: '#041627',
                        }}
                        onMouseEnter={e => { const ov = e.currentTarget.querySelector('.card-overlay') as HTMLElement; if(ov) ov.style.opacity = '1'; }}
                        onMouseLeave={e => { const ov = e.currentTarget.querySelector('.card-overlay') as HTMLElement; if(ov) ov.style.opacity = '0'; }}
                      >
                        <img src={thumb} alt={p.title}
                          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                        <div className="card-overlay" style={{
                          position: 'absolute', inset: 0, background: 'rgba(4,22,39,0.88)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          opacity: 0, transition: 'opacity 0.3s ease',
                        }}>
                          <p style={{ margin: 0, color: '#12d640', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            {(p.category || '').replace('filter-', '')}
                          </p>
                          <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, margin: '8px 0 14px', textAlign: 'center', padding: '0 16px' }}>{p.title}</h4>
                          <div style={{ border: '1px solid #12d640', color: '#12d640', borderRadius: '20px', padding: '6px 20px', fontSize: '13px', fontWeight: 600 }}>
                            View Project →
                          </div>
                        </div>
                        <div style={{ padding: '10px 14px', background: '#041627' }}>
                          <p style={{ margin: 0, color: '#ccc', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: rawHtmlBottom }} />

      {/* Project Detail Popup */}
      {selectedProject && (
        <div
          onClick={closeProject}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#041627', borderRadius: '16px', width: '100%', maxWidth: '960px',
              maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              border: '1px solid #1a2a3a', boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #1a2a3a', flexShrink: 0 }}>
              <div>
                <p style={{ margin: 0, color: '#12d640', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  {(selectedProject.category || '').replace('filter-', '')}
                </p>
                <h3 style={{ margin: '4px 0 0', color: '#fff', fontSize: '20px', fontWeight: 700 }}>{selectedProject.title}</h3>
              </div>
              <button onClick={closeProject} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '28px', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', overflow: 'hidden', flex: 1, minHeight: 0 }}>

              {/* Left Gallery */}
              <div style={{ width: '55%', flexShrink: 0, background: '#010e1b', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
                  <img
                    src={selectedProject.images[galleryIndex]}
                    alt={selectedProject.title + ' ' + (galleryIndex + 1)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button onClick={prevImg} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid #12d640', color: '#12d640', borderRadius: '50%', width: '38px', height: '38px', fontSize: '18px', cursor: 'pointer' }}>&#8592;</button>
                      <button onClick={nextImg} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid #12d640', color: '#12d640', borderRadius: '50%', width: '38px', height: '38px', fontSize: '18px', cursor: 'pointer' }}>&#8594;</button>
                    </>
                  )}
                  <div style={{ position: 'absolute', bottom: '10px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#12d640', fontSize: '12px', padding: '4px 10px', borderRadius: '12px' }}>
                    {galleryIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>
                {selectedProject.images.length > 1 && (
                  <div style={{ display: 'flex', gap: '4px', padding: '8px', background: '#010e1b', overflowX: 'auto', flexShrink: 0 }}>
                    {selectedProject.images.map((img, i) => (
                      <img key={i} src={img} alt={'thumb-' + i} onClick={() => setGalleryIndex(i)}
                        style={{ height: '56px', width: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: i === galleryIndex ? '2px solid #12d640' : '2px solid transparent', flexShrink: 0 }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Info */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedProject.description ? (
                  <div>
                    <h6 style={{ color: '#12d640', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>About</h6>
                    <p style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>{selectedProject.description}</p>
                  </div>
                ) : (
                  <p style={{ color: '#555', fontSize: '13px', fontStyle: 'italic' }}>No description yet. Add one from the Admin panel.</p>
                )}

                {selectedProject.techStack && (
                  <div>
                    <h6 style={{ color: '#12d640', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Tech Stack</h6>
                    <p style={{ color: '#ccc', fontSize: '14px', margin: 0 }}>{selectedProject.techStack}</p>
                  </div>
                )}

                {selectedProject.link && selectedProject.category === 'filter-app' && (
                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1a2a3a' }}>
                    <h6 style={{ color: '#12d640', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Live Demo</h6>
                    <a href={selectedProject.link} target="_blank" rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#12d640', color: '#010e1b', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                      <i className="bx bx-link-external"></i> Open Live Demo
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </ParticlesProvider>
  );
}

`;

const newContent = before + newSection + after;
fs.writeFileSync(path, newContent);
console.log('Portfolio section replaced! Lines:', newContent.split('\n').length);
