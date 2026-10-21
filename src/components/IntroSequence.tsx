import React, { useState, useEffect } from 'react';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { ArrowRight, FastForward, ShieldAlert, Radio } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

interface IntroSequenceProps {
  onComplete: () => void;
  onRequestAudioStart: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({
  onComplete,
  onRequestAudioStart,
}) => {
  const [step, setStep] = useState<number>(0);
  const [isOpeningGate, setIsOpeningGate] = useState<boolean>(false);

  // Timed progression of lines
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 600);   // "SCOUT REGIMENT ARCHIVES"
    const timer2 = setTimeout(() => setStep(2), 2200);  // "TRANSMISSION RECEIVED"
    const timer3 = setTimeout(() => setStep(3), 3800);  // "RECIPIENT: SOWJI"
    const timer4 = setTimeout(() => setStep(4), 5400);  // "CLASSIFICATION: EXTREMELY SPECIAL"
    const timer5 = setTimeout(() => setStep(5), 7200);  // "BEYOND THE WALLS" & CTA

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleOpenArchive = () => {
    onRequestAudioStart();
    setIsOpeningGate(true);
    // Smooth gate opening zoom duration
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  const handleSkip = () => {
    onRequestAudioStart();
    onComplete();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-titan-dark text-wall-parchment overflow-hidden transition-all duration-1000 ${
        isOpeningGate ? 'scale-125 opacity-0 pointer-events-none filter blur-sm' : 'scale-100 opacity-100'
      }`}
    >
      {/* Top Bar with Skip Action and Military Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-wall-sand/60">
          <Radio className="w-3.5 h-3.5 text-crimson-glow animate-pulse" />
          <span>FREQ: 102.4 MHz // SCOUT ARCHIVE</span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-wall-sand/30 hover:border-gold-warm/60 bg-titan-stone/60 hover:bg-titan-slate/80 text-xs font-mono tracking-wider text-wall-sand hover:text-gold-warm transition-all duration-200"
          title="Skip intro to archive"
        >
          <span>SKIP INTRO</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Atmospheric Colossal Wall Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Real Attack on Titan Wall Background */}
        <img
          src={assetPath('/images/aot-walls-landscape.webp')}
          alt="Attack on Titan Colossal Wall"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 filter contrast-125 brightness-75 scale-105 animate-pulse-subtle"
        />

        {/* Soft backlighting behind wall */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-warm/15 rounded-full blur-[140px]" />

        {/* Ambient Fog Sweeps */}
        <div className="absolute inset-0 bg-gradient-to-t from-titan-dark via-titan-dark/60 to-titan-dark/40" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Main Sequential Narrative Transmission Container */}
      <main className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center my-auto">
        {/* Emblem Crest */}
        <div className={`transition-all duration-1000 transform ${step >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90'}`}>
          <div className="p-4 rounded-full bg-titan-stone/70 border border-wall-sand/20 shadow-2xl backdrop-blur-md mb-6">
            <WingsOfFreedomIcon size={56} glow />
          </div>
        </div>

        {/* Step 1: SCOUT REGIMENT ARCHIVES */}
        <div className="min-h-[28px] mb-2">
          <p 
            className={`font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-wall-sand transition-all duration-700 ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            SCOUT REGIMENT ARCHIVES // EXPEDITION DISPATCH
          </p>
        </div>

        {/* Step 2: TRANSMISSION RECEIVED */}
        <div className="min-h-[36px] mb-2">
          {step >= 2 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-scout-emerald/60 border border-scout-cloak/80 text-xs md:text-sm font-mono tracking-widest text-emerald-300 animate-fade-in shadow-[0_0_12px_rgba(36,78,56,0.5)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>TRANSMISSION RECEIVED & DECRYPTED</span>
            </div>
          )}
        </div>

        {/* Step 3: RECIPIENT: SOWJI */}
        <div className="min-h-[44px] mb-2">
          {step >= 3 && (
            <p className="font-mono text-sm md:text-base tracking-[0.25em] text-wall-parchment animate-fade-in">
              RECIPIENT: <span className="font-bold text-gold-warm underline decoration-gold-warm/60 decoration-2 underline-offset-4">SOWJI</span>
            </p>
          )}
        </div>

        {/* Step 4: CLASSIFICATION: EXTREMELY SPECIAL */}
        <div className="min-h-[38px] mb-6">
          {step >= 4 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-crimson-deep/60 border border-crimson-badge text-xs font-mono tracking-wider text-red-200 animate-fade-in">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              <span>CLASSIFICATION: EXTREMELY SPECIAL // CONFIDENTIAL</span>
            </div>
          )}
        </div>

        {/* Step 5: BEYOND THE WALLS Title Reveal */}
        <div className={`transition-all duration-1000 transform ${step >= 5 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-wall-parchmentLight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-3">
            BEYOND <span className="text-gold-warm gold-glow-text">THE WALLS</span>
          </h1>

          <p className="font-sans text-base sm:text-xl md:text-2xl text-wall-sand font-light tracking-wide max-w-xl mx-auto mb-8 leading-relaxed">
            “One ordinary world. <span className="text-wall-parchment font-medium">One extraordinary person.</span>”
          </p>

          {/* CTA: [ OPEN THE ARCHIVE ] */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenArchive}
              className="relative group px-8 py-4 rounded-md bg-gradient-to-r from-scout-emerald via-scout-green to-scout-cloak hover:from-scout-green hover:to-scout-bright border border-gold-warm/60 shadow-[0_0_30px_rgba(229,185,76,0.25)] hover:shadow-[0_0_40px_rgba(229,185,76,0.45)] text-wall-parchment font-serif font-bold text-base sm:text-lg tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-gold-warm"
            >
              <span className="flex items-center gap-3">
                <WingsOfFreedomIcon size={24} />
                <span>OPEN THE ARCHIVE</span>
                <ArrowRight className="w-5 h-5 text-gold-warm transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer coordinates & military stamps */}
      <footer className="w-full max-w-6xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-wall-sand/50 border-t border-wall-sand/10 pt-4 z-20">
        <div>
          <span>SURVEY CORPS ARCHIVAL DISPATCH // 24 OCTOBER</span>
        </div>
        <div className="mt-1 sm:mt-0">
          <span>COORDINATES: 53°31'N 09°59'E // STATUS: ACTIVE</span>
        </div>
      </footer>
    </div>
  );
};
