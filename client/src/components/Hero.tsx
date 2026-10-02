import React from 'react';
import Globe from './lightswind/globe';
import { BorderBeam } from './lightswind/border-beam';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <Globe className="opacity-50" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="relative inline-block mb-4 p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
          <BorderBeam size={200} duration={12} delay={9} />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
            Hello, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              Chamara Nuwan Bandara
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light mb-8">
            Software Engineer | UI/UX Designer | Graphic Designer
          </p>
          
          <div className="flex justify-center gap-4">
            <a href="#projects" className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium transition-all shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium transition-all border border-gray-700">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
