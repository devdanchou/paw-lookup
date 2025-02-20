/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato'],
        redHat: ['Red Hat Display'],
        dancing: ['Dancing Script']

      },
      animation: {
        'pulse-2s': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  plugins: [],
};
