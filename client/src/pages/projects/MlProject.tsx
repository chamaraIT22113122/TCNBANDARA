
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            <h2 style="color:#12d640">Medimingle Healthcare App</h2>

            <ul>
              <li><strong>Tech Stack</strong>: Android Studio and Kotlin</li>
              <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/MediMingle_Mobile_APP" target="_blank">Project Link</a></li>
            </ul>
            <p>Medimingle is an innovative healthcare app that simplifies finding and consulting specialist doctors. Patients can search for doctors by specialty, create profiles, and schedule appointments seamlessly.</p>
            <ul>
              <li>Doctor Search: Find specialists by specialty.</li>
              <li>Profile Creation: Patients can add and manage their profiles.</li>
              <li>Appointment Scheduling: Book appointments directly through the app.</li>
              <li>Reminders: Get personalized notifications for upcoming appointments.</li>
             
            </ul>
            <p>Medimingle aims to enhance patient experience by reducing wait times and offering a user-friendly interface for a smooth and hassle-free appointment process.

            </p>
            
          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function MlProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default MlProject;
