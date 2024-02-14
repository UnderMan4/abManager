import { ElectronAPI } from "@electron-toolkit/preload";
import Drive from "node-disk-info/dist/classes/drive";
import { PlatformPath } from "path";

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
         getPlatform: () => NodeJS.Platform;
      };
      fs: {
         listDirectory: (
            path: string
         ) => { files: string[] } | { error: NodeJS.ErrnoException | null };
         createDirectory: (
            path: string
         ) => { success: true } | { error: Error };
         getDiskStats: (path: string) => { error: Error } | { data: Drive };
      };
      path: PlatformPath;
   }
}
