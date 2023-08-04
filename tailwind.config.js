/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#03071E",
        c2: "#0F2395",
        c3: "#370617",
        c4: "#6A040F",
        c5: "#9D0208",
        c6: "#D00000",
        c7: "#DC2F02",
        c8: "#E85D04",
        c9: "#F48C06",
        c10: "#FAA307",
        c11: "#FFBA08",
        c12: "#1127A7",
      },
      animation: {
        text: "text 5s ease infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "right center",
          },
        },
      },
      translate: {
        "x-complete": "100vw",
        "y-complete": "100vh",
      },
      backgroundSize: {
        "1.5x": "150%",
        "2x": "200%",
      },
    },
  },
  plugins: [],
};
