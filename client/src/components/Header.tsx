import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/80 backdrop-blur-md shadow-lg border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">
          TCN <span className="text-green-500">Bandara</span>
        </a>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {['Home', 'About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="https://drive.google.com/file/d/1Xw7PZjy3yXD_wo_YKTA7428sq6h_7cB0/view?usp=sharing" 
            target="_blank" 
            rel="noreferrer"
            className="text-gray-300 hover:text-green-400 transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
