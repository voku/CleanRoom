import React, { useState, useEffect, useRef } from 'react';
import Article from './components/Article';
import PromptGenerator from './components/PromptGenerator';
import Navigation from './components/Navigation';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      
      if (isDesktop) {
        // On desktop, the article container scrolls independently
        const { scrollTop, scrollHeight, clientHeight } = articleRef.current;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)) || 0);
      } else {
        // On mobile, the window scrolls and the article is at the top
        const { top, height } = articleRef.current.getBoundingClientRect();
        const navHeight = 89; // Approximate height of the sticky navigation
        const scrolled = navHeight - top;
        const scrollable = height - window.innerHeight + navHeight;
        
        if (scrollable > 0) {
          const progress = (scrolled / scrollable) * 100;
          setScrollProgress(Math.min(100, Math.max(0, progress)) || 0);
        } else {
          setScrollProgress(100);
        }
      }
    };

    // Listen to both window and container scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    const container = articleRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#5C9E9A]/30 flex flex-col">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full lg:w-1/2 h-1 z-[60] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-[#5C9E9A] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navigation />
      <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 flex-1 lg:overflow-hidden">
        
        {/* Left Column: Article */}
        <div 
          ref={articleRef}
          className="lg:h-[calc(100vh-89px)] lg:overflow-y-auto p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-slate-100 custom-scrollbar bg-white relative"
        >
          {/* Decorative background triangles */}
          <div className="absolute top-32 right-8 opacity-30 pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 100 86.6"><polygon points="0,86.6 50,0 100,86.6" fill="#F4C430"/></svg>
          </div>
          <div className="absolute top-[40%] left-8 opacity-30 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 86.6"><polygon points="0,0 100,0 50,86.6" fill="#E2E2E2"/></svg>
          </div>
          <div className="absolute bottom-32 right-16 opacity-20 pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 100 86.6"><polygon points="0,86.6 50,0 100,86.6" fill="#5C9E9A"/></svg>
          </div>

          <div className="max-w-2xl mx-auto relative z-10">
            <Article />
          </div>
        </div>

        {/* Right Column: Prompt Generator */}
        <div className="lg:h-[calc(100vh-89px)] bg-slate-50 p-8 md:p-16 lg:p-24 lg:overflow-y-auto flex items-center justify-center relative min-h-screen lg:min-h-0 custom-scrollbar">
          <div className="w-full max-w-xl h-[800px] relative z-10">
            <PromptGenerator />
          </div>
        </div>

      </div>
    </div>
  );
}
