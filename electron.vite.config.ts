import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
   main: {
      plugins: [externalizeDepsPlugin()],
   },
   preload: {
      plugins: [externalizeDepsPlugin()],
   },
   renderer: {
      resolve: {
         alias: {
            "@": resolve("src/renderer/src"),
         },
      },
      plugins: [react(), tsConfigPaths()],
   },
});
