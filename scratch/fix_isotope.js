const fs = require('fs');
let path = 'client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add filter state
content = content.replace(
  "const [loading, setLoading] = useState(true);",
  "const [loading, setLoading] = useState(true);\\n  const [activeFilter, setActiveFilter] = useState('*');"
);

// 2. Remove the Isotope initialization in useEffect
content = content.replace(/ \/\/ Re-initialize Isotope and Venobox[\s\S]*?\}, \[loading, projects\]\);/, "");

// 3. Replace the ENTIRE Portfolio section with the new React-driven one
const oldPortfolioRegex = /\{\/\* Dynamic React Portfolio Section \*\/\}[\s\S]*?<\/section>/;

const newPortfolio = `{/* Dynamic React Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li onClick={() => setActiveFilter('*')} className={activeFilter === '*' ? 'filter-active' : ''} style={{cursor: 'pointer'}}>All</li>
                <li onClick={() => setActiveFilter('.filter-app')} className={activeFilter === '.filter-app' ? 'filter-active' : ''} style={{cursor: 'pointer'}}>Web-App</li>
                <li onClick={() => setActiveFilter('.filter-mobile')} className={activeFilter === '.filter-mobile' ? 'filter-active' : ''} style={{cursor: 'pointer'}}>Mobile Application</li>
                <li onClick={() => setActiveFilter('.filter-ux')} className={activeFilter === '.filter-ux' ? 'filter-active' : ''} style={{cursor: 'pointer'}}>UX/UI Design</li>
                <li onClick={() => setActiveFilter('.filter-graphic')} className={activeFilter === '.filter-graphic' ? 'filter-active' : ''} style={{cursor: 'pointer'}}>Graphic Design</li>
                <li onClick={() => setActiveFilter('.filter-other')} className={activeFilter === '.filter-other' ? 'filter-active' : ''} style={{cursor: 'pointer'}}>Other</li>
              </ul>
            </div>
          </div>
          <div className="row" style={{display: 'flex', flexWrap: 'wrap'}}>
            {loading ? (
              <div className="col-12 text-center"><p style={{color: '#fff'}}>Loading Projects from Database...</p></div>
            ) : projects.filter(p => activeFilter === '*' || p.category === activeFilter.replace('.', '')).map(p => {
              const imageArray = p.images ? p.images : (p.image ? [p.image] : []);
              const mainImage = imageArray.length > 0 ? imageArray[0] : '';
              const extraImages = imageArray.slice(1);
              
              return (
                <div key={p.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="portfolio-wrap" style={{background: '#041627', borderRadius: '10px', overflow: 'hidden', position: 'relative'}}>
                    <img src={mainImage} className="img-fluid" alt={p.title} style={{width: '100%', height: '250px', objectFit: 'cover'}} />
                    <div className="portfolio-info" style={{position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(4, 22, 39, 0.9)', padding: '15px', transform: 'translateY(100%)', transition: 'all 0.3s ease-in-out'}}>
                      <h4 style={{color: '#fff', fontSize: '18px', fontWeight: 600}}>{p.title}</h4>
                      <p style={{color: '#12d640', fontSize: '14px'}}>{p.category.replace('filter-', '').toUpperCase()}</p>
                      <div className="portfolio-links d-flex gap-2 mt-2">
                        <a href={mainImage} data-gallery={\`portfolioGallery-\${p.id}\`} className="portfolio-lightbox btn btn-outline-success btn-sm" title={p.title} style={{borderColor: '#12d640', color: '#12d640'}}><i className="bx bx-images"></i> View</a>
                        {p.link && <a href={p.link} title="Live Demo" target="_blank" rel="noreferrer" className="btn btn-success btn-sm" style={{background: '#12d640', color: '#010e1b'}}><i className="bx bx-link-external"></i> Demo</a>}
                      </div>
                    </div>
                  </div>
                  {/* Hidden extra images for the lightbox gallery */}
                  <div style={{ display: 'none' }}>
                    {extraImages.map((img, i) => (
                      <a key={i} href={img} data-gallery={\`portfolioGallery-\${p.id}\`} className="portfolio-lightbox" title={\`\${p.title} - Image \${i+2}\`}>hidden</a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>`;

content = content.replace(oldPortfolioRegex, newPortfolio);

fs.writeFileSync(path, content);
console.log("React-native filtering and flexbox implemented for Projects!");
