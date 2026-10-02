
import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// ── Fallback HTML descriptions keyed by EXACT Firestore project title ─────────
const projectDescriptions: Record<string, string> = {
  'SKY-LIGHT-CINEMA_Web_APP': `<h2>Sky Light Cinema Web Application</h2><ul><li><strong>Tech Stack</strong>: MERN stack (MongoDB, Express.js, React.js, Node.js)</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/SKY-LIGHT-CINEMA" target="_blank">Project Link</a></li></ul><p>A web-based platform built with the <strong>MERN stack</strong> to streamline cinema operations, featuring:</p><ul><li>Sales, Staff, and Inventory Management</li><li>Showtime Scheduling</li><li>Financial and Payment Processing</li><li>Delivery &amp; Supplier Management</li></ul><p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,

  'Blood-Donation-System_Web_APP': `<h2>Blood Donation System</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Blood-Donation-System" target="_blank">Project Link</a></li></ul><p>A user-friendly platform built with PHP to streamline the blood donation process, catering to donors, administrators, and managers.</p><ul><li>User Registration: Quick sign-up with access to donation details and nearby centers.</li><li>Donation Management: Schedule, manage appointments, and provide feedback.</li><li>Administrative Panel: Manage users, appointments, staff, and social media content.</li><li>Managerial Operations: Generate reports and oversee finances for system efficiency.</li></ul><p>Efficient workflows ensure seamless interaction across roles, making the app a valuable tool for life-saving contributions.</p>`,

  'Online-Book-Store_Web_APP': `<h2>Online Book Store</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, and JavaScript</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Book-Store" target="_blank">Project Link</a></li></ul><p>A simple and elegant platform built using HTML and CSS, designed for book lovers. It offers a visually appealing interface with essential features for browsing and searching books.</p><ul><li>Home Page: Showcases featured books and categories.</li><li>Search Functionality: Search books by title, author, or genre.</li><li>Responsive Design: Works seamlessly on desktop and mobile devices.</li><li>Book Details Page: Displays book descriptions, authors, and prices.</li><li>Categories &amp; Filters: Organize books by genre or popularity for easier navigation.</li></ul><p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,

  'Online-Stock-Management-System_Web_APP': `<h2>Online Stock Management System</h2><ul><li><strong>Tech Stack</strong>: HTML, PHP, CSS, JavaScript, MySQL</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Stock-Management-System" target="_blank">Project Link</a></li></ul><p>A comprehensive web-based stock management system for businesses to efficiently track, manage, and analyze inventory.</p><ul><li>Real-time inventory tracking and updates.</li><li>Product categorization and search functionality.</li><li>Stock alerts for low inventory levels.</li><li>Sales and purchase order management.</li><li>Reports and analytics dashboard.</li></ul><p><strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>`,

  'To_Do_List_APP': `<h2>To-Do List App</h2><ul><li><strong>Tech Stack</strong>: Android (Kotlin), SQLite</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/To-Do-List" target="_blank">Project Link</a></li></ul><p>A clean and minimal Android mobile application to help users manage daily tasks efficiently.</p><ul><li>Add, edit, and delete tasks with ease.</li><li>Mark tasks as complete with a simple checkbox.</li><li>Persistent local storage using SQLite.</li><li>Minimalist UI for distraction-free productivity.</li></ul>`,

  'MediMingle_Mobile_APP': `<h2>MediMingle Mobile App</h2><ul><li><strong>Tech Stack</strong>: Flutter, Firebase</li><li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/MediMingle" target="_blank">Project Link</a></li></ul><p>A healthcare mobile application connecting patients with medical professionals for seamless appointment booking and health management.</p><ul><li>Patient registration and profile management.</li><li>Doctor search and appointment booking.</li><li>Real-time notifications and reminders.</li><li>Medical history tracking.</li><li>Firebase backend for real-time data sync.</li></ul>`,

  'Supplier Manager Dashboard UI Design': `<h2>Supplier Manager Dashboard UI</h2><ul><li><strong>Design Tool</strong>: Figma</li></ul><p>A comprehensive dashboard UI design for managing suppliers, procurement, and inventory for enterprise-level businesses.</p><ul><li>Supplier directory and contact management.</li><li>Purchase order tracking and status updates.</li><li>Analytics and performance metrics.</li><li>Responsive design for desktop and tablet.</li></ul>`,

  'Social Media Posts': `<h2>Social Media Posts</h2><ul><li><strong>Tools</strong>: Adobe Photoshop, Illustrator, Canva</li></ul><p>A collection of professionally designed social media post templates and graphics created for various brands and campaigns.</p><ul><li>Instagram, Facebook, and LinkedIn post designs.</li><li>Brand-consistent color schemes and typography.</li><li>Promotional and event announcement graphics.</li><li>Engaging visual content for digital marketing.</li></ul>`,
};

/** Get description: Firestore value first, then exact-title fallback */
function getFallbackDescription(title: string): string | null {
  return projectDescriptions[title] ?? null;
}


const rawHtmlTop = `

  
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BB8W2X"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <!-- ======= Header ======= -->
  <header id="header" class="header-tops">

    <div class="container">

      <h1><a href="index.html">TCN Bandara</a></h1>
      <h2 style="color:#fff">I'm a <span class="typing" style="color:#12D640"></span></h2>
      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li class="active"><a href="#header"> <span>Home</span></a></li>
          <li><a href="#about"><span>About</span></a></li>
          <li><a href="#education"> <span>Education</span></a></li>
          <li><a href="#experience"> <span>Experience</span></a></li>
<!--          <li><a href="#projects"> <span>Projects</span></a></li>-->
          <li><a href="#portfolio"> <span>Projects</span></a></li>
          <li><a href="#skills"> <span>Skills</span></a></li>
          <li><a href="https://drive.google.com/file/d/1Xw7PZjy3yXD_wo_YKTA7428sq6h_7cB0/view?usp=sharing" target="_blank"> <span>Resume</span></a></li>
          <li><a href="#contacts"> <span>Contact</span></a></li>

        </ul>
      </nav><!-- .nav-menu -->

      <div class="social-links">
        <a href="https://www.linkedin.com/in/chamara-nuwan-032a35323" target="_blank" class="linkedin"><i class="bx bxl-linkedin"></i></a>
        <a href="https://github.com/chamaraIT22113122" target="_blank" class="github"><i class="bx bxl-github"></i></a>
        <a href="mailto:cn1120693@gmail.com" target="_blank" class="google"><i class="bx bxl-google"></i></a>
        <a href="https://www.instagram.com/Cha__m_a" target="_blank" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="https://www.facebook.com/chamara.nuwan.332345" target="_blank" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="https://wa.me/+94702481691" target="_blank" class="whatsapp"><i class="bx bxl-whatsapp"></i></a>
    </div>
    

    </div>
  </header><!-- End Header -->

  <!-- ======= About Section ======= -->
  <section id="about" class="about">

    <!-- ======= About Me ======= -->
    <div class="about-me container">
    <div class="social-links"></div>
      <div class="section-title">
        <h2>About</h2>
      </div>
     
      <div class="row">
        <div class="col-lg-4" data-aos="fade-right">
          <img loading="lazy"  src="dp.jpg" class="img-fluid" alt="">
        </div>
        <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left"><br>
          <p>I am a passionate and dedicated developer with a strong foundation in web development, UI/UX design, app development, and graphic design. My journey into these fields is driven by a deep curiosity to create seamless, user-friendly digital experiences. I leverage my technical skills and design sensibilities to craft responsive websites, intuitive app interfaces, and visually engaging graphics that not only function flawlessly but also captivate users. Whether building an interactive web interface or designing aesthetic layouts, I am committed to transforming ideas into impactful digital products.</p>
          <br><br><div class="row">
            <div class="col-lg-6">
              <ul>
                <li><i class="icofont-rounded-right"></i> <strong>Birthday:</strong> 06 April 2002</li>
                <li><i class="icofont-rounded-right"></i> <strong>Phone:</strong> +94 70-2481-691</li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                <li><i class="icofont-rounded-right"></i> <strong>City:</strong> Malabe, SL</li>
                <li><i class="icofont-rounded-right"></i> <strong>Email:</strong> cn1120693@gmail.com</li>
              </ul>
            </div>
            <div class="upbutton" style="text-align: right;"></div>
            <a href="Vcard.html" target="_blank" class="btn btn-primary">Vcard</a>
          </div>
          </div>
        </div>
      </div>

    </div><!-- End About Me -->

    <!-- ======= Interests ======= -->
    <div class="interests container">
      <div class="section-title">
        <h2>Interests</h2>
      </div>
    
      <div class="row">
        <!-- Software Engineering -->
        <div class="col-lg-3 col-md-4">
          <div class="icon-box">
            <i class="ri-code-s-slash-fill" style="color: #ff5722;"></i>
            <h3>Software Engineering</h3>
            <ul>
              <li>System Design</li>
              <li>Code Optimization</li>
              <li>Agile Methodologies</li>
            </ul>
          </div>
        </div>
    
        <!-- App Development -->
        <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
          <div class="icon-box">
            <i class="ri-smartphone-line" style="color: #3f51b5;"></i>
            <h3>App Development</h3>
            <ul>
              <li>Cross-Platform Apps</li>
              <li>Backend Integration</li>
              <li>Performance Tuning</li>
            </ul>
          </div>
        </div>
    
        <!-- UI/UX Design -->
        <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
          <div class="icon-box">
            <i class="ri-layout-masonry-line" style="color: #009688;"></i>
            <h3>UI/UX Design</h3>
            <ul>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>User Research</li>
            </ul>
          </div>
        </div>
    
        <!-- Graphic Designing -->
        <div class="col-lg-3 col-md-4 mt-4 mt-lg-0">
          <div class="icon-box">
            <i class="ri-brush-3-line" style="color: #ff9800;"></i>
            <h3>Graphic Designing</h3>
            <ul>
              <li>Logo Design</li>
              <li>Branding</li>
              <li>Illustrations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    </div><!-- End Interests -->
  </section><!-- End About Section -->



<!-- ======= Education Section ======= -->
<section id="education" class="services">
  <div class="container">
    <div class="section-title">
      <h2>Education</h2>
    </div>
    <div class="row">
     
      <!-- Card 1 -->
      <div class="col-lg-6 col-md-6 mb-4">
        <div class="education-card" data-aos="fade-up" data-aos-delay="200">
          <img loading="lazy"  src="assets/img/education/GCE.jpg" class="education-img img-fluid" alt="University Logo">
          <div class="education-content">
            <p><em>General Certificate of Education (Ordinary Level)</em></p>
            <h5>December 2018</h5>
            <h6>Relevant Coursework</h6>
            <ul>
              <li>Passed with 01A, 04B, 03C and 01S</li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="col-lg-6 col-md-6 mb-4">
        <div class="education-card" data-aos="fade-up" data-aos-delay="300">
          <img loading="lazy"  src="assets/img/education/GCE.jpg" class="education-img img-fluid" alt="Tech Institute Logo">
          <div class="education-content">
            <p><em>General Certificate of Education (Advanced Level)</em></p>
            <h5>February (2021/2022)</h5>
            <h6>Relevant Coursework</h6>
            <ul>
              <li>Passed with 03S and 01C </li>
              <li></li>
             
            </ul>
          </div>
        </div>
      </div>
       <!-- Card 4 -->
       <div class="col-lg-6 col-md-6 mb-4">
        <div class="education-card" data-aos="fade-up">
          <img loading="lazy"  src="assets/img/education/IDM.jpg" class="education-img img-fluid" alt="IDM Logo">
          <div class="education-content">
            <p><em>Diploma in Information Technology (Level 3)</em></p>
            <h5>July 2018 - July 2019</h5>
            <h6>Relevant Coursework</h6>
            <ul>
              <li>Office Applications</li>
              <li>Graphic Designing (Photoshop, Illustrator, Premiere Pro, etc.)</li>
              <li>Web Design</li>
              <li>Programming Theory in the Digital World</li>
              <li>Foundation of Algorithms</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="col-lg-6 col-md-6 mb-4">
        <div class="education-card" data-aos="fade-up" data-aos-delay="100">
          <img loading="lazy"  src="assets/img/education/SLIIT.jpg" class="education-img img-fluid" alt="SLIIT Logo">
          <div class="education-content">
            <p><em>BSc (Hons) in Information Technology - Specialising in Software Engineering</em></p>
            <h5>October 2021 - Present (Undergraduate)</h5>
            <h6>Relevant Coursework</h6>
            <ul>
              <p>The modules covered in 4 years can be found below:</p>
              <li>
                <a href="https://www.sliit.lk/computing/programmes/software-engineering-degree/" target="_blank">
                  Modules - Software Engineering Degree (SLIIT)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

       <!-- Card 5 -->
       <div class="col-lg-6 col-md-6 mb-4">
        <div class="education-card" data-aos="fade-up" data-aos-delay="100">
          <img loading="lazy"  src="assets/img/education/Limi.png" class="education-img img-fluid" alt="SLIIT Logo">
          <div class="education-content">
            <p><em>Career Essentials in Software Development by Microsoft and LinkedIn</em></p>
            <h5>December 2024 </h5>
            <h6>Relevant Coursework</h6>
            <ul>
              <li>Programming core concepts </li>
              <li>Working with collections</li>
              <li>Using external code</li>
              <li>Finding and fixing bugs</li>
            </ul>
                <a href="https://www.linkedin.com/learning/certificates/9c0420814f1dfd8dbddbc7e853ed76c52ede95df67aee8d1c74e60470cde54f8?trk=share_certificate" target="_blank">
                  Check out the Certificate (LinkedIn & Microsoft)
                </a>    
          </div>
        </div>
      </div>

       <!-- Card 6 -->
       <div class="col-lg-6 col-md-6 mb-4">
        <div class="education-card" data-aos="fade-up" data-aos-delay="100">
          <img loading="lazy"  src="assets/img/education/Limi.png" class="education-img img-fluid" alt="SLIIT Logo">
          <div class="education-content">
            <p><em>Career Essentials in Cybersecurity by Microsoft and LinkedIn</em></p>
            <h5>December 2024 </h5>
            <h6>Relevant Coursework</h6>
            <ul>
              <li>Fundamental cybersecurity concepts</li>
              <li>Fluency in cybersecurity terminology</li>
              <li>Navigating the cybersecurity threat landscape</li>
            </ul>
                <a href="https://www.linkedin.com/learning/certificates/a19d5df97e8183c1c05a22a17aa52ca5ac0eabf2eb8fd8e2ef76dc40a2176561?trk=share_certificate" target="_blank">
                  Check out the Certificate (LinkedIn & Microsoft)
                </a>   <br> 
                <a href="https://www.linkedin.com/learning/certificates/00980a953310eb28e0d262813e51ad878121b4a0f03cb6c3ce564101ec838c94?trk=share_certificate" target="_blank">
                  Check out the Certificate (National Association of State Boards of Accountancy (NASBA))
                </a>   <br> 
                <a href="https://www.linkedin.com/learning/certificates/d36e8e91b3f44210ca79fa6c8ec4d75df9c45c9f112df076f9d3afe2f5845efc?trk=share_certificate" target="_blank">
                  Check out the Certificate (Project Management Institute PMI®)
                </a>    
          </div>
        </div>
      </div>

            <!-- Card 7 -->
            <div class="col-lg-6 col-md-6 mb-4">
              <div class="education-card" data-aos="fade-up" data-aos-delay="100">
                <img loading="lazy"  src="assets/img/education/google.png" class="education-img img-fluid" alt="SLIIT Logo">
                <div class="education-content">
                  <p><em>Generative Al for Educators</em></p>
                  <h5>December 2024 </h5>
                  <h6>Relevant Coursework</h6>
                  <ul>
                    <li>Identify ways generative AI can assist your professional practices</li>
                    <li>Write prompts for an AI tool and evaluate the outpu</li>
                    <li>Create classroom resources using an AI toole</li>
                  </ul>
                      <a href="https://skillshop.exceedlms.com/student/award/LNYVwcZCtmfxkfxbpnXSfTjU?id=356722024" target="_blank">
                        Check out the Certificate (GOOGLE)
                      </a>   <br> 
                     
                </div>
              </div>
            </div>
      
             <!-- Card 8 -->
             <div class="col-lg-6 col-md-6 mb-4">
              <div class="education-card" data-aos="fade-up" data-aos-delay="100">
                <img loading="lazy"  src="assets/img/education/google.png" class="education-img img-fluid" alt="SLIIT Logo">
                <div class="education-content">
                  <p><em>Fundamentals of digital marketing</em></p>
                  <h5>December 2024 </h5>
                  <h6>Relevant Coursework</h6>
                  <p>Master the basics of digital marketing with our Interactive Advertising Bureau-accredited course. There are 24 modules to explore, all created by Google trainers, packed full of practical exercises and real-world examples to help you turn knowledge into action.</p>
                      <a href="https://skillshop.exceedlms.com/student/award/DrPX8qBSENZjLHEntKqNfbDb" target="_blank">
                        Check out the Certificate (GOOGLE)
                      </a>   <br> 
                     
                </div>
              </div>
            </div>

             <!-- Card 9 -->
             <div class="col-lg-6 col-md-6 mb-4">
              <div class="education-card" data-aos="fade-up" data-aos-delay="100">
                <img loading="lazy"  src="assets/img/education/MO.jpg" class="education-img img-fluid" alt="SLIIT Logo">
                <div class="education-content">
                  <p><em>Python for Beginners</em></p>
                  <h5>July 2025 </h5>
                  <h6>Relevant Coursework</h6>
                  <p>This programme will provide exposure to core programming concepts in Python language. Participants who successfully complete will gain the skills and knowledge to become an entry level Python programmer.</p>
                      <a href="https://drive.google.com/file/d/1vy-RUltJTJt9L6HpqZb6DewxB4PxeN40/view?usp=sharing" target="_blank">
                        Check out the Certificate 
                      </a>   <br> 
                     
                </div>
              </div>
            </div>

            <!-- Card 10 -->
             <div class="col-lg-6 col-md-6 mb-4">
              <div class="education-card" data-aos="fade-up" data-aos-delay="100">
                <img loading="lazy"  src="assets/img/education/MO.jpg" class="education-img img-fluid" alt="SLIIT Logo">
                <div class="education-content">
                  <p><em>Web Design for Beginners</em></p>
                  <h5>July 2025 </h5>
                  <h6>Relevant Coursework</h6>
                  <p>The contents cover the basic building blocks for web designing, including introducing WWW and Internet, essential HTML elements, applying CSS styles, creating interactivity using Javascripts and designing responsive web pages.</p>
                      <a href="https://drive.google.com/file/d/1rAPA45r_feTxrN8J5q8HiEBLnmRZCKjo/view?usp=sharing" target="_blank">
                        Check out the Certificate 
                      </a>   <br> 
                     
                </div>
              </div>
            </div>

             <!-- Card 11 -->
             <div class="col-lg-6 col-md-6 mb-4">
              <div class="education-card" data-aos="fade-up" data-aos-delay="100">
                <img loading="lazy"  src="assets/img/education/Oracal.jpg" class="education-img img-fluid" alt="SLIIT Logo">
                <div class="education-content">
                  <p><em>Oracle Cloud Infrastructure 2025 Certified Foundations Associate</em></p>
                  <h5>September 2025 </h5>
                  <h6>Relevant Coursework</h6>
                  <p>This path introduces Oracle Cloud Infrastructure (OCI) basics—architecture, access, networking, compute, storage, databases, security, and cost management. Basic cloud knowledge is required.</p>
                      <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=DD39DDBCDBDBE195308295E26AF5A8DC5EEFD14760939D9B7AAEF4D02E63EA92" target="_blank">
                        Check out the Certificate 
                      </a>   <br> 
                     
                </div>
              </div>
            </div>
      

    </div>
  </div>
</section>  
  <!-- End Education Section -->



  <!-- Start Experience Section -->

  <section id="experience" class="services">
    <div class="container">
      <div class="section-title" style="text-align: left;">
        <h2>Experience</h2>
      </div>
      <div class="row">

         <!-- Fourth Experience -->
           <div class="col-lg-12" data-aos="fade-up" data-aos-delay="200">
          <div class="experience-item icon-box" style="text-align: left;">
            <h4>
              <a href="https://example.com/" style="color: #12d640;">Bitumix (Private) Limited</a>
            </h4>
            <h5>July 2025 - Present</h5>
            <p><em>Intern Designer</em></p>
           <ul>
             <li>&#8226; Designed and delivered hands-on training sessions in graphic design tools such as Adobe Photoshop, Illustrator, and Canva.</li>
             <li>&#8226; Provided technical support and creative guidance to students across various digital design and branding projects.</li>
             <li>&#8226; Assisted in creating and evaluating practical assignments focused on visual composition, typography, and layout design.</li>
             <li>&#8226; Improved workflow in the design lab by organizing resources and implementing efficient design review processes.</li>
          </ul>
       
          </div>
        </div>

        <!-- Third Experience -->
           <div class="col-lg-12" data-aos="fade-up" data-aos-delay="200">
          <div class="experience-item icon-box" style="text-align: left;">
            <h4>
              <a href="https://example.com/" style="color: #12d640;">Cybernetic Software Solution</a>
            </h4>
            <h5>January 2025 - February 2025</h5>
            <p><em>Software Developer</em></p>
            <ul>
              <li>&#8226; Designed and delivered hands-on training sessions in graphic design tools such as Adobe Photoshop, Illustrator, and Canva.</li>
              <li>&#8226; Provided technical support and creative guidance to students across various digital design and branding projects.</li>
              <li>&#8226; Assisted in creating and evaluating practical assignments focused on visual composition, typography, and layout design.</li>
              <li>&#8226; Improved workflow in the design lab by organizing resources and implementing efficient design review processes.</li>
              <li>&#8226; Collaborated with faculty to integrate design thinking into the curriculum, enhancing the overall educational experience.</li>
              <li>&#8226; <strong>Taught WordPress from the ground up at Cybernetic Academy, covering everything from installation to custom theme development.</strong></li>
            </ul>

       
          </div>
        </div>

        <!-- Second Experience -->
         <div class="col-lg-12" data-aos="fade-up">
          <div class="experience-item icon-box" data-aos="fade-up" data-aos-delay="100" style="text-align: left;">
            <h4>
              <a href="https://esoft.lk/" style="color: #12d640;">ESOFT Metro Campus Anuradhapura</a>
            </h4>
            <h5>February 2021 - August 2021</h5>
            <p><em>Computer Lab Instructor</em></p>
            <ul>
              <li>&#8226; Conducted hands-on training sessions and provided technical support to students across various computer science and IT-related subjects.</li>
              <li>&#8226; Managed and maintained computer lab equipment, ensuring optimal functionality for over 100 users daily.</li>
              <li>&#8226; Assisted in designing and delivering practical assignments, enhancing students' understanding of programming and networking concepts.</li>
              <li>&#8226; Monitored and evaluated students' progress, offering personalized guidance to ensure academic success.</li>
              <li>&#8226; Streamlined lab operations and exams, improving resource utilization and user satisfaction.</li>
            </ul>
          </div>
        </div>

        <!-- first Experience -->
        <div class="col-lg-12" data-aos="fade-up" data-aos-delay="200">
          <div class="experience-item icon-box" style="text-align: left;">
            <h4>
              <a href="https://example.com/" style="color: #12d640;">Freelance Developer & Designer</a>
            </h4>
            <h5>September 2021 - Present</h5>
            <p><em>Independent Contractor</em></p>
            <ul>
              <li>&#8226; Delivered tailored web and mobile solutions for diverse clients.</li>
              <li>&#8226; Designed branding materials, including logos and social media assets, to strengthen clients' online presence.</li>
              <li>&#8226; Implemented RESTful APIs to enhance system performance and enable seamless communication between microservices.</li>
              <li>&#8226; Provided consultation on social media strategies to boost engagement and brand visibility.</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  
  <!-- End Experience Section -->

`;
const rawHtmlBottom = `



  <!-- Start Skills Section -->
  <section id="skills" class="services">
    <div class="container">
      <div class="section-title">
        <h2>Skills</h2>
      </div>
      <div class="row">
        <!-- Card 1 -->
        <div class="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="100">
          <div style="background: #041627; border: 1px solid #1a2a3a; border-radius: 12px; padding: 24px; height: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.5);">
            <h4 style="text-align:left; color: #12d640; font-size: 20px; margin-bottom: 20px; font-weight: bold;">Languages & Databases</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/python/python-horizontal.svg" alt="Python Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/java/java-horizontal.svg" alt="Java Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-ar21.svg" alt="HTML5 Logo" height="35" width="auto">
              <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS3 Logo" height="45" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/mysql/mysql-horizontal.svg" alt="MySQL Logo" height="40" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-horizontal.svg" alt="PostgreSQL Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" alt="MongoDB Logo" height="45" width="auto">
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div style="background: #041627; border: 1px solid #1a2a3a; border-radius: 12px; padding: 24px; height: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.5);">
            <h4 style="text-align:left; color: #12d640; font-size: 20px; margin-bottom: 20px; font-weight: bold;">Frameworks</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-horizontal.svg" alt="Node.js Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-ar21.svg" alt="Bootstrap Logo" height="35" width="auto">
              <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React.js Logo" height="35" width="auto">
              <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png" alt="Kotlin Logo" height="35" width="auto">
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300">
          <div style="background: #041627; border: 1px solid #1a2a3a; border-radius: 12px; padding: 24px; height: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.5);">
            <h4 style="text-align:left; color: #12d640; font-size: 20px; margin-bottom: 20px; font-weight: bold;">Tools & Cloud</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg" alt="Git Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg" alt="AWS Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-ar21.svg" alt="Google Cloud Logo" height="35" width="auto">
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="col-md-6 mb-4" data-aos="fade-up" data-aos-delay="400">
          <div style="background: #041627; border: 1px solid #1a2a3a; border-radius: 12px; padding: 24px; height: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.5);">
            <h4 style="text-align:left; color: #12d640; font-size: 20px; margin-bottom: 20px; font-weight: bold;">Graphic Tools</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; align-items: center;">
              <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" alt="Photoshop Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-ar21.svg" alt="Illustrator Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/canva/canva-ar21.svg" alt="Canva Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/figma/figma-ar21.svg" alt="Figma Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/sketchapp/sketchapp-ar21.svg" alt="Sketch Logo" height="35" width="auto">
              <img loading="lazy" src="https://www.vectorlogo.zone/logos/invisionapp/invisionapp-ar21.svg" alt="InVision Logo" height="35" width="auto">
              <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Adobe_Premiere_Pro_Logo.svg" alt="Premiere Pro Logo" height="35" width="auto">
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  <!-- End Skills Section -->




  <!-- Start Links section -->
  <section id="links" class="services">
    <div class="container">
      <div class="section-title">
        <h2>Resume & Links</h2>
      </div>
      <div class="row">
        <div class="col-md-3 mt-4 mt-md-0 icon-box" data-aos="fade-up" data-aos-delay="100">
          <a href="https://drive.google.com/file/d/1Xw7PZjy3yXD_wo_YKTA7428sq6h_7cB0/view?usp=sharing" target="_blank"><div class="icon"><i class="icofont-page"></i></div></a>
          <h4 class="title"><a href="https://drive.google.com/file/d/1Xw7PZjy3yXD_wo_YKTA7428sq6h_7cB0/view?usp=sharing" target="_blank">Resume</a></h4>
          <p class="description" style="color:#fff;">The link contains downloadable resume</p>
        </div>
        <div class="col-md-3 mt-4 mt-md-0 icon-box" data-aos="fade-up">
          <a href="https://github.com/rajaprerak/LeetCode_Problems" target="_blank"><div class="icon"><i class="icofont-link"></i></div></a>
          <h4 class="title"><a href="https://github.com/rajaprerak/LeetCode_Problems" target="_blank">LeetCode Repository</a></h4>
          <p class="description" style="color:#fff;"> The github repository contains leetcode problems solution in python.</p>
        </div>
        <!-- <div class="col-md-3 mt-4 mt-md-0 icon-box" data-aos="fade-up" data-aos-delay="100">
          <a href="https://techingenious.herokuapp.com/" target="_blank"><div class="icon"><i class="icofont-page"></i></div></a>
          <h4 class="title"><a href="https://techingenious.herokuapp.com/" target="_blank">Blog</a></h4>
          <p class="description" style="color:#fff;">Blog containing articles on AI, coding, development</p>
        </div> -->
      </div>
    </div>
  </section> <!--End Links Section -->
<!-- Start Contact Section -->
<section id="contacts" class="contact">
  <div class="container">

    <div class="section-title">
      <h2>Contact</h2>
    </div>

    <div class="row mt-2">

      <!-- Address Section -->
      <div class="col-md-6 d-flex align-items-stretch">
        <div class="info-box">
          <i class="bx bx-map"></i>
          <h3>My Address</h3>
          <p>Pinlida Rd, Pattiyawaththa Rd, Kaduwela</p>
        </div>
      </div>

      <!-- Social Profiles Section -->
      <div class="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
        <div class="info-box">
          <i class="bx bx-share-alt"></i>
          <h3>Social Profiles</h3>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/chamara-nuwan-032a35323" target="_blank" rel="noopener noreferrer" class="linkedin"><i class="bx bxl-linkedin"></i></a>
            <a href="https://github.com/chamaraIT22113122" target="_blank" rel="noopener noreferrer" class="github"><i class="bx bxl-github"></i></a>
            <a href="mailto:cn1120693@gmail.com" target="_blank" rel="noopener noreferrer" class="google"><i class="bx bxl-google"></i></a>
            <a href="https://www.instagram.com/Cha__m_a" target="_blank" rel="noopener noreferrer" class="instagram"><i class="bx bxl-instagram"></i></a>
            <a href="https://www.facebook.com/chamara.nuwan.332345" target="_blank" rel="noopener noreferrer" class="facebook"><i class="bx bxl-facebook"></i></a>
            <a href="https://wa.me/+94702481691" target="_blank" rel="noopener noreferrer" class="whatsapp"><i class="bx bxl-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <!-- Email Section -->
      <div class="col-md-6 mt-4 d-flex align-items-stretch">
        <div class="info-box">
          <i class="bx bx-envelope"></i>
          <h3>Email</h3>
          <p><a href="mailto:cn1120693@gmail.com">cn1120693@gmail.com</a></p>
          <p><a href="mailto:tcnbandara@gmail.com">tcnbandara@gmail.com</a></p>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="col-md-6 mt-4 d-flex align-items-stretch">
        <div class="info-box">
          <i class="bx bx-phone-call"></i>
          <h3>Contact</h3>
          <p><a href="tel:+94702481691">+94 70 248 1691</a></p>
          <p><a href="tel:+94775608073">+94 77 560 8073</a></p>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="col-12 mt-5">
        <!-- Success Message -->
        <div id="success-message" class="alert alert-success" style="display: none;">
          <strong>Success!</strong> Your message has been sent. I will get back to you soon.
        </div>

        <form id="contact-form" action="https://api.web3forms.com/submit" method="POST" role="form" class="php-email-form">
          <!-- Web3Forms Access Key -->
          <input type="hidden" name="access_key" value="89cfb47b-2d00-4d89-8e8b-517bce9ba36b">

          <div class="row">
            <div class="col-md-6 form-group">
              <label for="name">Your Name</label>
              <input type="text" name="name" id="name" class="form-control" placeholder="Enter your name" required>
            </div>
            <div class="col-md-6 form-group">
              <label for="email">Your Email</label>
              <input type="email" name="email" id="email" class="form-control" placeholder="Enter your email" required>
            </div>
          </div>
          <div class="form-group mt-3">
            <label for="subject">Subject</label>
            <input type="text" name="subject" id="subject" class="form-control" placeholder="Enter the subject" required>
          </div>
          <div class="form-group mt-3">
            <label for="message">Message</label>
            <textarea name="message" id="message" class="form-control" rows="6" placeholder="Type your message here" required></textarea>
          </div>
          <div class="text-center mt-4">
            <button type="submit" id="submit-btn" class="btn btn-primary">Send Message</button>
          </div>
        </form>
      </div>

    </div>

  </div>
</section>




  <!-- End Contact Section -->

  
`;


function Home() {
  
  const [projects, setProjects] = useState<any[]>([]);
  const [projectCategories, setProjectCategories] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('*');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [profileImage, setProfileImage] = useState<string>('dp.jpg');

  const openProject = (p: any) => { setSelectedProject(p); setGalleryIndex(0); };
  const closeProject = () => setSelectedProject(null);
  const prevImg = () => setGalleryIndex(i => (i - 1 + (selectedProject?.images?.length || 1)) % (selectedProject?.images?.length || 1));
  const nextImg = () => setGalleryIndex(i => (i + 1) % (selectedProject?.images?.length || 1));

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const parseYear = (dateStr: string) => {
          if (!dateStr) return 0;
          if (dateStr.toLowerCase().includes('present')) return 9999;
          const match = dateStr.match(/\d{4}/g);
          if (match) return Math.max(...match.map(Number));
          return 0;
        };

        const pSnap = await getDocs(collection(db, "projects"));
        const pData = pSnap.docs.map(d => ({ id: d.id, ...d.data() as any }));
        // Sort projects by newest first (createdAt timestamp)
        pData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setProjects(pData);
        
        const eSnap = await getDocs(collection(db, "education"));
        const eData = eSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        eData.sort((a, b) => parseYear(b.date) - parseYear(a.date));
        setEducation(eData);

        const exSnap = await getDocs(collection(db, "experience"));
        const exData = exSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        exData.sort((a, b) => parseYear(b.date) - parseYear(a.date));
        setExperience(exData);
        
        const sSnap = await getDocs(collection(db, "skills"));
        setSkills(sSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const catSnap = await getDocs(collection(db, "projectCategories"));
        setProjectCategories(catSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Fetch profile image from Firestore (Base64 or URL)
        const profileDoc = await getDoc(doc(db, 'settings', 'profile'));
        if (profileDoc.exists()) {
          const pd = profileDoc.data();
          if (pd?.imageBase64) setProfileImage(pd.imageBase64);
          else if (pd?.imageUrl) setProfileImage(pd.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

 

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    let typedInstance: any = null;
    
    const initTyped = () => {
      try {
        const target = document.querySelector('.typing');
        if (!target) return;
        
        let TypedConstructor = Typed as any;
        if (typeof TypedConstructor !== 'function' && TypedConstructor?.default) {
           TypedConstructor = TypedConstructor.default;
        }
        if (typeof TypedConstructor !== 'function') {
           TypedConstructor = (window as any).Typed;
        }

        if (typeof TypedConstructor === 'function') {
          typedInstance = new TypedConstructor('.typing', {
            strings: [
              "Software Developer", 
              "Graphic Designer", 
              "Video Editor", 
              "UI/UX Designer", 
              "Full Stack Developer", 
              "Mobile App Developer",
              "Tech Enthusiast"
            ],
            loop: true,
            typeSpeed: 65,
            backSpeed: 65
          });
        }
      } catch (err) {
        console.error("Typed.js initialization failed:", err);
      }
    };

    // Slight delay ensures dangerouslySetInnerHTML has finished rendering
    const timer = setTimeout(initTyped, 150);

    return () => {
      clearTimeout(timer);
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, []);
  
  useEffect(() => {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById('submit-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date()
      };

      try {
        await addDoc(collection(db, "contacts"), data);
        const successMsg = document.getElementById('success-message');
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          if (successMsg) successMsg.style.display = 'none';
        }, 5000);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to send message. Please check Firebase configuration.");
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#010e1b' }}
        options={{
          background: { color: { value: "#010e1b" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
                resize: { enable: true }
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 }
              }
            },
            particles: {
              color: { value: "#ffffff" },
              links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.1, width: 1 },
              move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.5, straight: false },
              number: { density: { enable: true, width: 800, height: 800 }, value: 100 },
              opacity: { value: 0.7 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 2 } }
            },
            detectRetina: true
          }}
        />
      
      
      {/* Header only — rendered from rawHtmlTop */}
      <div dangerouslySetInnerHTML={{ __html: rawHtmlTop.split('<!-- ======= About Section ======= -->')[0] }} />

      {/* ── About Section (React JSX so profileImage works) ── */}
      <section id="about" className="about">
        <div className="about-me container">
          <div className="section-title">
            <h2>About</h2>
          </div>
          <div className="row align-items-center">
            {/* LEFT — DP Image */}
            <div className="col-lg-4 col-md-5 col-12 mb-4 mb-md-0 text-center text-md-start">
              <img loading="lazy" 
                src={profileImage}
                alt="Profile"
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  maxHeight: '380px',
                  objectFit: 'contain',
                  display: 'inline-block',
                  mixBlendMode: 'screen',
                  filter: 'contrast(1.05)',
                }}
              />
            </div>
            {/* RIGHT — Bio & Info */}
            <div className="col-lg-8 col-md-7 col-12 pt-4 pt-lg-0 content">
              <br />
              <p>I am a passionate and dedicated developer with a strong foundation in web development, UI/UX design, app development, and graphic design. My journey into these fields is driven by a deep curiosity to create seamless, user-friendly digital experiences. I leverage my technical skills and design sensibilities to craft responsive websites, intuitive app interfaces, and visually engaging graphics that not only function flawlessly but also captivate users. Whether building an interactive web interface or designing aesthetic layouts, I am committed to transforming ideas into impactful digital products.</p>
              <br /><br />
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li><i className="icofont-rounded-right"></i> <strong>Birthday:</strong> 06 April 2002</li>
                    <li><i className="icofont-rounded-right"></i> <strong>Phone:</strong> +94 70-2481-691</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li><i className="icofont-rounded-right"></i> <strong>City:</strong> Malabe, SL</li>
                    <li><i className="icofont-rounded-right"></i> <strong>Email:</strong> cn1120693@gmail.com</li>
                  </ul>
                </div>
              </div>
              <a href="Vcard.html" target="_blank" className="btn btn-primary">Vcard</a>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="interests container">
          <div className="section-title"><h2>Interests</h2></div>
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="icon-box"><i className="ri-code-s-slash-fill" style={{ color: '#ff5722' }}></i><h3>Software Engineering</h3><ul><li>System Design</li><li>Code Optimization</li><li>Agile Methodologies</li></ul></div>
            </div>
            <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
              <div className="icon-box"><i className="ri-smartphone-line" style={{ color: '#3f51b5' }}></i><h3>App Development</h3><ul><li>Cross-Platform Apps</li><li>Backend Integration</li><li>Performance Tuning</li></ul></div>
            </div>
            <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
              <div className="icon-box"><i className="ri-layout-masonry-line" style={{ color: '#009688' }}></i><h3>UI/UX Design</h3><ul><li>Wireframing</li><li>Prototyping</li><li>User Research</li></ul></div>
            </div>
            <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
              <div className="icon-box"><i className="ri-brush-3-line" style={{ color: '#ff9800' }}></i><h3>Graphic Designing</h3><ul><li>Logo Design</li><li>Branding</li><li>Illustrations</li></ul></div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="resume">
        <div className="container">
          <div className="section-title">
            <h2>Education</h2>
          </div>
          <div className="row">
            {education.map(e => {
              const isPresent = e.date?.toLowerCase().includes('present');
              return (
              <div key={e.id} className="col-lg-6 col-md-6 mb-4">
                <div className="education-card" data-aos="fade-up" data-aos-delay="100">
                  {e.image && <img loading="lazy"  src={e.image} className="education-img img-fluid" alt="Education Logo" />}
                  <div className="education-content">
                    <p><em>{e.title}</em></p>
                    <h5
                      style={
                        isPresent
                          ? {
                              background: '#12d640',
                              color: '#010e1b',
                              display: 'inline-block',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontWeight: 700,
                            }
                          : {}
                      }
                    >
                      {e.date}
                    </h5>
                    <h6>Relevant Coursework</h6>
                    <p>{e.description}</p>
                    {e.link && (
                      <a href={e.link} target="_blank" rel="noreferrer">
                        {e.buttonName || 'Check out the Certificate'}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <section id="experience" className="services">
        <div className="container">
          <div className="section-title" style={{ textAlign: 'left' }}>
            <h2>Experience</h2>
          </div>
          <div className="row">
            {experience.map(ex => {
              const isPresent = ex.date?.toLowerCase().includes('present');
              return (
                <div key={ex.id} className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
                  <div className="experience-item icon-box" style={{ textAlign: 'left' }}>
                    {ex.image && <img loading="lazy" src={ex.image} alt="Company Logo" style={{ height: '50px', objectFit: 'contain', marginBottom: '10px' }} />}
                    <h4><span style={{ color: '#12d640' }}>{ex.company}</span></h4>
                    <h5
                      style={
                        isPresent
                          ? {
                              background: '#12d640',
                              color: '#010e1b',
                              display: 'inline-block',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontWeight: 700,
                              marginTop: '5px',
                            }
                          : {}
                      }
                    >
                      {ex.date}
                    </h5>
                    <p><em>{ex.role}</em></p>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                      {ex.description && ex.description.split('\n').map((line: string, i: number) => (
                        <li key={i}>&#8226; {line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
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
                      <img loading="lazy"  key={i} src={img} alt="Skill icon" style={{ height: '40px', width: 'auto' }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Dynamic React Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-title">
            <h2>Projects</h2>
          </div>
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                {[ { name: 'All', filter: '*' }, ...projectCategories ].map(f => {
                  const val = f.filter === '*' ? '*' : '.' + f.filter;
                  return (
                    <li key={f.id || 'all'} onClick={() => setActiveFilter(val)}
                      className={activeFilter === val ? 'filter-active' : ''}
                      style={{ cursor: 'pointer', textTransform: 'capitalize' }}>
                      {f.name}
                    </li>
                  );
                })}
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
                  const popupImgs = imgs.length > 1 ? imgs.slice(1) : imgs;
                  return (
                    <div key={p.id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        onClick={() => openProject({ ...p, images: popupImgs })}
                        style={{
                          borderRadius: '12px', overflow: 'hidden', position: 'relative',
                          cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                          background: '#041627',
                        }}
                        onMouseEnter={e => { const ov = e.currentTarget.querySelector('.card-overlay') as HTMLElement; if(ov) ov.style.opacity = '1'; }}
                        onMouseLeave={e => { const ov = e.currentTarget.querySelector('.card-overlay') as HTMLElement; if(ov) ov.style.opacity = '0'; }}
                      >
                        <img loading="lazy"  src={thumb} alt={p.title}
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
                          <p style={{ margin: 0, color: '#ccc', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {(() => {
                              const descHtml = p.description || getFallbackDescription(p.title || '') || '';
                              const plainDesc = descHtml.replace(/<[^>]+>/g, '').trim();
                              return plainDesc || 'Click to view details';
                            })()}
                          </p>
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
            <div className="project-modal-body">

              {/* Left Gallery */}
              <div className="project-modal-gallery">
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
                  <img loading="lazy" 
                    src={selectedProject.images[galleryIndex]}
                    alt={selectedProject.title + ' ' + (galleryIndex + 1)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#010e1b' }}
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
                      <img loading="lazy"  key={i} src={img} alt={'thumb-' + i} onClick={() => setGalleryIndex(i)}
                        style={{ height: '56px', width: '80px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: i === galleryIndex ? '2px solid #12d640' : '2px solid transparent', flexShrink: 0 }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Info */}
              <div className="project-modal-info">
                {(() => {
                  const desc = selectedProject.description || getFallbackDescription(selectedProject.title || '');
                  return desc ? (
                    <div
                      className="project-desc-html"
                      dangerouslySetInnerHTML={{ __html: desc }}
                      style={{ color: '#ccc', fontSize: '14px', lineHeight: 1.7 }}
                    />
                  ) : (
                    <p style={{ color: '#555', fontSize: '13px', fontStyle: 'italic' }}>No description yet. Add one from the Admin panel.</p>
                  );
                })()}

                {selectedProject.techStack && (
                  <div>
                    <h6 style={{ color: '#12d640', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Tech Stack</h6>
                    <p style={{ color: '#ccc', fontSize: '14px', margin: 0 }}>{selectedProject.techStack}</p>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Floating Action Button for Live Demo */}
          {selectedProject.link && (
            <a href={selectedProject.link} target="_blank" rel="noreferrer"
              style={{
                position: 'absolute', bottom: '30px', right: '30px',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#12d640', color: '#010e1b', padding: '14px 28px',
                borderRadius: '50px', fontWeight: 700, fontSize: '16px',
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(18, 214, 64, 0.4)',
                transition: 'transform 0.2s', zIndex: 10000
              }}>
              <i className="bx bx-link-external" style={{ fontSize: '20px' }}></i> {selectedProject.buttonLabel || 'Open Live Demo'}
            </a>
          )}
        </div>
      )}

    </ParticlesProvider>
  );
}

export default Home;
