import React from 'react';

const experienceData = [
  {
    role: "Intern Designer",
    company: "Bitumix (Private) Limited",
    date: "July 2025 - Present",
    points: [
      "Designed and delivered hands-on training sessions in graphic design tools such as Adobe Photoshop, Illustrator, and Canva.",
      "Provided technical support and creative guidance to students across various digital design and branding projects.",
      "Improved workflow in the design lab by organizing resources and implementing efficient design review processes."
    ]
  },
  {
    role: "Software Developer",
    company: "Cybernetic Software Solution",
    date: "January 2025 - February 2025",
    points: [
      "Designed and delivered hands-on training sessions in graphic design tools.",
      "Collaborated with faculty to integrate design thinking into the curriculum, enhancing the overall educational experience.",
      "Taught WordPress from the ground up at Cybernetic Academy, covering everything from installation to custom theme development."
    ]
  },
  {
    role: "Computer Lab Instructor",
    company: "ESOFT Metro Campus Anuradhapura",
    date: "February 2021 - August 2021",
    points: [
      "Conducted hands-on training sessions and provided technical support to students across various computer science and IT-related subjects.",
      "Managed and maintained computer lab equipment, ensuring optimal functionality for over 100 users daily.",
      "Streamlined lab operations and exams, improving resource utilization and user satisfaction."
    ]
  },
  {
    role: "Freelance Developer & Designer",
    company: "Independent Contractor",
    date: "September 2021 - Present",
    points: [
      "Delivered tailored web and mobile solutions for diverse clients.",
      "Designed branding materials, including logos and social media assets, to strengthen clients' online presence.",
      "Implemented RESTful APIs to enhance system performance and enable seamless communication between microservices."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Experience</span>
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="relative pl-8 md:pl-0">
              <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-gray-800 -translate-x-1/2"></div>
              
              <div className={`md:flex items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5 h-5 absolute left-1/2 -translate-x-1/2 rounded-full bg-green-500 border-4 border-gray-950 z-10 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                
                <div className={`w-full md:w-[45%] bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-colors ${idx % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <h4 className="text-green-400 font-medium mb-2">{exp.company}</h4>
                  <p className="text-gray-500 text-sm mb-4">{exp.date}</p>
                  <ul className={`text-sm text-gray-400 space-y-2 ${idx % 2 !== 0 && 'md:flex md:flex-col md:items-end'}`}>
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className={`text-green-500 mr-2 ${idx % 2 !== 0 && 'md:hidden'}`}>•</span>
                        <span className="text-left">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
