import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, Music, Info } from 'lucide-react';

interface AudioControllerProps {
  isAutoStartRequested?: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isAutoStartRequested = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const customAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasCustomAudio, setHasCustomAudio] = useState<boolean>(false);

  // Initialize Web Audio API synthesizer
  const initWebAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Wind Ambience Generator (filtered noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.05;
        b2 = 0.85 * b2 + white * 0.05;
        output[i] = (b0 + b1 + b2) * 0.3;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(260, ctx.currentTime);

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.18, ctx.currentTime);

      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      noiseSource.start();

      // 2. Cinematic Bass Drone
      const droneOsc1 = ctx.createOscillator();
      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      const droneOsc2 = ctx.createOscillator();
      droneOsc2.type = 'triangle';
      droneOsc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(140, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.12, ctx.currentTime);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc1.start();
      droneOsc2.start();

      // 3. Gentle Melodic Arpeggiated Chords (AoT-inspired chord progression: Dm - Bb - F - C)
      const chords = [
        [146.83, 174.61, 220.0, 293.66], // Dm (D3, F3, A3, D4)
        [116.54, 146.83, 174.61, 233.08], // Bb (Bb2, D3, F3, Bb3)
        [174.61, 220.0, 261.63, 349.23], // F (F3, A3, C4, F4)
        [130.81, 164.81, 196.0, 261.63], // C (C3, E3, G3, C4)
      ];

      let chordIdx = 0;
      const playSoftChord = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return;
        const currentChord = chords[chordIdx];
        chordIdx = (chordIdx + 1) % chords.length;

        currentChord.forEach((freq, idx) => {
          setTimeout(() => {
            if (!audioCtxRef.current || !masterGainRef.current) return;
            const osc = audioCtxRef.current.createOscillator();
            const gain = audioCtxRef.current.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

            const now = audioCtxRef.current.currentTime;
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.04, now + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

            osc.connect(gain);
            gain.connect(masterGainRef.current);

            osc.start(now);
            osc.stop(now + 6.0);
          }, idx * 450);
        });
      };

      // Play every 6 seconds
      playSoftChord();
      const intervalId = window.setInterval(playSoftChord, 6200);
      synthIntervalRef.current = intervalId;

    } catch (e) {
      console.warn("Web Audio API not supported or blocked:", e);
    }
  }, []);

  // Set up custom MP3 in /audio/theme.mp3
  useEffect(() => {
    const audio = new Audio('/audio/theme.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';

    const handleReady = () => {
      setHasCustomAudio(true);
      customAudioRef.current = audio;
    };

    audio.addEventListener('canplay', handleReady);
    audio.addEventListener('canplaythrough', handleReady);
    audio.addEventListener('loadeddata', handleReady);

    audio.addEventListener('error', () => {
      // Custom audio not found or errored; will use procedural Web Audio synth
      setHasCustomAudio(false);
    });

    // Initial check
    customAudioRef.current = audio;
    setHasCustomAudio(true);

    return () => {
      if (customAudioRef.current) {
        customAudioRef.current.pause();
      }
    };
  }, []);

  const startAudio = useCallback(() => {
    setHasInteracted(true);

    if (customAudioRef.current) {
      customAudioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasCustomAudio(true);
        })
        .catch(() => {
          // If browser policy blocks or audio fails, fallback to procedural synth
          initWebAudio();
          if (audioCtxRef.current && masterGainRef.current) {
            if (audioCtxRef.current.state === 'suspended') {
              audioCtxRef.current.resume();
            }
            masterGainRef.current.gain.linearRampToValueAtTime(0.35, audioCtxRef.current.currentTime + 1.5);
            setIsPlaying(true);
          }
        });
    } else {
      initWebAudio();
      if (audioCtxRef.current && masterGainRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        masterGainRef.current.gain.linearRampToValueAtTime(0.35, audioCtxRef.current.currentTime + 1.5);
        setIsPlaying(true);
      }
    }
  }, [initWebAudio]);

  const stopAudio = useCallback(() => {
    if (customAudioRef.current) {
      customAudioRef.current.pause();
    }
    if (audioCtxRef.current && masterGainRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
    }
    setIsPlaying(false);
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (isAutoStartRequested && !hasInteracted) {
      startAudio();
    }
  }, [isAutoStartRequested, hasInteracted, startAudio]);

  // Clean up
  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {/* Sound Visualizer & Status Badge */}
      <div 
        className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider backdrop-blur-md transition-all duration-300 ${
          isPlaying 
            ? 'bg-titan-stone/90 border-scout-cloak/80 text-wall-parchment shadow-[0_0_15px_rgba(36,78,56,0.3)]' 
            : 'bg-titan-dark/80 border-titan-slate/60 text-wall-sand/70'
        }`}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'text-scout-bright animate-spin' : 'text-wall-sand/50'}`} style={{ animationDuration: '6s' }} />
        <span>{isPlaying ? (hasCustomAudio ? 'BEAUTY OF SHINGEKI NO KYOJIN' : 'SCOUT AMBIENCE') : 'SOUND MUTED'}</span>

        {/* Animated equalizer bars when playing */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1 h-3">
            <span className="w-0.5 h-full bg-scout-bright animate-pulse" style={{ animationDuration: '0.4s' }} />
            <span className="w-0.5 h-2/3 bg-gold-warm animate-pulse" style={{ animationDuration: '0.7s' }} />
            <span className="w-0.5 h-full bg-blue-400 animate-pulse" style={{ animationDuration: '0.5s' }} />
          </div>
        )}
      </div>

      {/* Main Play/Mute Button */}
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute ambient soundtrack' : 'Enable cinematic soundtrack'}
        title={isPlaying ? 'Mute audio' : 'Play cinematic audio'}
        className={`relative p-3 rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-warm shadow-xl group ${
          isPlaying
            ? 'bg-scout-green/90 border-scout-bright/70 text-wall-parchment hover:bg-scout-cloak'
            : 'bg-titan-stone/90 border-wall-sand/30 text-wall-sand hover:text-wall-parchment hover:border-gold-warm/60'
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-gold-warm transition-transform group-hover:scale-110" />
        ) : (
          <VolumeX className="w-5 h-5 text-wall-sand transition-transform group-hover:scale-110" />
        )}

        {/* Pulsing beacon if user hasn't toggled yet */}
        {!hasInteracted && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold-warm rounded-full animate-ping pointer-events-none" />
        )}
      </button>

      {/* Info tooltip button */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="p-1.5 rounded-full text-wall-sand/40 hover:text-wall-sand transition-colors"
        aria-label="Sound info"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {/* Info popover */}
      {showInfo && (
        <div className="absolute bottom-14 right-0 w-64 p-3 bg-titan-stone/95 border border-wall-sand/30 rounded-lg shadow-2xl text-xs text-wall-parchment/90 backdrop-blur-md">
          <p className="font-semibold text-gold-warm mb-1">Soundtrack Information</p>
          <p className="text-wall-sand leading-relaxed">
            Procedural atmospheric wind and orchestral arpeggios crafted for this birthday transmission.
          </p>
          <p className="text-[10px] text-wall-sand/60 mt-2 border-t border-wall-sand/20 pt-1">
            Optional: Place any favorite song as <code className="text-gold-light">/public/audio/theme.mp3</code> to use your own background track!
          </p>
        </div>
      )}
    </div>
  );
};
