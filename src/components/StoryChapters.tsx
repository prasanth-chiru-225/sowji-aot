import React, { useState } from 'react';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { BIRTHDAY_CONFIG } from '../config/birthdayContent';
import { ChevronLeft, ChevronRight, Compass, Shield, Feather, Sparkles, BookOpen } from 'lucide-react';

export const StoryChapters: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const chapters = BIRTHDAY_CONFIG.chapters;
  const currentChapter = chapters[activeChapterIndex];

  const handleNext = () => {
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(prev => prev - 1);
    }
  };

  // Helper icons for chapters
  const getChapterIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Compass className="w-5 h-5 text-wall-sand" />;
      case 2:
        return <Sparkles className="w-5 h-5 text-gold-warm" />;
      case 3:
        return <Shield className="w-5 h-5 text-crimson-glow" />;
      case 4:
        return <Feather className="w-5 h-5 text-blue-400" />;
      case 5:
        return <WingsOfFreedomIcon size={20} />;
      default:
        return <BookOpen className="w-5 h-5 text-wall-sand" />;
    }
  };

  return (
    <section id="chapters-section" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-titan-stone border border-wall-sand/30 text-xs font-mono tracking-widest text-wall-sand mb-3">
          <WingsOfFreedomIcon size={16} />
          <span>EXPEDITION CHRONICLES // 5 CHAPTERS</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wall-parchment tracking-wide">
          THE FRIENDSHIP <span className="text-gold-warm">CHAPTERS</span>
        </h2>
        <p className="mt-2 text-wall-sand font-sans text-sm sm:text-base max-w-xl mx-auto">
          Five journal entries documenting an unbreakable bond beyond the walls.
        </p>
      </div>

      {/* Chapter Selection Tabs (Tactical Military Breadcrumb) */}
      <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {chapters.map((chap, idx) => (
          <button
            key={chap.id}
            onClick={() => setActiveChapterIndex(idx)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 border ${
              activeChapterIndex === idx
                ? 'bg-scout-emerald border-gold-warm text-gold-warm shadow-[0_0_15px_rgba(229,185,76,0.3)] font-semibold'
                : 'bg-titan-stone/80 border-wall-sand/20 text-wall-sand hover:text-wall-parchment hover:border-wall-sand/50'
            }`}
          >
            <span>{chap.roman}</span>
            <span className="hidden md:inline text-[11px] text-wall-sand/70">// {chap.title}</span>
          </button>
        ))}
      </div>

      {/* Active Chapter Card */}
      <div className="relative bg-gradient-to-b from-titan-stone via-titan-stone/95 to-titan-dark border border-wall-sand/30 rounded-xl p-6 sm:p-12 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
        {/* AoT Background Image for current chapter */}
        {currentChapter.backgroundImage && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <img
              src={currentChapter.backgroundImage}
              alt={currentChapter.title}
              className="w-full h-full object-cover opacity-15 filter contrast-125 brightness-75 scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-titan-dark via-titan-stone/85 to-titan-stone/75" />
          </div>
        )}

        {/* Subtle Watermark & Mood Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-scout-green/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Top Meta info */}
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-wall-sand/15 pb-4 mb-6">
            <div className="flex items-center gap-2">
              {getChapterIcon(currentChapter.id)}
              <span className="font-mono text-xs text-gold-warm tracking-widest font-bold">
                {currentChapter.roman}
              </span>
              <span className="text-wall-sand/50">•</span>
              <span className="font-mono text-xs text-wall-sand/70 uppercase">
                EXPEDITION LOG
              </span>
            </div>

            <div className="font-mono text-xs text-wall-sand/60">
              PROGRESS: {activeChapterIndex + 1} / {chapters.length}
            </div>
          </div>

          {/* Chapter Title & Subtitle */}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-wall-parchmentLight tracking-wide mb-2">
            {currentChapter.title}
          </h3>
          <p className="font-sans text-base sm:text-lg text-gold-warm/90 font-medium mb-6">
            {currentChapter.subtitle}
          </p>

          {/* Chapter Quote Pill */}
          <div className="p-3 sm:p-4 rounded-md bg-titan-dark/60 border-l-4 border-gold-warm mb-8">
            <p className="font-serif italic text-sm sm:text-base text-wall-parchment/90">
              “{currentChapter.quote}”
            </p>
          </div>

          {/* Lead Intro Line */}
          <p className="font-serif text-lg sm:text-xl font-semibold text-wall-parchment mb-4">
            {currentChapter.lead}
          </p>

          {/* Story Paragraphs */}
          <div className="space-y-4 font-sans text-sm sm:text-base text-wall-sand leading-relaxed">
            {currentChapter.story.map((paragraph, pIdx) => (
              <p key={pIdx}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Scout Quote Banner */}
          <div className="mt-8 pt-6 border-t border-wall-sand/15 flex items-center gap-3 text-xs sm:text-sm font-mono text-scout-bright italic">
            <WingsOfFreedomIcon size={18} />
            <span>{currentChapter.scoutQuote}</span>
          </div>
        </div>

        {/* Bottom Pagination & Nav Controls */}
        <div className="mt-10 pt-6 border-t border-wall-sand/15 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeChapterIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-xs sm:text-sm uppercase tracking-wider border transition-all duration-200 ${
              activeChapterIndex === 0
                ? 'opacity-30 border-wall-sand/10 cursor-not-allowed text-wall-sand/40'
                : 'border-wall-sand/30 hover:border-gold-warm bg-titan-dark text-wall-sand hover:text-gold-warm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREVIOUS</span>
          </button>

          {/* Page Indicators */}
          <div className="flex items-center gap-1.5">
            {chapters.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveChapterIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeChapterIndex === dotIdx
                    ? 'w-6 bg-gold-warm'
                    : 'w-2 bg-wall-sand/30 hover:bg-wall-sand/60'
                }`}
                aria-label={`Jump to chapter ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={activeChapterIndex === chapters.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-xs sm:text-sm uppercase tracking-wider border transition-all duration-200 ${
              activeChapterIndex === chapters.length - 1
                ? 'opacity-30 border-wall-sand/10 cursor-not-allowed text-wall-sand/40'
                : 'border-gold-warm/60 bg-scout-emerald hover:bg-scout-cloak text-wall-parchment'
            }`}
          >
            <span>NEXT CHAPTER</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
