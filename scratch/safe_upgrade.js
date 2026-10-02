const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Remove body::before background image safely
css = css.replace(/body::before\s*{[^}]*}/g, 'body::before { display: none; }');

// 2. Center header text safely
const safeAlign = `
/* Safe Center Alignment for Header */
#header h1, #header h2, #header .nav-menu {
  text-align: center;
}
#header .nav-menu ul {
  justify-content: center;
}
`;
css += safeAlign;

// 3. Add 100% safe UI/UX aesthetic overrides
const safeAesthetics = `
/* ==============================================================
   SAFE PREMIUM UI/UX AESTHETICS (NO LAYOUT CHANGES)
   ============================================================== */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

/* Typography & Colors */
body {
  font-family: 'Outfit', sans-serif !important;
  color: #e2e8f0;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif !important;
}

/* Gradients and Text Accents */
.section-title h2, #header h2 span, .typing, .about-me h3, .resume-title {
  background: linear-gradient(135deg, #00ff87, #60efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.section-title h2::after {
  background: linear-gradient(135deg, #00ff87, #60efff) !important;
}

/* Glassmorphic Cards (Aesthetic only) */
.about-me, .info-box, .resume-item, .icon-box, .portfolio-wrap, .education-card, .experience-card, .skills-card, .services-card {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.3s ease !important;
}
.icon-box:hover, .resume-item:hover, .portfolio-wrap:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(0, 255, 135, 0.3) !important;
  transform: translateY(-5px) !important;
}

/* Buttons */
.btn-primary, button[type="submit"] {
  background: linear-gradient(135deg, #00ff87, #60efff) !important;
  color: #000 !important;
  border: none !important;
  border-radius: 50px !important;
  font-weight: 700 !important;
}
.btn-primary:hover, button[type="submit"]:hover {
  box-shadow: 0 5px 20px rgba(0, 255, 135, 0.4) !important;
  opacity: 0.9 !important;
}

/* Form Inputs */
.form-control {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  border-radius: 8px !important;
}
.form-control:focus {
  border-color: #00ff87 !important;
  box-shadow: 0 0 10px rgba(0, 255, 135, 0.2) !important;
}

/* Nav Menu Hovers */
#header .social-links a:hover {
  background: #00ff87 !important;
  color: #000 !important;
}
.nav-menu a:hover, .nav-menu .active > a {
  color: #00ff87 !important;
}
`;

css += safeAesthetics;

fs.writeFileSync(cssPath, css);
console.log("Safe aesthetics applied.");
