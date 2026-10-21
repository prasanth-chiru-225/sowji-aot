import React, { useState, useEffect } from 'react';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { FileText, BookOpen, Camera, Mail, Gift, RefreshCw, Menu, X } from 'lucide-react';

interface NavigationProgressProps {
  onReplayIntro: () => void;
}

export const NavigationProgress: React.FC<NavigationProgressProps> = ({ onReplayIntro }) => {
  const [activeSection, setActiveSection] = useState<string>('dossier-section');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Determine active section
      const sections = [
        'dossier-section',
        'chapters-section',
        'gallery-section',
        'secret-letter-section',
        'climax-section',
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'dossier-section', label: 'Dossier', icon: FileText },
    { id: 'chapters-section', label: 'Story', icon: BookOpen },
    { id: 'gallery-section', label: 'Memories', icon: Camera },
    { id: 'secret-letter-section', label: 'Secret Letter', icon: Mail },
    { id: 'climax-section', label: '24 October', icon: Gift },
  ];

  return (
    <>
      {/* Top Fixed Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-titan-dark/85 backdrop-blur-md border-b border-wall-sand/20 transition-all duration-300">
        {/* Scroll Progress Line */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-scout-cloak via-gold-warm to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Crest */}
          <div 
            onClick={() => scrollTo('dossier-section')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <WingsOfFreedomIcon size={28} glow />
            <div className="flex flex-col">
              <span className="font-serif font-black text-sm sm:text-base tracking-wider text-wall-parchment group-hover:text-gold-warm transition-colors">
                BEYOND THE WALLS
              </span>
              <span className="font-mono text-[9px] text-wall-sand/60 -mt-1 tracking-widest">
                RECIPIENT: SOWJI
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-scout-emerald/80 text-gold-warm border border-gold-warm/60 shadow-sm'
                      : 'text-wall-sand hover:text-wall-parchment hover:bg-titan-stone/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Replay Intro */}
            <button
              onClick={onReplayIntro}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded border border-wall-sand/20 hover:border-gold-warm/60 bg-titan-stone/50 hover:bg-titan-stone text-[11px] font-mono text-wall-sand hover:text-gold-warm transition-colors"
              title="Replay opening cinematic transmission"
            >
              <RefreshCw className="w-3 h-3" />
              <span>REPLAY INTRO</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md bg-titan-stone/80 text-wall-sand hover:text-wall-parchment focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-titan-stone/95 border-b border-wall-sand/30 px-4 py-4 space-y-2 backdrop-blur-xl animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md font-mono text-sm tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-scout-emerald text-gold-warm border border-gold-warm/50 font-bold'
                      : 'text-wall-sand hover:bg-titan-slate/50 hover:text-wall-parchment'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-wall-sand/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded border border-wall-sand/30 text-xs font-mono text-wall-sand"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>REPLAY INTRO CINEMATIC</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
