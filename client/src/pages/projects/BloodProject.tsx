
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            
            <h2 style="color:#12d640">Blood Donation System</h2>
<ul>
  <li><strong>Tech Stack</strong>: HTML, PHP, CSS, and JavaScrip,MySQL</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Blood-Donation-System" target="_blank">Project Link</a></li>
</ul>

<p>A user-friendly platform built with PHP to streamline the blood donation process, catering to donors, administrators, and managers.</p>
<ul>
  <li>User Registration: Quick sign-up with access to donation details and nearby centers.</li>
  <li>Donation Management: Schedule, manage appointments, and provide feedback.</li>
  <li>Administrative Panel: Manage users, appointments, staff, and social media content.</li>
  <li>Managerial Operations: Generate reports and oversee finances for system efficiency.</li>
</ul>
<p>Efficient workflows ensure seamless interaction across roles, making the app a valuable tool for life-saving contributions.</p>

            
          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function BloodProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default BloodProject;
