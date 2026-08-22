/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0d2b16",
          dark: "#081b0e",
          light: "#153d1f",
        },
        secondary: {
          DEFAULT: "#5f8f34",
          dark: "#4a7228",
          light: "#7cad4d",
        },
        accent: {
          DEFAULT: "#9cc65a",
          light: "#c3e39a",
        },
        gold: {
          DEFAULT: "#c99a3a",
          dark: "#a97f2a",
          light: "#e0bc63",
        },
        heading: "#16241a",
        body: "#4b5563",
        muted: "#6b7280",
        surface: "#f7f7f2",
        border: "#e4e7e0",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Poppins'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(13, 43, 22, 0.08)",
        cardHover: "0 16px 40px rgba(13, 43, 22, 0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
