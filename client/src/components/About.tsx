import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 relative border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">About Me</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl group">
              <div className="absolute inset-0 bg-green-500/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src="/assets/dp.jpg" alt="Chamara Nuwan Bandara" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I am a passionate and dedicated developer with a strong foundation in web development, UI/UX design, app development, and graphic design. My journey into these fields is driven by a deep curiosity to create seamless, user-friendly digital experiences. I leverage my technical skills and design sensibilities to craft responsive websites, intuitive app interfaces, and visually engaging graphics that not only function flawlessly but also captivate users.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <ul className="space-y-3">
                  <li><span className="text-green-500 font-semibold mr-2">Birthday:</span> <span className="text-gray-300">06 April 2002</span></li>
                  <li><span className="text-green-500 font-semibold mr-2">Phone:</span> <span className="text-gray-300">+94 70-2481-691</span></li>
                </ul>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <ul className="space-y-3">
                  <li><span className="text-green-500 font-semibold mr-2">City:</span> <span className="text-gray-300">Malabe, SL</span></li>
                  <li><span className="text-green-500 font-semibold mr-2">Email:</span> <span className="text-gray-300">cn1120693@gmail.com</span></li>
                </ul>
              </div>
            </div>
            
            <a href="/Vcard.html" target="_blank" className="inline-block px-6 py-3 bg-gray-800 hover:bg-green-600 text-white rounded-lg transition-colors border border-gray-700 hover:border-green-500 font-medium">
              Get vCard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
