const fs = require('fs');

// 1. Update Admin.tsx
let adminPath = '../client/src/pages/Admin.tsx';
let adminContent = fs.readFileSync(adminPath, 'utf8');

// Replace single image state with a multi-line images state
adminContent = adminContent.replace(
  "const [pImage, setPImage] = useState('');",
  "const [pImages, setPImages] = useState('');"
);

// Update save logic
adminContent = adminContent.replace(
  "const data = { title: pTitle, category: pCategory, image: pImage, link: pLink };",
  "const imagesArray = pImages.split('\\n').map(u => u.trim()).filter(u => u !== '');\n    const data = { title: pTitle, category: pCategory, images: imagesArray, link: pLink };"
);

// Update edit logic
adminContent = adminContent.replace(
  "setPImage(p.image);",
  "setPImages(p.images ? p.images.join('\\n') : (p.image || ''));"
);

// Update clear logic
adminContent = adminContent.replace(
  "setPTitle(''); setPImage(''); setPLink('');",
  "setPTitle(''); setPImages(''); setPLink('');"
);

// Update cancel edit
adminContent = adminContent.replace(
  "setPTitle(''); setPImage(''); setPLink('');",
  "setPTitle(''); setPImages(''); setPLink('');"
);

// Update form inputs
adminContent = adminContent.replace(
  '<div className="col-md-6"><input className="form-control" placeholder="Image URL" value={pImage} onChange={e => setPImage(e.target.value)} required /></div>',
  '<div className="col-md-12"><textarea className="form-control" placeholder="Image URLs (Paste one URL per line. First image is the thumbnail.)" rows={3} value={pImages} onChange={e => setPImages(e.target.value)} required /></div>'
);

// Update rendering in Admin
adminContent = adminContent.replace(
  '<img src={p.image} alt={p.title} style={{ width: \'100%\', height: \'150px\', objectFit: \'cover\', borderRadius: \'5px\', marginBottom: \'10px\' }} />',
  '<img src={p.images ? p.images[0] : p.image} alt={p.title} style={{ width: \'100%\', height: \'150px\', objectFit: \'cover\', borderRadius: \'5px\', marginBottom: \'10px\' }} />\\n                    <p style={{fontSize: "12px", color: "#ccc"}}>{p.images ? p.images.length : 1} image(s)</p>'
);

fs.writeFileSync(adminPath, adminContent);


// 2. Update Home.tsx
let homePath = '../client/src/pages/Home.tsx';
let homeContent = fs.readFileSync(homePath, 'utf8');

const dynamicProjectHtml = `
      <section id="portfolio" className="portfolio section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
          </div>
          <div className="row" data-aos="fade-up">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li data-filter="*" className="filter-active">All</li>
                <li data-filter=".filter-app">Web-App</li>
                <li data-filter=".filter-mobile">Mobile Application</li>
                <li data-filter=".filter-ux">UX/UI Design</li>
                <li data-filter=".filter-graphic">Graphic Design</li>
                <li data-filter=".filter-other">Other</li>
              </ul>
            </div>
          </div>
          <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="100">
            {loading ? (
              <div className="col-12 text-center"><p style={{color: '#fff'}}>Loading Projects from Database...</p></div>
            ) : projects.map(p => {
              const imageArray = p.images ? p.images : (p.image ? [p.image] : []);
              const mainImage = imageArray.length > 0 ? imageArray[0] : '';
              const extraImages = imageArray.slice(1);
              
              return (
                <div key={p.id} className={\`col-lg-4 col-md-6 portfolio-item \${p.category}\`}>
                  <div className="portfolio-wrap">
                    <img src={mainImage} className="img-fluid" alt={p.title} />
                    <div className="portfolio-info">
                      <h4>{p.title}</h4>
                      <p>{p.category.replace('filter-', '').toUpperCase()}</p>
                      <div className="portfolio-links">
                        <a href={mainImage} data-gallery={\`portfolioGallery-\${p.id}\`} className="portfolio-lightbox" title={p.title}><i className="bx bx-plus"></i></a>
                        {p.link && <a href={p.link} title="Demo Link" target="_blank" rel="noreferrer"><i className="bx bx-link"></i></a>}
                      </div>
                    </div>
                  </div>
                  {/* Hidden extra images for the lightbox gallery */}
                  <div style={{ display: 'none' }}>
                    {extraImages.map((img: string, i: number) => (
                      <a key={i} href={img} data-gallery={\`portfolioGallery-\${p.id}\`} className="portfolio-lightbox" title={\`\${p.title} - Image \${i+2}\`}>hidden</a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
`;

// we need to replace the old Projects section in Home.tsx. 
// Previously, I didn't replace it in Home.tsx using React mapping, I left the hardcoded one!
// Oh wait, I did! Let me check if Home.tsx has `<section id="portfolio" className="portfolio section-bg">` hardcoded in `rawHtmlTop` or `rawHtmlBottom`.
// Wait, projects were in `rawHtmlBottom`.
// Actually, I already refactored Projects in `Home.tsx` earlier!
// Let's replace the mapped React block for projects.
homeContent = homeContent.replace(
  /\{loading \? \([\s\S]*?\}\)/,
  `{loading ? (
              <div className="col-12 text-center"><p style={{color: '#fff'}}>Loading Projects from Database...</p></div>
            ) : projects.map(p => {
              const imageArray = p.images ? p.images : (p.image ? [p.image] : []);
              const mainImage = imageArray.length > 0 ? imageArray[0] : '';
              const extraImages = imageArray.slice(1);
              
              return (
                <div key={p.id} className={\`col-lg-4 col-md-6 portfolio-item \${p.category}\`}>
                  <div className="portfolio-wrap">
                    <img src={mainImage} className="img-fluid" alt={p.title} style={{width: '100%', height: '250px', objectFit: 'cover'}} />
                    <div className="portfolio-info">
                      <h4>{p.title}</h4>
                      <p>{p.category.replace('filter-', '').toUpperCase()}</p>
                      <div className="portfolio-links">
                        <a href={mainImage} data-gallery={\`portfolioGallery-\${p.id}\`} className="portfolio-lightbox" title={p.title}><i className="bx bx-images"></i></a>
                        {p.link && <a href={p.link} title="Live Demo" target="_blank" rel="noreferrer"><i className="bx bx-link-external"></i></a>}
                      </div>
                    </div>
                  </div>
                  {/* Hidden extra images for the lightbox gallery */}
                  <div style={{ display: 'none' }}>
                    {extraImages.map((img: string, i: number) => (
                      <a key={i} href={img} data-gallery={\`portfolioGallery-\${p.id}\`} className="portfolio-lightbox" title={\`\${p.title} - Image \${i+2}\`}>hidden</a>
                    ))}
                  </div>
                </div>
              );
            })}`
);

fs.writeFileSync(homePath, homeContent);
console.log("Projects multiple images enhanced!");
