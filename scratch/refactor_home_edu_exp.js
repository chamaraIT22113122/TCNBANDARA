const fs = require('fs');
const path = '../client/src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update state logic in Home.tsx
const newStateLogic = `
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
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
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // Re-initialize Isotope and Venobox
  useEffect(() => {
    if (!loading && projects.length > 0) {
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
      }, 500); 
    }
  }, [loading, projects]);
`;

// Replace the old state logic
content = content.replace(/const \[projects, setProjects\][\s\S]*?\}, \[loadingProjects, projects\]\);/, newStateLogic.trim());
content = content.replace(/loadingProjects/g, "loading");

// Replace rawHtmlTop entirely with dynamic React code.
// Since rawHtmlTop starts at `<!-- ======= About Section ======= -->` and goes to `<!-- Start Project Section -->`,
// I will just replace the `dangerouslySetInnerHTML={{ __html: rawHtmlTop }}` with the new dynamic sections!

const dynamicTopHtml = `
      {/* <div dangerouslySetInnerHTML={{ __html: rawHtmlTop }} /> */}
      
      {/* We will just inject the dynamic sections here! */}
      <section id="education" className="resume">
        <div className="container">
          <div className="section-title">
            <h2>Education</h2>
          </div>
          <div className="row">
            {education.map(e => (
              <div key={e.id} className="col-lg-6 col-md-6 mb-4">
                <div className="education-card" data-aos="fade-up" data-aos-delay="100">
                  {e.image && <img src={e.image} className="education-img img-fluid" alt="Education Logo" />}
                  <div className="education-content">
                    <p><em>{e.title}</em></p>
                    <h5>{e.date}</h5>
                    <h6>Relevant Coursework</h6>
                    <p>{e.description}</p>
                    {e.link && (
                      <a href={e.link} target="_blank" rel="noreferrer">
                        Check out the Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="services">
        <div className="container">
          <div className="section-title" style={{ textAlign: 'left' }}>
            <h2>Experience</h2>
          </div>
          <div className="row">
            {experience.map(ex => (
              <div key={ex.id} className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
                <div className="experience-item icon-box" style={{ textAlign: 'left' }}>
                  <h4><span style={{ color: '#12d640' }}>{ex.company}</span></h4>
                  <h5>{ex.date}</h5>
                  <p><em>{ex.role}</em></p>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {ex.description && ex.description.split('\\n').map((line: string, i: number) => (
                      <li key={i}>&#8226; {line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="skills section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Skills</h2>
          </div>
          <div className="row">
            {skills.map(s => (
              <div key={s.id} className="col-lg-12" data-aos="fade-up">
                <div className="skill-category" style={{ background: '#041627', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                  <h4 style={{ color: '#12d640', marginBottom: '20px' }}>{s.category}</h4>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    {s.images && s.images.map((img: string, i: number) => (
                      <img key={i} src={img} alt="Skill icon" style={{ height: '40px', width: 'auto' }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
`;

content = content.replace(/<div dangerouslySetInnerHTML={{ __html: rawHtmlTop }} \/>/, dynamicTopHtml);

fs.writeFileSync(path, content);
console.log("Home.tsx upgraded to render Education, Experience, and Skills dynamically!");
