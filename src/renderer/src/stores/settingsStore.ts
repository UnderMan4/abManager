import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RealTheme, Theme } from "@/types/common";

export type SettingsState = {
   theme: Theme;
   realTheme: RealTheme;
   setTheme: (theme: Theme) => void;
   libraryPath: string | null;
};

export const useSettingsStore = create<SettingsState>()(
   persist(
      (set) => ({
         theme: "system",
         realTheme: window.api.getSystemTheme(),
         setTheme: (theme) => {
            theme === "system"
               ? set({ theme, realTheme: window.api.getSystemTheme() })
               : set({ theme, realTheme: theme });
         },
         libraryPath: null,
      }),
      {
         name: "settings",
      }
   )
);
