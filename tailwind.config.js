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
               50: "hsla(var(--text-50), <alpha-value>)",
               100: "hsla(var(--text-100), <alpha-value>)",
               200: "hsla(var(--text-200), <alpha-value>)",
               300: "hsla(var(--text-300), <alpha-value>)",
               400: "hsla(var(--text-400), <alpha-value>)",
               500: "hsla(var(--text-500), <alpha-value>)",
               600: "hsla(var(--text-600), <alpha-value>)",
               700: "hsla(var(--text-700), <alpha-value>)",
               800: "hsla(var(--text-800), <alpha-value>)",
               900: "hsla(var(--text-900), <alpha-value>)",
               950: "hsla(var(--text-950), <alpha-value>)",
            },
            background: {
               DEFAULT: "hsla(var(--background), <alpha-value>)",
               50: "hsla(var(--background-50), <alpha-value>)",
               100: "hsla(var(--background-100), <alpha-value>)",
               200: "hsla(var(--background-200), <alpha-value>)",
               300: "hsla(var(--background-300), <alpha-value>)",
               400: "hsla(var(--background-400), <alpha-value>)",
               500: "hsla(var(--background-500), <alpha-value>)",
               600: "hsla(var(--background-600), <alpha-value>)",
               700: "hsla(var(--background-700), <alpha-value>)",
               800: "hsla(var(--background-800), <alpha-value>)",
               900: "hsla(var(--background-900), <alpha-value>)",
               950: "hsla(var(--background-950), <alpha-value>)",
            },
            primary: {
               DEFAULT: "hsla(var(--primary), <alpha-value>)",
               50: "hsla(var(--primary-50), <alpha-value>)",
               100: "hsla(var(--primary-100), <alpha-value>)",
               200: "hsla(var(--primary-200), <alpha-value>)",
               300: "hsla(var(--primary-300), <alpha-value>)",
               400: "hsla(var(--primary-400), <alpha-value>)",
               500: "hsla(var(--primary-500), <alpha-value>)",
               600: "hsla(var(--primary-600), <alpha-value>)",
               700: "hsla(var(--primary-700), <alpha-value>)",
               800: "hsla(var(--primary-800), <alpha-value>)",
               900: "hsla(var(--primary-900), <alpha-value>)",
               950: "hsla(var(--primary-950), <alpha-value>)",
            },
            secondary: {
               DEFAULT: "hsla(var(--secondary), <alpha-value>)",
               50: "hsla(var(--secondary-50), <alpha-value>)",
               100: "hsla(var(--secondary-100), <alpha-value>)",
               200: "hsla(var(--secondary-200), <alpha-value>)",
               300: "hsla(var(--secondary-300), <alpha-value>)",
               400: "hsla(var(--secondary-400), <alpha-value>)",
               500: "hsla(var(--secondary-500), <alpha-value>)",
               600: "hsla(var(--secondary-600), <alpha-value>)",
               700: "hsla(var(--secondary-700), <alpha-value>)",
               800: "hsla(var(--secondary-800), <alpha-value>)",
               900: "hsla(var(--secondary-900), <alpha-value>)",
               950: "hsla(var(--secondary-950), <alpha-value>)",
            },
            accent: {
               DEFAULT: "hsla(var(--accent), <alpha-value>)",
               50: "hsla(var(--accent-50), <alpha-value>)",
               100: "hsla(var(--accent-100), <alpha-value>)",
               200: "hsla(var(--accent-200), <alpha-value>)",
               300: "hsla(var(--accent-300), <alpha-value>)",
               400: "hsla(var(--accent-400), <alpha-value>)",
               500: "hsla(var(--accent-500), <alpha-value>)",
               600: "hsla(var(--accent-600), <alpha-value>)",
               700: "hsla(var(--accent-700), <alpha-value>)",
               800: "hsla(var(--accent-800), <alpha-value>)",
               900: "hsla(var(--accent-900), <alpha-value>)",
               950: "hsla(var(--accent-950), <alpha-value>)",
            },
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
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
            ".absolute-center": {
               "@apply top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2":
                  {},
            },
         });
      }),
   ],
   safelist: ["bg-radix-gray-300"],
};
