/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
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
               red: {
                  100: "var(--red-1)",
                  200: "var(--red-2)",
                  300: "var(--red-3)",
                  400: "var(--red-4)",
                  500: "var(--red-5)",
                  600: "var(--red-6)",
                  700: "var(--red-7)",
                  800: "var(--red-8)",
                  900: "var(--red-9)",
                  1000: "var(--red-10)",
                  1100: "var(--red-11)",
                  1200: "var(--red-12)",
                  a100: "var(--red-a1)",
                  a200: "var(--red-a2)",
                  a300: "var(--red-a3)",
                  a400: "var(--red-a4)",
                  a500: "var(--red-a5)",
                  a600: "var(--red-a6)",
                  a700: "var(--red-a7)",
                  a800: "var(--red-a8)",
                  a900: "var(--red-a9)",
                  a1000: "var(--red-a10)",
                  a1100: "var(--red-a11)",
                  a1200: "var(--red-a12)",
               },
            },
         },
      },
   },
   plugins: [
      require("@tailwindcss/forms"),
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
         });
         addComponents({
            ".focus-ring": {
               "@apply ring-2 ring-radix-gray-1200 outline-none": {},
            },
         });
      }),
   ],
   safelist: ["bg-radix-gray-300"],
};
