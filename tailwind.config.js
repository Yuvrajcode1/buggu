/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Jost"', 'sans-serif'],
      },
      colors: {
        midnight: '#0c0a1f',
        plum: '#2b0a3d',
        wine: '#4a1030',
        rosegold: '#e8b4bc',
        gold: '#f3c47a',
        blush: '#f6d9de',
        cream: '#fdf6ec',
      },
      backgroundImage: {
        'celebration-gradient':
          'radial-gradient(ellipse at top, #4a1030 0%, #2b0a3d 45%, #0c0a1f 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(243, 196, 122, 0.35)',
        'glow-rose': '0 0 40px rgba(232, 180, 188, 0.35)',
        premium: '0 20px 60px -15px rgba(0,0,0,0.6)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        rise: 'rise linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-22px)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-115vh) translateX(20px) rotate(8deg)', opacity: 0 },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}