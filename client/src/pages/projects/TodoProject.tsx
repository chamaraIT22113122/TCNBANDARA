
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            <h2 style="color:#12d640">To-Do App</h2>
            <ul>
              <li><strong>Tech Stack</strong>: Android Studio and Kotlin</li>
              <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/To_Do_List_APP" target="_blank">Project Link</a></li>
            </ul>
            
            <ul>
              <li>Create, manage, and delete tasks to stay on top of your priorities.</li>
              <li>Set reminders to never miss a deadline or important event.</li>
              <li>Categorize tasks with labels or colors for easy organization.</li>
              <li>Track your progress with a simple and clean user interface.</li>
             
            </ul>
            <p>Perfect for students, professionals, or anyone who wants to boost productivity and stay organized on the go.</p>
            
          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function TodoProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default TodoProject;
