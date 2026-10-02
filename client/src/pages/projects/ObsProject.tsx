
import React from 'react';

const rawHtml = `
<main id="main">

      <div id="portfolio-details" class="portfolio-details">
        <div class="container">
  
          <div class="row">
  
            <div class="col-lg-12 portfolio-info">
              <br>
              
              <h2 style="color:#12d640">Online Book Store</h2>
<ul>
  <li><strong>Tech Stack</strong>: HTML, PHP, CSS, and JavaScrip</li>
  <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Online-Book-Store" target="_blank">Project Link</a></li>
</ul>

<p>A simple and elegant platform built using HTML and CSS, designed for book lovers. It offers a visually appealing interface with essential features for browsing and searching books.</p>
<ul>
  <li>Home Page: Showcases featured books and categories.</li>
  <li>Search Functionality: Search books by title, author, or genre.</li>
  <li>Responsive Design: Works seamlessly on desktop and mobile devices.</li>
  <li>Book Details Page: Displays book descriptions, authors, and prices.</li>
  <li>Categories & Filters: Organize books by genre or popularity for easier navigation.</li>
</ul>
<p>It automates tasks, enhancing efficiency and simplifying daily operations. <strong>GitHub</strong> is used for version control, ensuring smooth collaboration.</p>

            </div>
  
          </div>
  
        </div>
      </div><!-- End Portfolio Details -->
    
</main>
`;

function ObsProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default ObsProject;
