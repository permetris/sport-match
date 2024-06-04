/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    import("@tailwindcss/forms"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".full-center": {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
          height: "100%",
          width: "100%",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
