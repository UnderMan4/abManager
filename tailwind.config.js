/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

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
            radix: {
               gray: {
                  100: "var(--slate-1)",
                  200: "var(--slate-2)",
                  300: "var(--slate-3)",
                  400: "var(--slate-4)",
                  500: "var(--slate-5)",
                  600: "var(--slate-6)",
                  700: "var(--slate-7)",
                  800: "var(--slate-8)",
                  900: "var(--slate-9)",
                  1000: "var(--slate-10)",
                  1100: "var(--slate-11)",
                  1200: "var(--slate-12)",
                  a100: "var(--slate-a1)",
                  a200: "var(--slate-a2)",
                  a300: "var(--slate-a3)",
                  a400: "var(--slate-a4)",
                  a500: "var(--slate-a5)",
                  a600: "var(--slate-a6)",
                  a700: "var(--slate-a7)",
                  a800: "var(--slate-a8)",
                  a900: "var(--slate-a9)",
                  a1000: "var(--slate-a10)",
                  a1100: "var(--slate-a11)",
                  a1200: "var(--slate-a12)",
               },
               indigo: {
                  100: "var(--indigo-1)",
                  200: "var(--indigo-2)",
                  300: "var(--indigo-3)",
                  400: "var(--indigo-4)",
                  500: "var(--indigo-5)",
                  600: "var(--indigo-6)",
                  700: "var(--indigo-7)",
                  800: "var(--indigo-8)",
                  900: "var(--indigo-9)",
                  1000: "var(--indigo-10)",
                  1100: "var(--indigo-11)",
                  1200: "var(--indigo-12)",
                  a100: "var(--indigo-a1)",
                  a200: "var(--indigo-a2)",
                  a300: "var(--indigo-a3)",
                  a400: "var(--indigo-a4)",
                  a500: "var(--indigo-a5)",
                  a600: "var(--indigo-a6)",
                  a700: "var(--indigo-a7)",
                  a800: "var(--indigo-a8)",
                  a900: "var(--indigo-a9)",
                  a1000: "var(--indigo-a10)",
                  a1100: "var(--indigo-a11)",
                  a1200: "var(--indigo-a12)",
               },
            },
         },
      },
   },
   plugins: [
      require("@tailwindcss/forms"),
      plugin(({ addUtilities }) => {
         addUtilities({
            ".center": {
               display: "flex",
               "align-items": "center",
               "justify-content": "center",
            },
         });
      }),
   ],
   safelist: ["bg-radix-gray-300"],
};
