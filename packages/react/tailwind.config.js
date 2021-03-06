/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "gray-001": "#EEEEEE",
        "gray-002": "#DDDDDD",
        "gray-003": "#CCCCCC",
        "gray-004": "#BBBBBB",
        "gray-005": "#333333",
      },
    },
    keyframes: {
      "slide-from-right": {
        "0%": { transform: "translate(300px, 0)" },
        "100%": { transform: "translate(0, 0)" },
      },
      spinner: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "slide-from-right": "slide-from-right 250ms linear",
      spinner: "spinner 4s linear infinite",
    },
  },
  plugins: [],
};
