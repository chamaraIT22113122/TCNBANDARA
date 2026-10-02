
import React from 'react';

const rawHtml = `
<main id="main">

  <div id="portfolio-details" class="portfolio-details">
    <div class="container">

      <div class="row">
        <div class="col-lg-12 portfolio-info">
          <br>
          <h2 style="color:#12d640">Oversized T Shirt Design</h2>

          
          <p>T Shirt designs made for <a href="https://www.instagram.com/evoke.outfit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">evoke.outfit</a></p>
          <li>Tech Stack: <strong>Photoshop</strong></li>
          
        </div>
      </div>

      <!-- Responsive Image Gallery -->
      <div class="row mt-4">
        <h3>Gallery</h3>

        <!-- Image 1 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/10.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 2 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/11.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 3 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/13.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 4 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/14.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 5 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/15.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 6 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/16.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 7 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/17.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 8 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/18.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 9 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/19.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 10 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/20.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 11 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/21.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 12 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/22.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 13 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/23.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 14 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/24.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 15 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/25.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 16 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/otshirt/26.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

      </div>
    </div>
  </div>

</main>
`;

function TshirtProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default TshirtProject;
