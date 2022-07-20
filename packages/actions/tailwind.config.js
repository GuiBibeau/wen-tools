/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "metamask-blue-100": "#037DD6",
        "metamask-blue-200": "rgb(21, 101, 192)",
        "metamask-grey": "#3D3D3D",
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
      spinner: "spinner 2s linear infinite",
    },
  },
  plugins: [],
};
