/** @format */

import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        wigglemore: "wigglemore 1s ease-in-out infinite",
      },
      keyframes: {
        wigglemore: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
  darkMode: "class",
};
