import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Locale } from "@/features/i18n/i18n-config";
import { RealTheme, SaveType, Theme } from "@/types/common";

export type SettingsState = {
   theme: Theme;
   realTheme: RealTheme;
   setTheme: (theme: Theme) => void;
   libraryPath: string | null;
   saveType: SaveType;
   firstSetup: (data: { libraryPath: string; saveType: SaveType }) => void;
   locale: Locale;
   setLocale: (locale: Locale) => void;
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
         saveType: "copy",
         firstSetup: ({ libraryPath, saveType }) =>
            set({ libraryPath, saveType }),
         locale: "en-US",
         setLocale: (locale) => set({ locale }),
      }),
      {
         name: "settings",
      }
   )
);
