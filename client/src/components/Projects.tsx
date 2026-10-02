import React, { useState } from 'react';

const projects = [
  { category: 'Web-App', title: 'SKY-LIGHT-CINEMA_Web_APP', img: '/assets/img/project/mo.jpg' },
  { category: 'Web-App', title: 'Blood-Donation-System_Web_APP', img: '/assets/img/project/blood.jpg' },
  { category: 'Web-App', title: 'Online-Book-Store_Web_APP', img: '/assets/img/project/bs.jpg' },
  { category: 'Web-App', title: 'Online-Stock-Management-System_Web_APP', img: '/assets/img/project/stock.jpg' },
  { category: 'Mobile', title: 'To_Do_List_APP', img: '/assets/img/project/todo.jpg' },
  { category: 'Mobile', title: 'MediMingle_Mobile_APP', img: '/assets/img/project/app.jpg' },
  { category: 'UX/UI Design', title: 'Supplier Manager Dashboard UI', img: '/assets/img/project/blog.jpg' },
  { category: 'Graphic Design', title: 'Social Media Posts', img: '/assets/img/project/SMP.png' },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Web-App', 'Mobile', 'UX/UI Design', 'Graphic Design'];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 relative border-t border-gray-800 bg-gray-900/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Projects</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
              <div className="aspect-video overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-green-400 text-xs font-bold mb-1 uppercase tracking-wider">{p.category}</p>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
