import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { BIRTHDAY_CONFIG } from '../config/birthdayContent';
import { Sparkles, Sun, Heart, ChevronDown } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

interface BirthdayRevealProps {
  onClimaxReached?: () => void;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ onClimaxReached }) => {
  const [isWishUnlocked, setIsWishUnlocked] = useState<boolean>(false);
  const { climax } = BIRTHDAY_CONFIG;

  const handleUnlockWish = () => {
    setIsWishUnlocked(true);
    if (onClimaxReached) onClimaxReached();

    // Trigger elegant golden & amber fireworks (not cheap rainbow confetti)
    const count = 40;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#fce78a', '#e5b94c', '#d4af37', '#ffffff', '#60a5fa'],
      shapes: ['circle', 'square'] as confetti.Shape[],
      disableForReducedMotion: true
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section id="climax-section" className="relative py-28 px-4 sm:px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Golden Sunrise Glow Background behind the walls */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Real Attack on Titan Scenic Wallpaper */}
        <img
          src={assetPath('/images/aot-shiganshina.webp')}
          alt="Attack on Titan Horizon"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 filter contrast-125 brightness-90 mix-blend-luminosity scale-105"
        />

        {/* Warm Golden Dawn Radiance */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[650px] bg-gradient-to-t from-amber-600/40 via-gold-warm/20 to-transparent blur-[80px]" />
        
        {/* Golden Sun Disc breaking over the horizon */}
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-t from-gold-light via-gold-warm to-amber-500 opacity-50 blur-[40px]" />

        {/* Atmospheric Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-titan-dark via-titan-dark/50 to-titan-dark/80" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Main Climax Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Stage 1: MISSION COMPLETE */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-gold-warm/50 text-xs sm:text-sm font-mono tracking-widest text-gold-warm mb-4 shadow-[0_0_20px_rgba(229,185,76,0.3)]">
          <Sun className="w-4 h-4 text-gold-warm animate-spin" style={{ animationDuration: '10s' }} />
          <span>{climax.stage1}</span>
        </div>

        {/* Stage 2: THE WORLD HAS ANOTHER REASON TO CELEBRATE */}
        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-wall-sand mb-6">
          {climax.stage2}
        </p>

        {/* Crest */}
        <div className="mb-6">
          <div className="p-4 rounded-full bg-titan-stone/80 border border-gold-warm shadow-[0_0_35px_rgba(229,185,76,0.4)]">
            <WingsOfFreedomIcon size={64} glow />
          </div>
        </div>

        {/* Main Headline: HAPPY BIRTHDAY, SOWJI */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-wall-parchmentLight tracking-wider mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          HAPPY BIRTHDAY, <br />
          <span className="text-gold-warm gold-glow-text">{BIRTHDAY_CONFIG.recipientName.toUpperCase()}.</span>
        </h2>

        {/* Blessing quote */}
        <p className="font-sans text-base sm:text-xl md:text-2xl text-wall-parchment/90 font-light max-w-2xl mx-auto leading-relaxed mb-8">
          “{climax.blessing}”
        </p>

        {/* Epilogue: YOUR STORY IS JUST BEGINNING */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-scout-bright uppercase mb-10">
          <Sparkles className="w-4 h-4" />
          <span>{climax.epilogue}</span>
          <Sparkles className="w-4 h-4" />
        </div>

        {/* Unlock Wish CTA */}
        {!isWishUnlocked ? (
          <div>
            <button
              onClick={handleUnlockWish}
              className="relative group px-10 py-5 rounded-md bg-gradient-to-r from-amber-700 via-gold-warm to-amber-600 hover:from-gold-warm hover:to-gold-light border-2 border-gold-light text-titan-dark font-serif font-black text-lg tracking-widest uppercase shadow-[0_0_40px_rgba(229,185,76,0.5)] hover:shadow-[0_0_60px_rgba(229,185,76,0.8)] transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-gold-warm"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-titan-dark" />
                <span>UNLOCK YOUR WISH</span>
                <ChevronDown className="w-5 h-5 text-titan-dark transition-transform duration-300 group-hover:translate-y-1" />
              </span>
            </button>
            <p className="mt-3 text-xs font-mono text-wall-sand/70">
              Click to receive the final dedication scroll
            </p>
          </div>
        ) : (
          /* Unlocked Final Dedication Parchment Scroll */
          <div className="w-full animate-fade-in parchment-paper p-8 sm:p-14 rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-stone-900 border-2 border-amber-600 text-left">
            <div className="flex items-center justify-between border-b border-stone-400 pb-4 mb-8">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-crimson-badge fill-crimson-badge" />
                <span className="font-mono text-xs text-stone-700 uppercase tracking-widest font-bold">
                  EXPEDITION DEDICATION // 24 OCTOBER
                </span>
              </div>
              <span className="font-mono text-xs text-stone-600">
                SCROLL COMPLETED
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-950 mb-6 tracking-wide">
              {climax.finalWishLetter.title}
            </h3>

            <div className="space-y-4 font-serif text-base sm:text-lg text-stone-800 leading-relaxed">
              {climax.finalWishLetter.body.map((para, idx) => (
                <p key={idx} className={idx === climax.finalWishLetter.body.length - 1 ? 'font-bold text-stone-950 pt-2' : ''}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-stone-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-stone-600">
                <span>{climax.finalWishLetter.crestMessage}</span>
              </div>

              <div className="w-14 h-14 rounded-full wax-seal flex items-center justify-center text-white shadow-lg">
                <WingsOfFreedomIcon size={30} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
