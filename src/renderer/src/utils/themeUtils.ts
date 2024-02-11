import { RealTheme } from "@/types/common";

export const getSystemTheme = (): RealTheme => {
   const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
   return dark ? "dark" : "light";
};
