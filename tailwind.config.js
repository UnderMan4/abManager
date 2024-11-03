/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
import plugin from "tailwindcss/plugin";

module.exports = {
   darkMode: "class",
   content: [
      "./src/renderer/index.html",
      "./src/renderer/src/**/*.{html,js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         transitionDuration: {
            400: "400ms",
         },
         colors: {
            foreground: "hsla(var(--text), <alpha-value>)",
            card: "hsla(var(--card), <alpha-value>)",
            "card-foreground": "hsla(var(--card-foreground), <alpha-value>)",
            popover: "hsla(var(--popover), <alpha-value>)",
            "popover-foreground":
               "hsla(var(--popover-foreground), <alpha-value>)",
            "primary-foreground":
               "hsla(var(--primary-foreground), <alpha-value>)",
            "secondary-foreground":
               "hsla(var(--secondary-foreground), <alpha-value>)",
            muted: "hsla(var(--muted), <alpha-value>)",
            "muted-foreground": "hsla(var(--muted-foreground), <alpha-value>)",
            "accent-foreground":
               "hsla(var(--accent-foreground), <alpha-value>)",
            destructive: "hsla(var(--destructive), <alpha-value>)",
            "destructive-foreground":
               "hsla(var(--destructive-foreground), <alpha-value>)",
            border: "hsla(var(--border), <alpha-value>)",
            input: "hsla(var(--input), <alpha-value>)",
            ring: "hsla(var(--ring), <alpha-value>)",
            text: {
               DEFAULT: "hsla(var(--text), <alpha-value>)",
               50: "rgba(var(--text-50), <alpha-value>)",
               100: "rgba(var(--text-100), <alpha-value>)",
               200: "rgba(var(--text-200), <alpha-value>)",
               300: "rgba(var(--text-300), <alpha-value>)",
               400: "rgba(var(--text-400), <alpha-value>)",
               500: "rgba(var(--text-500), <alpha-value>)",
               600: "rgba(var(--text-600), <alpha-value>)",
               700: "rgba(var(--text-700), <alpha-value>)",
               800: "rgba(var(--text-800), <alpha-value>)",
               900: "rgba(var(--text-900), <alpha-value>)",
               950: "rgba(var(--text-950), <alpha-value>)",
            },
            background: {
               DEFAULT: "hsla(var(--background), <alpha-value>)",
               50: "rgba(var(--background-50), <alpha-value>)",
               100: "rgba(var(--background-100), <alpha-value>)",
               200: "rgba(var(--background-200), <alpha-value>)",
               300: "rgba(var(--background-300), <alpha-value>)",
               400: "rgba(var(--background-400), <alpha-value>)",
               500: "rgba(var(--background-500), <alpha-value>)",
               600: "rgba(var(--background-600), <alpha-value>)",
               700: "rgba(var(--background-700), <alpha-value>)",
               800: "rgba(var(--background-800), <alpha-value>)",
               900: "rgba(var(--background-900), <alpha-value>)",
               950: "rgba(var(--background-950), <alpha-value>)",
            },
            primary: {
               DEFAULT: "hsla(var(--primary), <alpha-value>)",
               50: "rgba(var(--primary-50), <alpha-value>)",
               100: "rgba(var(--primary-100), <alpha-value>)",
               200: "rgba(var(--primary-200), <alpha-value>)",
               300: "rgba(var(--primary-300), <alpha-value>)",
               400: "rgba(var(--primary-400), <alpha-value>)",
               500: "rgba(var(--primary-500), <alpha-value>)",
               600: "rgba(var(--primary-600), <alpha-value>)",
               700: "rgba(var(--primary-700), <alpha-value>)",
               800: "rgba(var(--primary-800), <alpha-value>)",
               900: "rgba(var(--primary-900), <alpha-value>)",
               950: "rgba(var(--primary-950), <alpha-value>)",
            },
            secondary: {
               DEFAULT: "hsla(var(--secondary), <alpha-value>)",
               50: "rgba(var(--secondary-50), <alpha-value>)",
               100: "rgba(var(--secondary-100), <alpha-value>)",
               200: "rgba(var(--secondary-200), <alpha-value>)",
               300: "rgba(var(--secondary-300), <alpha-value>)",
               400: "rgba(var(--secondary-400), <alpha-value>)",
               500: "rgba(var(--secondary-500), <alpha-value>)",
               600: "rgba(var(--secondary-600), <alpha-value>)",
               700: "rgba(var(--secondary-700), <alpha-value>)",
               800: "rgba(var(--secondary-800), <alpha-value>)",
               900: "rgba(var(--secondary-900), <alpha-value>)",
               950: "rgba(var(--secondary-950), <alpha-value>)",
            },
            accent: {
               DEFAULT: "hsla(var(--accent), <alpha-value>)",
               50: "rgba(var(--accent-50), <alpha-value>)",
               100: "rgba(var(--accent-100), <alpha-value>)",
               200: "rgba(var(--accent-200), <alpha-value>)",
               300: "rgba(var(--accent-300), <alpha-value>)",
               400: "rgba(var(--accent-400), <alpha-value>)",
               500: "rgba(var(--accent-500), <alpha-value>)",
               600: "rgba(var(--accent-600), <alpha-value>)",
               700: "rgba(var(--accent-700), <alpha-value>)",
               800: "rgba(var(--accent-800), <alpha-value>)",
               900: "rgba(var(--accent-900), <alpha-value>)",
               950: "rgba(var(--accent-950), <alpha-value>)",
            },
            red: {
               50: "rgba(var(--red-50), <alpha-value>)",
               100: "rgba(var(--red-100), <alpha-value>)",
               200: "rgba(var(--red-200), <alpha-value>)",
               300: "rgba(var(--red-300), <alpha-value>)",
               400: "rgba(var(--red-400), <alpha-value>)",
               500: "rgba(var(--red-500), <alpha-value>)",
               600: "rgba(var(--red-600), <alpha-value>)",
               700: "rgba(var(--red-700), <alpha-value>)",
               800: "rgba(var(--red-800), <alpha-value>)",
               900: "rgba(var(--red-900), <alpha-value>)",
               950: "rgba(var(--red-950), <alpha-value>)",
            },
         },
      },
   },
   plugins: [
      require("@tailwindcss/forms"),
      tailwindScrollbar({ nocompatible: true }),
      plugin(({ addUtilities, addComponents }) => {
         addUtilities({
            ".center": {
               display: "flex",
               "align-items": "center",
               "justify-content": "center",
            },
            ".gutter-stable": {
               "scrollbar-gutter": "stable",
            },
            ".gutter-auto": {
               "scrollbar-gutter": "auto",
            },
            ".stroke-linecap-round": {
               "stroke-linecap": "round",
            },
            ".stroke-linecap-square": {
               "stroke-linecap": "square",
            },
            ".stroke-linecap-butt": {
               "stroke-linecap": "butt",
            },
         });
         addComponents({
            // ".focus-ring": {
            //    "@apply ring-2 ring-radix-gray-1200 outline-none": {},
            // },
            ".absolute-center": {
               "@apply top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2":
                  {},
            },
         });
      }),
   ],
   safelist: ["bg-radix-gray-300"],
};
