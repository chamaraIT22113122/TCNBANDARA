import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Skills</span>
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Languages & Databases</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {['Python', 'Java', 'HTML5', 'CSS3', 'MySQL', 'PostgreSQL', 'MongoDB'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Frameworks</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {['Node.js', 'Bootstrap', 'React.js', 'Kotlin'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Tools & Graphic Design</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {['Git', 'AWS', 'Google Cloud', 'Photoshop', 'Illustrator', 'Canva', 'Figma', 'Premiere Pro'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
