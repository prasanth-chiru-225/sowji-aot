import React, { useState } from 'react';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { BIRTHDAY_CONFIG } from '../config/birthdayContent';
import { Mail, MailOpen, Lock, Sparkles, Feather } from 'lucide-react';

export const SecretLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { secretMessage } = BIRTHDAY_CONFIG;

  return (
    <section id="secret-letter-section" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-titan-stone border border-wall-sand/30 text-xs font-mono tracking-widest text-wall-sand mb-3">
          <Lock className="w-3.5 h-3.5 text-gold-warm" />
          <span>CONFIDENTIAL POUCH // SEALED TRANSMISSION</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wall-parchment tracking-wide">
          THE SECRET <span className="text-gold-warm">MESSAGE</span>
        </h2>
        {/* Clue quote */}
        <p className="mt-3 text-wall-sand font-serif italic text-base sm:text-lg max-w-xl mx-auto">
          “{secretMessage.clue}”
        </p>
      </div>

      {/* Sealed Envelope Container */}
      {!isOpen ? (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="group cursor-pointer relative w-full max-w-lg aspect-[1.5/1] bg-gradient-to-br from-stone-800 via-stone-900 to-titan-dark border-2 border-gold-warm/40 rounded-xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 transform hover:-translate-y-2 hover:border-gold-warm hover:shadow-[0_20px_50px_rgba(229,185,76,0.3)] flex flex-col items-center justify-center text-center"
          >
            {/* Vintage Envelope Flap graphic */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <svg viewBox="0 0 400 260" className="w-full h-full opacity-30">
                <polygon points="0,0 200,130 400,0" fill="#2d3748" />
                <polygon points="0,0 0,260 200,130" fill="#1a202c" />
                <polygon points="400,0 400,260 200,130" fill="#1a202c" />
                <polygon points="0,260 200,130 400,260" fill="#171923" />
              </svg>
            </div>

            {/* Glowing Wax Seal Button */}
            <div className="relative z-10 w-20 h-20 rounded-full wax-seal flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 mb-4 border border-red-400/40">
              <WingsOfFreedomIcon size={36} />
            </div>

            <div className="relative z-10">
              <p className="font-mono text-xs uppercase tracking-widest text-gold-warm font-bold flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-warm animate-pulse" />
                <span>CLICK TO BREAK THE SEAL</span>
              </p>
              <p className="font-serif text-sm text-wall-sand">
                Sealed with the Scout Regiment Insignia
              </p>
            </div>

            {/* Corner classification tags */}
            <span className="absolute bottom-4 left-4 font-mono text-[10px] text-wall-sand/50">
              EXP-1024 // PRIVATE
            </span>
            <span className="absolute bottom-4 right-4 font-mono text-[10px] text-gold-warm/70">
              FOR SOWJI'S EYES ONLY
            </span>
          </div>

          <p className="mt-4 text-xs font-mono text-wall-sand/60">
            Click on the envelope to open and unfold the handwritten letter.
          </p>
        </div>
      ) : (
        /* Unfolded Letter on Antique Parchment */
        <div className="animate-fade-in relative parchment-paper p-8 sm:p-14 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-stone-900 border-2 border-stone-400">
          {/* Close / Re-seal option */}
          <div className="flex items-center justify-between border-b border-stone-400/70 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <MailOpen className="w-4 h-4 text-stone-700" />
              <span className="font-mono text-xs text-stone-700 tracking-wider font-bold">
                UNSEALED PERSONAL CORRESPONDENCE
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-mono text-stone-600 hover:text-stone-900 underline underline-offset-2 flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Re-seal letter</span>
            </button>
          </div>

          {/* Letter Body & Attached Memory Photo */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-6">
            <div className="md:col-span-8">
              {/* Salutation */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 mb-6 tracking-wide">
                {secretMessage.salutation}
              </h3>

              {/* Letter Body Paragraphs */}
              <div className="space-y-5 font-serif text-base sm:text-lg text-stone-800 leading-relaxed">
                {secretMessage.paragraphs.map((p, idx) => (
                  <p key={idx}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Attached Photo Card */}
            {secretMessage.attachedPhoto && (
              <div className="md:col-span-4 flex justify-center">
                <div className="relative bg-white p-3 pb-5 rounded shadow-xl border border-stone-300 transform rotate-2 max-w-[220px] w-full">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-200/90 border border-amber-300 rounded-sm shadow-xs" />
                  <div className="aspect-[3/4] bg-stone-900 rounded-xs overflow-hidden mb-2">
                    <img
                      src={secretMessage.attachedPhoto}
                      alt="A special memory with Sowji"
                      className="w-full h-full object-cover filter contrast-105"
                    />
                  </div>
                  <p className="font-mono text-[9px] text-center text-stone-500 uppercase tracking-wider">
                    RECOVERED ENCLOSURE // SOWJI
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Signoff */}
          <div className="mt-10 pt-8 border-t border-stone-400/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-serif font-bold text-lg text-stone-950">
                {secretMessage.signoff}
              </p>
              <p className="font-sans text-sm text-stone-700 mt-1 flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-blue-700" />
                <span>{secretMessage.sender}</span>
              </p>
            </div>

            {/* Wax Seal Stamp */}
            <div className="w-14 h-14 rounded-full wax-seal flex items-center justify-center text-white/90 shadow-md">
              <WingsOfFreedomIcon size={28} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
