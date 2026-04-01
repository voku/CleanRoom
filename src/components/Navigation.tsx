import React, { useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import type {Language} from '../types';

type NavigationProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
};

const copy = {
  en: {
    siteSubtitle: 'Guide & Commentary',
    navItems: [
      {id: 'home', label: 'Home'},
      {id: 'clean-room', label: 'Clean Room'},
      {id: 'claude-code', label: 'Claude Code'},
      {id: 'open-source', label: 'Open Source'},
      {id: 'generator', label: 'Prompt Generator?'},
    ],
    contribute: 'Contribute',
    contributeMobile: 'Contribute on GitHub',
    homeAriaLabel: 'Clean Room home',
    closeMenu: 'Close navigation menu',
    openMenu: 'Open navigation menu',
    languageLabel: 'Language',
  },
  de: {
    siteSubtitle: 'Artikel & Einordnung',
    navItems: [
      {id: 'home', label: 'Start'},
      {id: 'clean-room', label: 'Clean Room'},
      {id: 'claude-code', label: 'Claude Code'},
      {id: 'open-source', label: 'Open Source'},
      {id: 'generator', label: 'Prompt Generator?'},
    ],
    contribute: 'Mitmachen',
    contributeMobile: 'Auf GitHub mitmachen',
    homeAriaLabel: 'Startseite von Clean Room',
    closeMenu: 'Navigationsmenü schließen',
    openMenu: 'Navigationsmenü öffnen',
    languageLabel: 'Sprache',
  },
} satisfies Record<Language, {
  siteSubtitle: string;
  navItems: Array<{id: string; label: string}>;
  contribute: string;
  contributeMobile: string;
  homeAriaLabel: string;
  closeMenu: string;
  openMenu: string;
  languageLabel: string;
}>;

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
  }
}

function LanguageToggle({
  language,
  onLanguageChange,
}: Pick<NavigationProps, 'language' | 'onLanguageChange'>) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
      {(['en', 'de'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onLanguageChange(option)}
          aria-pressed={language === option}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-2 ${
            language === option
              ? 'bg-[#5C9E9A] text-white'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function Navigation({language, onLanguageChange}: NavigationProps) {
  const [active, setActive] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageCopy = copy[language];
  const contributeHref = 'https://github.com/voku/CleanRoom';

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-5 bg-white/95 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
      <a 
        href="#home"
        onClick={(e) => { 
          e.preventDefault(); 
          setActive('home');
          scrollToSection('home');
        }}
        className="flex items-center gap-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-4 rounded-lg"
        aria-label={languageCopy.homeAriaLabel}
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
          <span className="text-[11px] tracking-[0.2em] text-slate-500 uppercase font-semibold mt-1">{languageCopy.siteSubtitle}</span>
        </div>
      </a>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-[15px] text-slate-600">
        <div className="flex items-center gap-10">
          {languageCopy.navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActive(item.id);
                scrollToSection(item.id);
              }}
              aria-current={active === item.id ? 'page' : undefined}
              className={`group relative py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-4 rounded-sm px-1 ${
                active === item.id ? 'text-slate-900 font-medium' : 'hover:text-slate-900'
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-[#5C9E9A] transform origin-left transition-transform duration-300 ease-out ${
                  active === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {languageCopy.languageLabel}
            </span>
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          </div>
          <a
            href={contributeHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition-colors hover:border-[#5C9E9A] hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] focus-visible:ring-offset-4"
          >
            {languageCopy.contribute}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? languageCopy.closeMenu : languageCopy.openMenu}
          className="text-slate-600 hover:text-slate-900 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] rounded-md transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg md:hidden flex flex-col py-4 px-8 gap-2 animate-in slide-in-from-top-2 duration-200">
          <div className="mb-2 flex items-center justify-between rounded-md border border-slate-200 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {languageCopy.languageLabel}
            </span>
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          </div>
          {languageCopy.navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActive(item.id);
                setIsMobileMenuOpen(false);
                scrollToSection(item.id);
              }}
              aria-current={active === item.id ? 'page' : undefined}
              className={`py-3 text-lg transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A] rounded-md px-4 ${
                active === item.id
                  ? 'text-[#5C9E9A] font-bold bg-[#5C9E9A]/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={contributeHref}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-between rounded-md border border-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:border-[#5C9E9A] hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C9E9A]"
          >
            {languageCopy.contributeMobile}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </nav>
  );
}
