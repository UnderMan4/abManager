import { ElectronAPI } from "@electron-toolkit/preload";
import * as mm from "music-metadata";
import Drive from "node-disk-info/dist/classes/drive";
import { PlatformPath } from "path";

declare global {
   type ImportListenerData =
      | { status: "fileError"; id: string; fileName: string; error: Error }
      | { status: "done"; id: string }
      | { status: "startingFile"; id: string; fileName: string }
      | { status: "doneFile"; id: string; fileName: string }
      | { status: "copying"; id: string; fileName: string; chunkLength: number }
      | { status: "finalizingFile"; id: string; fileName: string }
      | { status: "deleteError"; id: string; fileName: string; error: Error };

   type ImportOptions = {
      isOneBook: boolean;
   };

   type UserSettings = {
      libraryPath: string;
      saveType: "link" | "copy" | "move";
   };

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
         ) => () => Electron.IpcRenderer;
         getPlatform: () => NodeJS.Platform;
         import: {
            importFiles: (data: {
               id: string;
               paths: string[];
               options: ImportOptions;
               userSettings: UserSettings;
            }) => void;
            onMessage: (
               callback: (
                  event: Electron.IpcRendererEvent,
                  data: ImportListenerData
               ) => void
            ) => () => Electron.IpcRenderer;
         };
      };
      fs: {
         listDirectory: (
            path: string
         ) => { files: string[] } | { error: NodeJS.ErrnoException | null };
         createDirectory: (
            path: string
         ) => { success: true } | { error: Error };
         getDiskStats: (path: string) => { error: Error } | { data: Drive };
         readFileMetadata: (filePath: string) => Promise<
            | {
                 error: Error;
              }
            | {
                 stats: fs.Stats;
                 audioMetadata: mm.IAudioMetadata;
              }
         >;
      };
      path: PlatformPath;
   }
}
