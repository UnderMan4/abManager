import { create } from "zustand";

import { Theme } from "@/types/common";

export type SettingsState = {
   theme: Theme;
   setTheme: (theme: Theme) => void;
   libraryPath: string | null;
};

export const useSettingsStore = create<SettingsState>()((set) => ({
   theme: "light",
   setTheme: (theme) => set({ theme }),
   libraryPath: null,
}));
