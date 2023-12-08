/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "desaturated-dark-cyan": "hsl(180, 29%, 50%)",
      "light-grayish-cyan1": "hsl(180, 52%, 96%)",
      "light-grayish-cyan2": "hsl(180, 31%, 95%)",
      "dark-grayish-cyan": "hsl(180, 8%, 52%)",
      "very-dark-grayish-cyan": "hsl(180, 14%, 20%)",
      white: "hsl(0, 100%, 100%)",
    },
    extend: {
      boxShadow: {
        "3xl": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      backgroundImage: {
        desktop: "url('./images/bg-header-desktop.svg')",
        mobile: "url('./images/bg-header-mobile.svg')",
      },
    },
    fontFamily: {
      leagueSpartan: ["League Spartan", "sans-serif"],
    },
  },

  plugins: [],
};
