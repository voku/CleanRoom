import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [active, setActive] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = ['Home', 'Clean Room', 'Claude Code', 'Open Source', 'Generator'];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-5 bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
      <a 
        href="#home"
        onClick={(e) => { 
          e.preventDefault(); 
          setActive('Home'); 
          const element = document.getElementById('home');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="flex items-center gap-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-4 rounded-lg"
        aria-label="Clean Room Prompt Generator Home"
      >
        <svg width="48" height="48" viewBox="0 0 120 120" className="shrink-0 transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
          <g transform="translate(15, 25)">
            <polygon points="0,30 30,10 30,50" fill="#D93846" />
            <polygon points="30,10 60,30 30,50" fill="#D65780" />
            <polygon points="30,10 60,-10 60,30" fill="#F4C430" />
            <polygon points="60,30 60,-10 90,10" fill="#52A474" />
            <polygon points="60,30 90,10 90,50" fill="#5C9E9A" />
            <polygon points="30,50 60,30 60,70" fill="#E2E2E2" />
          </g>
        </svg>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-slate-800 leading-none tracking-tight group-hover:text-slate-900 transition-colors">Clean Room</span>
          <span className="text-[11px] tracking-[0.2em] text-slate-500 uppercase font-semibold mt-1">Prompt Generator</span>
        </div>
      </a>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-10 text-[15px] text-slate-600">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={(e) => {
              e.preventDefault();
              setActive(item);
              const element = document.getElementById(item.toLowerCase().replace(/\s+/g, '-'));
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-current={active === item ? 'page' : undefined}
            className={`group relative py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-4 rounded-sm px-1 ${
              active === item ? 'text-slate-900 font-medium' : 'hover:text-slate-900'
            }`}
          >
            {item}
            <span 
              className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-[#5C9E9A] transform origin-left transition-transform duration-300 ease-out ${
                active === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="text-slate-600 hover:text-slate-900 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] rounded-md transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg md:hidden flex flex-col py-4 px-8 gap-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => {
                e.preventDefault();
                setActive(item);
                setIsMobileMenuOpen(false);
                const element = document.getElementById(item.toLowerCase().replace(/\s+/g, '-'));
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-current={active === item ? 'page' : undefined}
              className={`py-3 text-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] rounded-md px-4 ${
                active === item 
                  ? 'text-[#5C9E9A] font-bold bg-[#5C9E9A]/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
