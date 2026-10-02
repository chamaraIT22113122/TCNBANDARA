import React from 'react';

const educationData = [
  {
    title: "BSc (Hons) in Information Technology - Specialising in Software Engineering",
    date: "October 2021 - Present",
    school: "SLIIT",
    image: "/assets/img/education/SLIIT.jpg",
    link: "https://www.sliit.lk/computing/programmes/software-engineering-degree/"
  },
  {
    title: "Diploma in Information Technology (Level 3)",
    date: "July 2018 - July 2019",
    school: "IDM",
    image: "/assets/img/education/IDM.jpg"
  },
  {
    title: "General Certificate of Education (Advanced Level)",
    date: "February 2021/2022",
    school: "Tech Institute",
    image: "/assets/img/education/GCE.jpg"
  },
  {
    title: "General Certificate of Education (Ordinary Level)",
    date: "December 2018",
    school: "School",
    image: "/assets/img/education/GCE.jpg"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 relative border-t border-gray-800 bg-gray-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Education</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <div key={idx} className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-colors flex flex-col md:flex-row gap-6 items-center md:items-start group">
              <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 p-2 border border-gray-800">
                <img src={edu.image} alt={edu.school} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{edu.title}</h3>
                <p className="text-green-500 text-sm font-medium mb-3">{edu.date}</p>
                {edu.link && (
                  <a href={edu.link} target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white underline">View Details</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
