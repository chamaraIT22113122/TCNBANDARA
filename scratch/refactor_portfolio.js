const fs = require('fs');
const path = '../client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Split rawHtml
const portfolioStart = content.indexOf('<!-- Start Project Section -->');
const portfolioEnd = content.indexOf('<!-- End Project Section -->') + '<!-- End Project Section -->'.length;

const topHtml = content.substring(content.indexOf('const rawHtml = `') + 'const rawHtml = `'.length, portfolioStart);
const bottomHtml = content.substring(portfolioEnd, content.indexOf('`;', portfolioEnd));

// Replace the single rawHtml with top and bottom
content = content.replace(/const rawHtml = `[\s\S]*?`;/, `const rawHtmlTop = \`${topHtml}\`;\nconst rawHtmlBottom = \`${bottomHtml}\`;\n`);

// 2. Add imports for Firebase
const imports = `import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";`;
content = content.replace("import { loadSlim } from '@tsparticles/slim';", "import { loadSlim } from '@tsparticles/slim';\n" + imports);

// 3. Add state and fetch logic for Projects in Home component
const stateLogic = `
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projData);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  // Re-initialize Isotope and Venobox after projects load
  useEffect(() => {
    if (!loadingProjects && projects.length > 0) {
      setTimeout(() => {
        if (window.jQuery && window.jQuery('.portfolio-container').length) {
          const portfolioIsotope = window.jQuery('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
          });
          window.jQuery('#portfolio-flters li').on('click', function() {
            window.jQuery("#portfolio-flters li").removeClass('filter-active');
            window.jQuery(this).addClass('filter-active');
            portfolioIsotope.isotope({ filter: window.jQuery(this).data('filter') });
          });
        }
        if (window.jQuery && window.jQuery('.venobox').length) {
          window.jQuery('.venobox').venobox();
        }
      }, 500); // small delay to let DOM paint
    }
  }, [loadingProjects, projects]);
`;
content = content.replace("const particlesInit = async (engine) => {", stateLogic + "\n  const particlesInit = async (engine) => {");

// 4. Update the render section
const jsxPortfolio = `
      <div dangerouslySetInnerHTML={{ __html: rawHtmlTop }} />
      
      {/* Dynamic React Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
          </div>
          <div className="row">
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
          <div className="row portfolio-container">
            {loadingProjects ? (
              <p style={{ color: '#fff', textAlign: 'center', width: '100%' }}>Loading Projects from Database...</p>
            ) : projects.length === 0 ? (
              <p style={{ color: '#fff', textAlign: 'center', width: '100%' }}>No projects found. Go to /admin to migrate legacy projects!</p>
            ) : (
              projects.map(p => (
                <div key={p.id} className={\`col-lg-4 col-md-6 portfolio-item \${p.category}\`}>
                  <div className="portfolio-wrap">
                    <img src={p.image} className="img-fluid" alt={p.title} />
                    <div className="portfolio-info">
                      <h3 className="text-center">{p.title}</h3>
                      <div className="portfolio-links">
                        <a href={p.link} data-gall="portfolioDetailsGallery" data-vbtype="iframe" className="venobox" title="Project Details"><i className="bx bx-info-circle"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: rawHtmlBottom }} />
`;

content = content.replace('<div dangerouslySetInnerHTML={{ __html: rawHtml }} />', jsxPortfolio);

fs.writeFileSync(path, content);
console.log("Refactored Home.tsx to dynamically load projects from Firebase!");
