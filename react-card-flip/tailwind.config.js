// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS, JSX, TS, and TSX files in src
    "./public/index.html",        // Scans the index.html file
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
