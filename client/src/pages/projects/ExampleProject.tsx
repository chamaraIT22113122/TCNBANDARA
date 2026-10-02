
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            <h2 style="color:#12d640">Resume Section Classifier</h2>

            <ul>
              <li><strong>Tech Stack</strong>: Figma</li>
              <li><strong>Figma Dev Mode Link</strong>: <a href="https://www.figma.com/design/Wg4f0gaqJm2UyWmSNIF9jv/supplier-ui?node-id=0-1&m=dev&t=B7gZ6c3xY4cQAPPL-1" target="_blank">Project Link</a></li>
            </ul>
            
            <p>The Supplier Manager Dashboard UI Design created in Figma is an intuitive interface that helps manage suppliers efficiently. It provides key insights and easy access to supplier information, performance metrics, and quick actions.</p>
            <ul>.
              <li>Supplier Overview: Displays essential supplier metrics.</li>
              <li>Supplier List: Shows detailed supplier information.</li>
              <li>Search & Filter: Quickly locate suppliers based on criteria.</li>
              <li>Performance Analytics: Visual graphs for analyzing supplier data.</li>
              <li>Quick Actions: Add, update, or delete supplier records.</li>
              <li>Notifications & Alerts: Stay updated on important supplier activities.</li>
              <li>Responsive Design: Optimized for desktop and mobile.</li>
            </ul>
            <p>This design ensures a seamless, user-friendly experience for managing supplier-related tasks.</p>
            
          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function ExampleProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default ExampleProject;
