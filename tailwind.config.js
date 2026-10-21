/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        titan: {
          dark: '#0a0c0e',
          charcoal: '#121518',
          stone: '#1e2328',
          slate: '#2c343d',
          smoke: '#3a4450',
          mist: '#64748b',
        },
        scout: {
          green: '#1a3a2a',
          emerald: '#11291d',
          cloak: '#244e38',
          bright: '#3b7d59',
        },
        wall: {
          parchment: '#e5dfcf',
          parchmentDark: '#c7bd9e',
          parchmentLight: '#f4efe4',
          sand: '#a3977c',
        },
        crimson: {
          badge: '#8b1d24',
          glow: '#b91c1c',
          deep: '#5c1318',
        },
        gold: {
          light: '#fce78a',
          warm: '#e5b94c',
          ancient: '#b89033',
          glow: 'rgba(245, 197, 66, 0.4)',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'dust-drift': 'dustDrift 12s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        dustDrift: {
          '0%': { transform: 'translateY(100vh) translateX(-20px)' },
          '100%': { transform: 'translateY(-20vh) translateX(30px)' },
        }
      }
    },
  },
  plugins: [],
}
