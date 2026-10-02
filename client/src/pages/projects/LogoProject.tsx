
import React from 'react';

const rawHtml = `
<main id="main">

  <div id="portfolio-details" class="portfolio-details">
    <div class="container">

      <div class="row">
        <div class="col-lg-12 portfolio-info">
          <br>
          <h2 style="color:#12d640">Logo Design</h2>

          
         
          <li>Tech Stack: <strong>Illustrator</strong></li>
          
        </div>
      </div>

      <!-- Responsive Image Gallery -->
      <div class="row mt-4">
        <h3>Gallery</h3>

        <!-- Image 1 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/logo/Artboard 1.png" class="img-fluid" alt="Screenshot 1" onclick="openModal(this)">
        </div>

        <!-- Image 2 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/logo/l2.jpg" class="img-fluid" alt="Screenshot 2" onclick="openModal(this)">
        </div>

        

      </div>
    </div>
  </div>

</main>
`;

function LogoProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default LogoProject;
