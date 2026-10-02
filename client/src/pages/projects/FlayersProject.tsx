
import React from 'react';

const rawHtml = `
<main id="main">

  <div id="portfolio-details" class="portfolio-details">
    <div class="container">

      <div class="row">
        <div class="col-lg-12 portfolio-info">
          <br>
          <h2 style="color:#12d640">Flayers Design</h2>

          
          
          <li>Tech Stack: <strong>Photoshop</strong></li>
          
        </div>
      </div>

      <!-- Responsive Image Gallery -->
      <div class="row mt-4">
        <h3>Gallery</h3>

        <!-- Image 1 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/Peony cake deco flayr 1.jpg" class="img-fluid" alt="Screenshot 1" onclick="openModal(this)">
        </div>

        <!-- Image 2 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/malshan JBL.jpg" class="img-fluid" alt="Screenshot 2" onclick="openModal(this)">
        </div>

        <!-- Image 3 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/akka 1.jpg" class="img-fluid" alt="Screenshot 3" onclick="openModal(this)">
        </div>

        <!-- Image 4 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/akka 2.jpg" class="img-fluid" alt="Screenshot 4" onclick="openModal(this)">
        </div>

        <!-- Image 5 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/evoke size chart.jpg" class="img-fluid" alt="Screenshot 5" onclick="openModal(this)">
        </div>

        <!-- Image 6 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/Elitebook 840 g2 touch.jpg" class="img-fluid" alt="Screenshot 6" onclick="openModal(this)">
        </div>

        <!-- Image 7 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/flayer/Elitebook 850 g3.jpg" class="img-fluid" alt="Screenshot 7" onclick="openModal(this)">
        </div>

     
      </div>
    </div>
  </div>

</main>
`;

function FlayersProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default FlayersProject;
