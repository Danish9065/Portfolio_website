/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0C0C0C",
        panel: "#121212",
        panel2: "#1B1B1B",
        line: "#2A3036",
        mist: "#D7E2EA",
        muted: "#8D98A3",
        accent: "#D7E2EA",
        gold: "#BE4C00"
      },
      boxShadow: {
        glow: "0 0 35px rgba(182, 0, 168, 0.28)"
      },
      fontFamily: {
        sans: ["Kanit", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Kanit", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
