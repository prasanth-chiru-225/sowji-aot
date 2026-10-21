import React, { useState } from 'react';
import { WingsOfFreedomIcon } from './WingsOfFreedomIcon';
import { BIRTHDAY_CONFIG, MemoryItem } from '../config/birthdayContent';
import { Camera, X, Calendar, MapPin, Tag, ZoomIn, Sparkles, ChevronDown } from 'lucide-react';

export const MemoryGallery: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const { memories } = BIRTHDAY_CONFIG;

  const displayedMemories = showAll ? memories : memories.slice(0, 9);

  return (
    <section id="gallery-section" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-titan-stone border border-wall-sand/30 text-xs font-mono tracking-widest text-wall-sand mb-3">
          <Camera className="w-3.5 h-3.5 text-gold-warm" />
          <span>RECOVERED EXPEDITION ARTIFACTS // {memories.length} RECORDS</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wall-parchment tracking-wide">
          THE MEMORY <span className="text-gold-warm">GALLERY</span>
        </h2>
        <p className="mt-2 text-wall-sand font-sans text-sm sm:text-base max-w-xl mx-auto">
          Authentic moments and recovered memories from expeditions with Sowji beyond the walls.
        </p>
      </div>

      {/* Grid of Polaroid Expedition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedMemories.map((mem, idx) => (
          <div
            key={mem.id}
            onClick={() => setSelectedMemory(mem)}
            className="group cursor-pointer relative bg-wall-parchmentLight text-titan-dark rounded-sm p-4 pb-6 shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-stone-300 transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_20px_40px_rgba(229,185,76,0.25)]"
            style={{
              transform: `rotate(${idx % 3 === 0 ? '-1.5deg' : idx % 3 === 1 ? '1deg' : '-0.5deg'})`,
            }}
          >
            {/* Vintage Washi Tape Strip at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/80 border-t border-b border-amber-300/80 transform rotate-1 shadow-sm pointer-events-none" />

            {/* Photo Frame */}
            <div className="relative aspect-[4/3] bg-stone-900 rounded-sm overflow-hidden border border-stone-400 mb-4 flex items-center justify-center">
              {mem.imageSrc ? (
                <>
                  <img
                    src={mem.imageSrc}
                    alt={mem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-105"
                  />
                  {/* Subtle hover overlay with zoom icon */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 text-xs font-mono text-white">
                    <ZoomIn className="w-4 h-4 text-gold-warm" />
                    <span>ENLARGE FILE</span>
                  </div>
                </>
              ) : (
                /* AoT Expedition Card Graphic Artwork Fallback */
                <div className="w-full h-full bg-gradient-to-br from-titan-slate via-titan-stone to-titan-dark p-6 flex flex-col items-center justify-between text-center select-none">
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-wall-sand/60">
                    <span>SURVEY RECON</span>
                    <span>{mem.date}</span>
                  </div>
                  <div className="my-auto flex flex-col items-center">
                    <div className="p-3 rounded-full bg-titan-dark/60 border border-gold-warm/40 mb-2">
                      <WingsOfFreedomIcon size={32} glow />
                    </div>
                    <span className="font-serif text-sm font-bold text-wall-parchment tracking-wider">
                      {mem.tag}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Polaroid Label / Notes */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {mem.date}
                </span>
                <span className="font-semibold text-crimson-badge">{mem.id}</span>
              </div>

              <h4 className="font-serif text-lg font-bold text-stone-900 tracking-wide line-clamp-1">
                {mem.title}
              </h4>

              <p className="font-sans text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                {mem.caption}
              </p>

              <div className="mt-3 pt-2 border-t border-stone-300 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-scout-cloak" />
                  {mem.location}
                </span>
                <span className="font-bold text-scout-cloak">{mem.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More / Show All Memories Toggle */}
      {memories.length > 9 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-titan-stone/80 hover:bg-titan-slate border border-gold-warm/40 text-xs sm:text-sm font-mono uppercase tracking-wider text-wall-parchment transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-gold-warm" />
            <span>{showAll ? 'SHOW FEWER MEMORIES' : `VIEW ALL ${memories.length} EXPEDITION MEMORIES`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-titan-dark/95 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-titan-stone border border-gold-warm/60 rounded-xl p-6 sm:p-8 shadow-2xl text-wall-parchment my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-titan-dark/80 text-wall-sand hover:text-wall-parchment hover:bg-crimson-deep/60 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gold-warm">
              <WingsOfFreedomIcon size={24} />
              <span>EXPEDITION ARCHIVE RECOVERY // {selectedMemory.id}</span>
            </div>

            {/* High-Res Photo Display */}
            {selectedMemory.imageSrc && (
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black rounded-lg overflow-hidden border border-wall-sand/30 mb-6 shadow-xl">
                <img
                  src={selectedMemory.imageSrc}
                  alt={selectedMemory.title}
                  className="w-full h-full object-contain filter contrast-105"
                />
              </div>
            )}

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-wall-parchmentLight mb-2">
              {selectedMemory.title}
            </h3>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-wall-sand mb-6">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-titan-dark border border-wall-sand/20">
                <Calendar className="w-3.5 h-3.5 text-gold-warm" />
                {selectedMemory.date}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-titan-dark border border-wall-sand/20">
                <MapPin className="w-3.5 h-3.5 text-scout-bright" />
                {selectedMemory.location}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-scout-emerald/60 border border-scout-cloak text-emerald-300">
                <Tag className="w-3.5 h-3.5" />
                {selectedMemory.tag}
              </span>
            </div>

            {/* Description / Caption */}
            <div className="p-4 rounded bg-titan-dark/70 border border-wall-sand/20 mb-6">
              <p className="font-serif text-base sm:text-lg text-wall-parchment italic leading-relaxed">
                “{selectedMemory.caption}”
              </p>
            </div>

            {/* Field Notes */}
            <div className="border-t border-wall-sand/20 pt-4">
              <p className="font-mono text-xs uppercase tracking-wider text-wall-sand/70 mb-1">
                COMMANDER'S FIELD NOTES:
              </p>
              <p className="font-sans text-sm text-wall-sand leading-relaxed">
                {selectedMemory.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
