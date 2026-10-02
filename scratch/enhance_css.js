const fs = require('fs');
const cssPath = '../client/public/assets/css/style.css';

let css = fs.readFileSync(cssPath, 'utf8');

const enhancements = `
/* ==============================================================
   PREMIUM UI/UX ENHANCEMENTS
   ============================================================== */

/* 1. Modern Typography & Smooth Scrolling */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Outfit', sans-serif !important;
  color: #e2e8f0;
  letter-spacing: 0.3px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif !important;
  color: #ffffff;
  font-weight: 600;
}

/* 2. Glassmorphism & Hover Effects on Social Links */
#header .social-links a {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

#header .social-links a:hover {
  background: #12d640;
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 10px 20px rgba(18, 214, 64, 0.4);
  border-color: #12d640;
}

/* 3. Enhanced Navigation Menu */
.nav-menu a {
  transition: all 0.3s ease;
  opacity: 0.8;
}
.nav-menu a:hover, .nav-menu .active > a {
  opacity: 1;
  text-shadow: 0 0 10px rgba(18, 214, 64, 0.5);
}

/* 4. Section Containers (Glassmorphic Cards) */
section {
  padding: 80px 0;
}
.about, .resume, .services, .portfolio, .contact {
  position: relative;
  z-index: 10;
}

/* Add subtle glass panels behind main content boxes */
.info-box, .resume-item, .icon-box {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-radius: 16px !important;
  padding: 30px !important;
  transition: all 0.4s ease !important;
}

.info-box:hover, .resume-item:hover, .icon-box:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(18, 214, 64, 0.3) !important;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5) !important;
}

/* 5. Glowing Buttons */
.btn-primary, button[type="submit"] {
  background: #12d640 !important;
  border: none !important;
  border-radius: 30px !important;
  padding: 12px 32px !important;
  font-weight: 600 !important;
  letter-spacing: 1px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 15px rgba(18, 214, 64, 0.2) !important;
}

.btn-primary:hover, button[type="submit"]:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(18, 214, 64, 0.5) !important;
  background: #15f048 !important;
}

/* 6. Portfolio Images Premium Hover */
.portfolio-wrap {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.portfolio-wrap:hover {
  transform: scale(1.03);
  border-color: rgba(18, 214, 64, 0.4);
  box-shadow: 0 15px 40px rgba(18, 214, 64, 0.2);
}

.portfolio-wrap img {
  transition: all 0.5s ease;
}

.portfolio-wrap:hover img {
  transform: scale(1.1);
}

/* 7. Form Inputs Glassmorphism */
.form-control {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
  border-radius: 8px !important;
}
.form-control:focus {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: #12d640 !important;
  box-shadow: 0 0 15px rgba(18, 214, 64, 0.2) !important;
}
.form-control::placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}

/* 8. Custom Elegant Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #010e1b; 
}
::-webkit-scrollbar-thumb {
  background: #1a1a1a; 
  border-radius: 10px;
  border: 2px solid #010e1b;
}
::-webkit-scrollbar-thumb:hover {
  background: #12d640; 
}
`;

// Only append if not already there
if (!css.includes('PREMIUM UI/UX ENHANCEMENTS')) {
  fs.writeFileSync(cssPath, css + enhancements);
  console.log("UI/UX Enhancements applied!");
} else {
  // Replace the old enhancements block just in case I modify it
  const parts = css.split('/* ==============================================================');
  fs.writeFileSync(cssPath, parts[0] + enhancements);
  console.log("UI/UX Enhancements updated!");
}
