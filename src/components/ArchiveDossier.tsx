import React, { useState, useEffect } from 'react';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { BIRTHDAY_CONFIG } from '../config/birthdayContent';
import { Unlock, FileText, CheckCircle2, Award, Sparkles, Heart } from 'lucide-react';

interface ArchiveDossierProps {
  onDeclassified?: () => void;
}

export const ArchiveDossier: React.FC<ArchiveDossierProps> = ({ onDeclassified }) => {
  const [isDeclassified, setIsDeclassified] = useState<boolean>(false);
  const [typewriterIndex, setTypewriterIndex] = useState<number>(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const { dossier } = BIRTHDAY_CONFIG;

  const handleDeclassify = () => {
    setIsDeclassified(true);
    if (onDeclassified) onDeclassified();
  };

  // Typewriter effect reveal
  useEffect(() => {
    if (!isDeclassified) return;

    if (typewriterIndex < dossier.typewriterLetter.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, dossier.typewriterLetter[typewriterIndex]]);
        setTypewriterIndex(prev => prev + 1);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [isDeclassified, typewriterIndex, dossier.typewriterLetter]);

  return (
    <section id="dossier-section" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-titan-stone border border-wall-sand/30 text-xs font-mono tracking-widest text-wall-sand mb-3">
          <WingsOfFreedomIcon size={16} />
          <span>SCOUT RECORD // RECOVERED DOCUMENT</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wall-parchment tracking-wide">
          THE CLASSIFIED <span className="text-gold-warm">ARCHIVE</span>
        </h2>
        <p className="mt-2 text-wall-sand font-sans text-sm sm:text-base max-w-xl mx-auto">
          An official dispatch retrieved from the highest tier of the Scout Regiment archives.
        </p>
      </div>

      {/* Main Dossier Card */}
      <div className="relative bg-gradient-to-b from-titan-stone to-titan-dark border border-wall-sand/30 rounded-lg p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Vintage stamps & watermarks */}
        <div className="absolute top-6 right-6 pointer-events-none opacity-20 sm:opacity-30">
          <WingsOfFreedomIcon size={180} />
        </div>

        {/* Classified Stamp Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-wall-sand/20 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-scout-emerald/50 border border-scout-cloak flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="font-mono text-xs text-wall-sand/70 tracking-wider">REGIMENT DOSSIER CODE</p>
              <p className="font-mono text-sm sm:text-base font-bold text-gold-warm">{dossier.regimentCode}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded border border-crimson-badge bg-crimson-deep/40 text-red-200 text-xs font-mono font-bold tracking-widest uppercase transform rotate-[-2deg] shadow-sm">
              CONFIDENTIAL // TOP SECRET
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded border border-wall-sand/30 bg-titan-stone text-wall-sand text-xs font-mono">
              {dossier.expeditionLogDate}
            </span>
          </div>
        </div>

        {/* Subject Portrait & Tactical Key-Value Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
          {/* Left Column: Official Recon Photo Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative bg-wall-parchmentLight text-titan-dark p-3.5 pb-5 rounded-sm shadow-2xl border border-stone-400 rotate-[-1.5deg] max-w-[280px] w-full group">
              {/* Tactical Clip at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 rounded-sm shadow-md border border-stone-500 flex items-center justify-center pointer-events-none">
                <span className="w-10 h-0.5 bg-stone-600 block" />
              </div>

              {/* Photo Frame */}
              <div className="relative aspect-[3/4] bg-stone-900 rounded-sm overflow-hidden border border-stone-400 mb-3">
                <img
                  src={dossier.subjectPhoto}
                  alt="Subject Recon: Sowji"
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 p-1 rounded-full bg-titan-dark/70 border border-gold-warm/60">
                  <WingsOfFreedomIcon size={18} />
                </div>
              </div>

              {/* Photo Label */}
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-widest text-crimson-badge font-bold uppercase">
                  CLASSIFIED RECIPIENT // CONFIRMED
                </p>
                <p className="font-serif font-black text-stone-900 text-base tracking-wider">
                  SOWJI
                </p>
                <p className="font-mono text-[9px] text-stone-500">
                  RECON ID: 1024-EXP // ACTIVE
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Key-Value Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field: SUBJECT */}
            <div className="p-4 rounded bg-titan-stone/70 border border-wall-sand/15 transition-all hover:border-gold-warm/40">
              <span className="block font-mono text-[11px] text-wall-sand/60 uppercase tracking-widest mb-1">
                SUBJECT CODENAME
              </span>
              <span className="font-serif text-2xl font-bold text-gold-warm tracking-wider flex items-center gap-2">
                {dossier.subject}
                <Sparkles className="w-4 h-4 text-gold-warm animate-pulse" />
              </span>
            </div>

            {/* Field: STATUS */}
            <div className="p-4 rounded bg-titan-stone/70 border border-wall-sand/15 transition-all hover:border-scout-bright/40">
              <span className="block font-mono text-[11px] text-wall-sand/60 uppercase tracking-widest mb-1">
                CURRENT STATUS
              </span>
              <span className="font-mono text-base font-bold text-emerald-400 tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {dossier.status}
              </span>
            </div>

            {/* Field: PRIORITY LEVEL */}
            <div className="p-4 rounded bg-titan-stone/70 border border-wall-sand/15 transition-all hover:border-crimson-glow/40">
              <span className="block font-mono text-[11px] text-wall-sand/60 uppercase tracking-widest mb-1">
                PRIORITY LEVEL
              </span>
              <span className="font-mono text-base font-bold text-red-400 tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-red-400" />
                {dossier.priorityLevel}
              </span>
            </div>

            {/* Field: MISSION OBJECTIVE */}
            <div className="p-4 rounded bg-titan-stone/70 border border-wall-sand/15">
              <span className="block font-mono text-[11px] text-wall-sand/60 uppercase tracking-widest mb-1">
                COMMAND MISSION
              </span>
              <span className="font-mono text-base font-bold text-gold-warm tracking-wider">
                {dossier.mission}
              </span>
            </div>

            {/* Field: SPECIAL ABILITY */}
            <div className="p-4 rounded bg-titan-stone/70 border border-wall-sand/15 sm:col-span-2">
              <span className="block font-mono text-[11px] text-wall-sand/60 uppercase tracking-widest mb-1">
                CONFIRMED SPECIAL ABILITY
              </span>
              <span className="font-sans text-lg font-semibold text-wall-parchment tracking-wide flex items-center gap-2">
                <Heart className="w-4 h-4 text-crimson-glow" />
                {dossier.specialAbility}
              </span>
              <p className="text-xs text-wall-sand/70 mt-1">
                Inherent aura that uplifts surrounding allies, dissipates gloomy weather, and turns mundane days into fond memories.
              </p>
            </div>
          </div>
        </div>

        {/* Declassify Action & Letter Reveal */}
        {!isDeclassified ? (
          <div className="text-center py-8 border-t border-wall-sand/20">
            <p className="font-sans text-sm text-wall-sand mb-5">
              An encrypted commander's field message is attached to this dossier.
            </p>
            <button
              onClick={handleDeclassify}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded bg-scout-emerald hover:bg-scout-cloak border border-gold-warm/60 shadow-[0_0_25px_rgba(229,185,76,0.25)] text-wall-parchment font-serif font-bold text-base tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gold-warm"
            >
              <Unlock className="w-5 h-5 text-gold-warm" />
              <span>DECLASSIFY THE FILE</span>
            </button>
          </div>
        ) : (
          <div className="border-t border-wall-sand/20 pt-8 animate-fade-in">
            {/* Parchment Styled Letter Container */}
            <div className="relative parchment-paper p-6 sm:p-10 rounded-md shadow-2xl text-stone-900 border-2 border-stone-400">
              {/* Corner Fold Detail */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-stone-300/80 border-b border-l border-stone-500 transform rotate-[-90deg]" />

              <div className="flex items-center justify-between border-b border-stone-400/60 pb-4 mb-6">
                <span className="font-mono text-xs text-stone-700 tracking-wider font-semibold">
                  FIELD DISPATCH // OCTOBER 24
                </span>
                <span className="font-mono text-xs text-stone-600">
                  DECRYPTED LEVEL-10
                </span>
              </div>

              {/* Typewriter message lines */}
              <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-stone-900">
                {displayedLines.map((line, idx) => (
                  <p 
                    key={idx} 
                    className={`transition-opacity duration-500 ${
                      idx === 0 ? 'font-bold text-xl text-stone-950 mb-4' : ''
                    }`}
                  >
                    {line}
                  </p>
                ))}

                {/* Blinking cursor while typing */}
                {typewriterIndex < dossier.typewriterLetter.length && (
                  <span className="inline-block w-2.5 h-5 bg-stone-900 animate-pulse ml-1 align-middle" />
                )}
              </div>

              {/* Scout Wax Seal Bottom */}
              <div className="mt-8 pt-6 border-t border-stone-400/60 flex items-center justify-between">
                <div className="font-mono text-xs text-stone-700">
                  <span>CONFIDENTIAL FRIENDSHIP DISPATCH</span>
                </div>
                <div className="w-12 h-12 rounded-full wax-seal flex items-center justify-center text-white/90 shadow-md">
                  <WingsOfFreedomIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
