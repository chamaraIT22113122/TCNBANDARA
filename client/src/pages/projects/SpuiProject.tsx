
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            <h2 style="color:#12d640">Vehicle Service Station Mobile App UI Design</h2>

            <ul>
              <li><strong>Tech Stack</strong>: Figma</li>
              <li><strong>Figma Dev Mode Link</strong>: <a href="https://www.figma.com/design/wo5oPcKfk60kLYcNiERmjX/Vehicle-Service-Station?node-id=0-1&m=dev&t=gSddNk3KxrjbUO3K-1" target="_blank">Project Link</a></li>
            </ul>
            
            <p>The Vehicle Service Station with Spare Parts Mobile App UI Design created in Figma offers a seamless user experience for booking vehicle services and purchasing spare parts.</p>
            <ul>.
              <li>Service Booking: Schedule services and select time slots.</li>
              <li>Spare Parts Catalog: Browse spare parts with details and pricing.</li>
              <li>Service History: View past services and repairs.</li>
              <li>Search & Filter: Find services and parts easily.</li>
              <li>Real-Time Updates: Notifications for appointments and parts delivery.</li>
              <li>User Profile: Manage personal and vehicle details.</li>
              <li>Ratings & Reviews: Rate services and parts.</li>
              <li>Responsive Design: Optimized for mobile.</li>
            </ul>
            <p>This design focuses on convenience and simplicity, ensuring a smooth mobile experience for managing vehicle services and spare parts.

            </p>
            
          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function SpuiProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default SpuiProject;
