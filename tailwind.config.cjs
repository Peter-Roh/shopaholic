/** @type {import('tailwindcss').Config} */
/** @type {import('daisyui').config } */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};

module.exports = config;
