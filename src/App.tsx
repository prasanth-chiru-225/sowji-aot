import { useState } from 'react';
import { IntroSequence } from './components/IntroSequence';
import { ArchiveDossier } from './components/ArchiveDossier';
import { StoryChapters } from './components/StoryChapters';
import { MemoryGallery } from './components/MemoryGallery';
import { SecretLetter } from './components/SecretLetter';
import { BirthdayReveal } from './components/BirthdayReveal';
import { NavigationProgress } from './components/NavigationProgress';
import { AudioController } from './components/AudioController';
import { AtmosphereEffects } from './components/AtmosphereEffects';
import { WingsOfFreedomIcon } from './components/WingsOfFreedomIcon';
import { BIRTHDAY_CONFIG } from './config/birthdayContent';
import { assetPath } from './utils/assetPath';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [requestAudio, setRequestAudio] = useState<boolean>(false);
  const [atmosphereIntensity, setAtmosphereIntensity] = useState<'fog' | 'dramatic' | 'sunrise'>('fog');

  const handleIntroComplete = () => {
    setShowIntro(false);
    setAtmosphereIntensity('dramatic');
  };

  const handleStartAudio = () => {
    setRequestAudio(true);
  };

  const handleClimaxReached = () => {
    setAtmosphereIntensity('sunrise');
  };

  return (
    <div className="relative min-h-screen bg-titan-dark text-wall-parchment overflow-x-hidden selection:bg-crimson-badge selection:text-white">
      {/* Background Atmosphere (Dust, Feathers, Embers) */}
      <AtmosphereEffects intensity={atmosphereIntensity} />

      {/* Persistent Audio Controls */}
      <AudioController isAutoStartRequested={requestAudio} />

      {/* Intro Sequence or Main Experience */}
      {showIntro ? (
        <IntroSequence
          onComplete={handleIntroComplete}
          onRequestAudioStart={handleStartAudio}
        />
      ) : (
        <>
          {/* Top Navigation & Progress Bar */}
          <NavigationProgress onReplayIntro={() => setShowIntro(true)} />

          {/* Main Experience Content */}
          <main className="relative pt-20">
            {/* Top Atmospheric Hero Banner with AoT Art */}
            <section className="relative py-20 px-4 text-center border-b border-wall-sand/15 overflow-hidden">
              {/* Background AoT Art */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={assetPath('/images/aot-scout-bg.png')}
                  alt="Scout Regiment Expedition"
                  className="w-full h-full object-cover object-top opacity-20 filter contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-titan-dark/90 via-titan-dark/70 to-titan-dark" />
              </div>

              <div className="max-w-4xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-titan-stone/90 border border-gold-warm/40 text-xs font-mono text-gold-warm mb-5 shadow-lg">
                  <WingsOfFreedomIcon size={18} />
                  <span>SPECIAL EXPEDITION ARCHIVE // 24 OCTOBER</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-wall-parchment tracking-wide mb-4">
                  BEYOND <span className="text-gold-warm gold-glow-text">THE WALLS</span>
                </h1>
                <p className="font-serif italic text-base sm:text-xl text-wall-sand max-w-2xl mx-auto leading-relaxed">
                  “{BIRTHDAY_CONFIG.coreMessage}”
                </p>
              </div>
            </section>

            {/* 1. Dossier Section */}
            <ArchiveDossier />

            {/* 2. Friendship Story Chapters */}
            <StoryChapters />

            {/* 3. Photo Memory Gallery */}
            <MemoryGallery />

            {/* 4. Secret Message */}
            <SecretLetter />

            {/* 5. Birthday Reveal Climax */}
            <BirthdayReveal onClimaxReached={handleClimaxReached} />
          </main>

          {/* Cinematic Scout Regiment Footer */}
          <footer className="relative bg-gradient-to-t from-black via-titan-dark to-titan-stone/60 border-t border-wall-sand/20 py-16 px-4 text-center">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
              <div className="p-3 rounded-full bg-titan-dark border border-wall-sand/30 mb-4">
                <WingsOfFreedomIcon size={40} glow />
              </div>

              <p className="font-serif text-lg font-bold text-wall-parchment tracking-wider mb-1">
                BEYOND THE WALLS // FOR SOWJI
              </p>
              <p className="font-mono text-xs text-wall-sand/70 tracking-widest mb-6">
                24 OCTOBER // DEDICATED WITH THE WINGS OF FREEDOM
              </p>

              <div className="p-4 rounded-md bg-titan-dark/60 border border-wall-sand/15 text-xs font-serif italic text-wall-sand max-w-lg mb-8">
                “Dedicate your heart to the people who make life worth living. Happy Birthday, Sowji.”
              </div>

              <p className="text-[11px] font-mono text-wall-sand/50">
                Crafted with care, loyalty, and deep appreciation for an extraordinary best friend.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
