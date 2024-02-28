import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#35374B",
        secondary: "#344955",
        tertiary: "#50727B",
        outline: "#78A083",
        extra: "#FBF5EE",
        text: "#9C9D9E",
      },
      fontFamily: {
        cerlions: ["var(--font-cerlions)"],
        ageya: ["var(--font-ageya)"],
        canopee: ["var(--font-canopee)"],
        confillia: ["var(--font-confillia)"],
        dahlia: ["var(--font-dahlia)"],
        quigly: ["var(--font-quigly)"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
