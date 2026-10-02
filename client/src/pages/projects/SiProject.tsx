
import React from 'react';

const rawHtml = `
<main id="main">

      <div id="portfolio-details" class="portfolio-details">
        <div class="container">
  
          <div class="row">
  
            <div class="col-lg-12 portfolio-info">
              <br>
              <h2 style="color:#12d640">Skills-International</h2>
              <ul>
                <li><strong>Tech Stack</strong>: C#</li>
                <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/Skills-International" target="_blank">Project Link</a></li>
              </ul>
              <p>The Skills International Student Registration System is a software solution developed in C# using Microsoft Visual Studio and connected to an SQL Server database. It provides a user-friendly platform for managing student registration at Skills International School.</p>
              <ul>
                <li><b>Login Form:</b> Includes username, password fields, a clear button, and login validation for admin users with error messages for incorrect credentials.</li>
                <li><b>Student Registration Form:</b> Allows entry and management of student details, including basic, contact, and parent information. Features options to register, update, and delete records, along with confirmation messages.</li>
                <li><b>Search Functionality: Provides</b> search functionality using a dropdown list of registration numbers for easy access to student records.</li>
                
               
              </ul>
              <p>The system simplifies student registration and management, ensuring efficient and streamlined operations for the school.

              
            </div>
  
          </div>
  
        </div>
      </div><!-- End Portfolio Details -->
    
</main>
`;

function SiProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default SiProject;
