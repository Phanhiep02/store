/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Roboto làm font chính
      },
      colors: {
        primary: "#087e8b",
        bg: "#e5ded2",
        price: "#4c8c00",
      },
    },
  },
  plugins: [],
};
