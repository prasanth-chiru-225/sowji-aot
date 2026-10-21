import React, { useState } from 'react';
import { assetPath } from '../utils/assetPath';

interface WingsOfFreedomIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const WingsOfFreedomIcon: React.FC<WingsOfFreedomIconProps> = ({
  className = "",
  size = 36,
  glow = false
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div 
          className="absolute inset-0 bg-sky-500/30 blur-md rounded-full pointer-events-none scale-125" 
          aria-hidden="true" 
        />
      )}

      {!imageError ? (
        <img
          src={assetPath('/images/scout-logo.png')}
          alt="Scout Regiment Wings of Freedom Logo"
          width={size}
          height={size}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] filter contrast-110 select-none transition-transform duration-300"
          onError={() => setImageError(true)}
          draggable={false}
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          aria-label="Wings of Freedom Emblem"
        >
          <defs>
            <linearGradient id="shieldGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="50%" stop-color="#0f172a" />
              <stop offset="100%" stop-color="#050811" />
            </linearGradient>
            <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fce78a" />
              <stop offset="50%" stop-color="#e5b94c" />
              <stop offset="100%" stop-color="#855711" />
            </linearGradient>
            <linearGradient id="blueWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#60a5fa" />
              <stop offset="50%" stop-color="#2563eb" />
              <stop offset="100%" stop-color="#1e3a8a" />
            </linearGradient>
            <linearGradient id="whiteWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#e2e8f0" />
              <stop offset="100%" stop-color="#94a3b8" />
            </linearGradient>
          </defs>

          {/* Shield Frame */}
          <path
            d="M 50 6 L 86 18 C 86 52 74 78 50 94 C 26 78 14 52 14 18 Z"
            fill="url(#shieldGradMain)"
            stroke="url(#goldBorderGrad)"
            strokeWidth="3.5"
          />

          {/* Vertical Division */}
          <line x1="50" y1="14" x2="50" y2="84" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 3" />

          {/* Left Wing - Scout Blue */}
          <g fill="url(#blueWingGrad)">
            <path d="M 47 22 C 37 25 29 33 26 44 C 33 41 41 43 45 46 C 33 49 27 58 29 68 C 36 61 43 62 46 65 L 47 22 Z" />
            <path d="M 44 48 C 36 53 31 62 33 74 C 38 68 44 68 47 71 L 46 52 Z" opacity="0.9" />
            <path d="M 43 66 C 37 72 35 78 38 82 C 42 78 45 76 47 78 L 45 68 Z" opacity="0.8" />
          </g>

          {/* Right Wing - White/Silver */}
          <g fill="url(#whiteWingGrad)">
            <path d="M 53 22 C 63 25 71 33 74 44 C 67 41 59 43 55 46 C 67 49 73 58 71 68 C 64 61 57 62 54 65 L 53 22 Z" />
            <path d="M 56 48 C 64 53 69 62 67 74 C 62 68 56 68 53 71 L 54 52 Z" opacity="0.9" />
            <path d="M 57 66 C 63 72 65 78 62 82 C 58 78 55 76 53 78 L 55 68 Z" opacity="0.8" />
          </g>

          <circle cx="50" cy="50" r="2.5" fill="#fce78a" />
        </svg>
      )}
    </div>
  );
};
