import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
   interface Window {
      electron: ElectronAPI;
      api: {
         showOpenDialog: (
            options: Electron.OpenDialogOptions
         ) => Promise<Electron.OpenDialogReturnValue>;
         getSystemTheme: () => "light" | "dark";
         onSystemThemeChange: (
            callback: (
               event: Electron.IpcRendererEvent,
               theme: "light" | "dark"
            ) => void
         ) => Electron.IpcRenderer;
      };
      fs: {
         listDirectory: (
            path: string
         ) => { files: string[] } | { error: NodeJS.ErrnoException | null };
      };
   }
}
