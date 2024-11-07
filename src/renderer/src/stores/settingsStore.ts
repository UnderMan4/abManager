import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Locale } from "@/features/i18n/i18n-config";
import { ColorPalette, RealTheme, SaveType, Theme } from "@/types/common";

export type SettingsState = {
   theme: Theme;
   colorPalette: ColorPalette;
   realTheme: RealTheme;
   setTheme: (theme: Theme) => void;
   setColorPalette: (colorPalette: ColorPalette) => void;
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
         colorPalette: "default",
         realTheme: window.api.getSystemTheme(),
         setTheme: (theme) => {
            theme === "system"
               ? set({ theme, realTheme: window.api.getSystemTheme() })
               : set({ theme, realTheme: theme });
         },
         setColorPalette: (colorPalette) => set({ colorPalette }),
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
