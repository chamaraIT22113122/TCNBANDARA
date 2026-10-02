
import React from 'react';

const rawHtml = `
<main id="main">

      <div id="portfolio-details" class="portfolio-details">
        <div class="container">
  
          <div class="row">
  
            <div class="col-lg-12 portfolio-info">
              <br>
              <h2 style="color:#12d640">JARVIS Virtual Assistant AI</h2>
              <ul>
                <li><strong>Tech Stack</strong>: Python</li>
                <li><strong>Github URL</strong>: <a href="https://github.com/chamaraIT22113122/JARVIS_AI" target="_blank">Project Link</a></li>
              </ul>
              <p>The Jarvis Virtual Assistant AI System is a Python-based virtual assistant that automates tasks and enhances user experience through voice recognition, natural language processing (NLP), and machine learning.</p>
              <ul>
                <li>Voice Commands: Recognizes commands and responds with speech.</li>
                <li>Task Automation: Sets reminders, sends emails, fetches weather, and more.</li>
                <li>NLP: Enables conversational interactions.</li>
                <li>Web Scraping: Retrieves real-time data (news, stock prices).</li>
                <li>System Control: Manages system functions like opening apps and restarting.</li>
                <li>Customizable & Extensible: Easily customizable with new features.</li>
               
              </ul>
              <p>Jarvis streamlines daily tasks, making it a powerful assistant for users.</p>
              
            </div>
  
          </div>
  
        </div>
      </div><!-- End Portfolio Details -->
    
</main>
`;

function AiProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default AiProject;
