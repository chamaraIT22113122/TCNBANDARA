
import React from 'react';

const rawHtml = `
<main id="main">

  <div id="portfolio-details" class="portfolio-details">
    <div class="container">

      <div class="row">
        <div class="col-lg-12 portfolio-info">
          <br>
          <h2 style="color:#12d640">Social Media Posts</h2>

          <li>Tech Stack: <strong>Illustrator,Photoshop,Canva</strong></li>
          <li>Tech Stack: <strong>Photoshop</strong></li>
          <li>Tech Stack: <strong></strong></li>
          
        </div>
      </div>

      <!-- Responsive Image Gallery -->
      <div class="row mt-4">
        <h3>Gallery</h3>

        <!-- Image 1 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/1.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 2 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/2.5.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 3 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/2.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 4 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/3.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 5 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/3.5.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 6 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/4.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 7 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/5.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 8 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/6.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 9 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/7.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 10 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/8.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 11 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/9.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 12 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/10.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 13 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/11.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 14 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/12.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 15 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/13.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 16 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/14.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 17 -->
        <div class="col-lg-4 col-md-6 portfolio-item">
          <img src="../assets/img/project/Social media post/15.png" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 18 -->
        <div class="col-lg-4 col-md-6 portfolio-item">      
          <img src="../assets/img/project/Social media post/16.png" class="img-fluid" alt="" onclick="openModal(this)"> 
        </div>

        <!-- Image 19 -->
        <div class="col-lg-4 col-md-6 portfolio-item">    
          <img src="../assets/img/project/Social media post/20.jpg" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 20 -->
        <div class="col-lg-4 col-md-6 portfolio-item">    
          <img src="../assets/img/project/Social media post/18.jpg" class="img-fluid" alt="" onclick="openModal(this)"> 
        </div>

        <!-- Image 21 -->
        <div class="col-lg-4 col-md-6 portfolio-item">    
          <img src="../assets/img/project/Social media post/19.jpg" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 22 -->
        <div class="col-lg-4 col-md-6 portfolio-item">    
          <img src="../assets/img/project/Social media post/17.jpg" class="img-fluid" alt="" onclick="openModal(this)"> 
        </div>

        <!-- Image 21 -->
        <div class="col-lg-4 col-md-6 portfolio-item">    
          <img src="../assets/img/project/Social media post/21.jpg" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

        <!-- Image 22 -->
        <div class="col-lg-4 col-md-6 portfolio-item">    
          <img src="../assets/img/project/Social media post/22.jpg" class="img-fluid" alt="" onclick="openModal(this)">
        </div>

      </div>
    </div>
  </div>

</main>
`;

function SocialmProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default SocialmProject;
