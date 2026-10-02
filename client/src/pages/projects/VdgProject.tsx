
import React from 'react';

const rawHtml = `
<main id="main">

    <div id="portfolio-details" class="portfolio-details">
      <div class="container">

        <div class="row">

          <div class="col-lg-12 portfolio-info">
            <br>
            <h2 style="color:#12d640">Video Description Generator</h2>

            <ul>
              <li><strong>Tech Stack</strong>: Tensorflow, NLTK, Keras, Python, Opencv</li>
            </ul>

            <p>
              Project aims at generating a description of a given video. The steps include Object detection in video frames using Convolutional Neural Network followed by generating text for each frame using a recurrent neural network and thereby generating tags with the help of natural language processing.            
            </p>
          </div>

        </div>

      </div>
    </div><!-- End Portfolio Details -->
  
</main>
`;

function VdgProject() {
    return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}

export default VdgProject;
