
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            <h2 style="color:#12d640">Online Stock Management System</h2>
<ul>
  <li><strong>Tech Stack</strong>: HTML, CSS, PHP, javascript and MySQL</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Stock-Management-System" target="_blank">Project Link</a></li>
</ul>

<ul>
  <li>Inventory Management: Track and update stock levels and product categories.</li>
  <li>Supplier Management: Store and manage supplier details.</li>
  <li>Sales & Order Tracking: Monitor sales and generate reports.</li>
  <li>Real-Time Updates: Accurate, up-to-date stock and sales information.</li>
  <li>Admin Panel: Full access for admins to manage products, suppliers, and users.</li>
</ul>
<p>An ideal solution for small to medium-sized businesses to simplify stock management.</p>

          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function SmProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default SmProject;
