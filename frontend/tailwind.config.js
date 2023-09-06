/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "text-error": "0px 11px 4.5px rgba(248, 113, 113, 0.7)",
      },
    },
  },
  plugins: [],
};
