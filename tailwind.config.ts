import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
        "blue-0": "#0B0C0F",
        "blue-2": "#20222B",
        "blue-6": "#5F6271",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        dark: {
          primary: "#E83664", //brand6
          secondary: "#19D6E5",
          accent: "#FD0A62",
          neutral: "#414657",
          "base-100": "#313541",
          "base-200": "#1C1D27",
          "base-300": "#0f1018",
          info: "#325E9F",
          success: "#19D6E5",
          warning: "#E2A400",
          error: "#FC632C",
          "--blue-0": "",
          "--blue-2": "",
          "--blue-6": "",
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
