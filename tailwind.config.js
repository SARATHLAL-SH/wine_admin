/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "radiant-blue": "linear-gradient(to right, #21498a, #345d9e)",
        "radiant-green": "linear-gradient(to right, #97a383, #c7d9a9 )",
        "radiant-maroon": "linear-gradient(to right, #800a7a, #9c2596)",
        "radiant-maroonlight": "linear-gradient(to right, #955a96, #7f4e80)",
        "radiant-homebackground": "linear-gradient(to right, #510b7d, #3b075c)",
      },
      animation: {
        "slide-right-left": "slide-right-left 10s linear infinite",
      },
      keyframes: {
        "slide-right-left": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
    function ({ addComponents }) {
      addComponents({
        'input[type="number"]::-webkit-inner-spin-button': {
          "-webkit-appearance": "none",
          margin: "0",
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          "-webkit-appearance": "none",
          margin: "0",
        },
        'input[type="number"]': {
          "-moz-appearance": "textfield",
        },
      });
    },
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
