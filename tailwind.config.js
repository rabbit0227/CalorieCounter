/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./scripts/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      zIndex: {
        1000: "1000",
      },
      boxShadow: {
        custom: "0 8px 110px rgb(14 55 54 / 15%)",
      },
      borderRadius: {
        "5rem": "5rem",
      },
      backdropBlur: {
        md: "12px",
      },
    },
  },
  plugins: [],
};
