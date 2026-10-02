
import React from 'react';

const rawHtml = `
<main id="main">

      <div id="portfolio-details" class="portfolio-details">
        <div class="container">
  
          <div class="row">
  
            <div class="col-lg-12 portfolio-info">
              <br>
              <h2 style="color:#12d640">Sky Light Cinema Web Application</h2>
              <ul>
                <li><strong>Tech Stack</strong>: MERN stack (MongoDB, Express.js, React.js, Node.js)</li>
                <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/SKY-LIGHT-CINEMA" target="_blank">Project Link</a></li>
              </ul>

                <p>A web-based platform built with the <strong>MERN stack</strong> to streamline cinema operations, featuring:</p>
                <ul>
                    <li>Sales, Staff, and Inventory Management</li>
                    <li>Showtime Scheduling</li>
                    <li>Financial and Payment Processing</li>
                    <li>Delivery & Supplier Management</li>
                </ul>
                <p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>
           
            </div>
  
          </div>
  
        </div>
      </div><!-- End Portfolio Details -->
    
</main>
`;

function SlcProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default SlcProject;
