const fs = require('fs');
const path = require('path');

const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// Replace flat green colors with CSS variables
css = css.replace(/#12d640/g, 'var(--primary-color)');
css = css.replace(/#18d26e/g, 'var(--primary-color)');
css = css.replace(/#1c7d32/g, 'var(--primary-dark)');

const modernAdditions = `
/* ==============================================================
   SUPER MODERN UPGRADE
   ============================================================== */
:root {
  --primary-color: #00ff87;
  --primary-dark: #60efff;
  --bg-gradient: radial-gradient(circle at top right, #0d1b2a 0%, #000000 100%);
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
}

body {
  background: var(--bg-gradient) !important;
}

/* Gradient Text for Headings */
.section-title h2, #header h2 span, .typing {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-shadow: 0 0 30px rgba(0, 255, 135, 0.3);
}

.section-title h2::after {
  content: "";
  position: absolute;
  display: block;
  width: 50px;
  height: 3px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  bottom: 0;
  left: 0;
}

/* Super Modern Cards */
.about-me, .info-box, .resume-item, .icon-box, .portfolio-wrap {
  background: var(--glass-bg) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid var(--glass-border) !important;
  border-radius: 24px !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
  padding: 40px !important;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
  position: relative;
}

.info-box::before, .resume-item::before, .icon-box::before, .portfolio-wrap::before {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
  transition: all 0.6s ease;
}

.info-box:hover::before, .resume-item:hover::before, .icon-box:hover::before, .portfolio-wrap:hover::before {
  left: 100%;
}

.info-box:hover, .resume-item:hover, .icon-box:hover, .portfolio-wrap:hover {
  transform: translateY(-10px) !important;
  border-color: rgba(0, 255, 135, 0.3) !important;
  box-shadow: 0 20px 40px rgba(0, 255, 135, 0.1) !important;
}

/* Image styling */
img.img-fluid {
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Floating Nav */
#header .container {
  padding: 30px !important;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255,255,255,0.05);
  margin-top: 5vh;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}

/* Gradient Button */
.btn-primary, button[type="submit"] {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)) !important;
  color: #000 !important;
  border: none !important;
  border-radius: 50px !important;
  padding: 15px 40px !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 2px !important;
  transition: all 0.4s ease !important;
}

.btn-primary:hover, button[type="submit"]:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 10px 30px rgba(0, 255, 135, 0.4) !important;
}

/* Form Styling */
.form-control {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  border-radius: 12px !important;
  padding: 15px 20px !important;
  font-size: 16px !important;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 0 20px rgba(0, 255, 135, 0.2) !important;
}

/* Scroll Animation Classes */
.reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
`;

if (!css.includes('SUPER MODERN UPGRADE')) {
  fs.writeFileSync(cssPath, css + modernAdditions);
}

// 2. Add Scroll Reveal logic to Home.tsx
const homeTsxPath = '../client/src/pages/Home.tsx';
let homeTsx = fs.readFileSync(homeTsxPath, 'utf8');

if (!homeTsx.includes('IntersectionObserver')) {
  const useEffectReplacement = `
  useEffect(() => {
    loadSlim(tsParticles).then(() => {
      setInit(true);
    });

    // Add reveal class to sections and elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('section, .info-box, .resume-item, .portfolio-wrap, .icon-box');
    elements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
`;
  homeTsx = homeTsx.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, useEffectReplacement);
  fs.writeFileSync(homeTsxPath, homeTsx);
}

console.log("Super modern upgrade applied.");
