import { ElectronAPI } from "@electron-toolkit/preload";
import * as mm from "music-metadata";
import Drive from "node-disk-info/dist/classes/drive";
import { PlatformPath } from "path";

declare global {
   type ImportListenerData<T extends ImportListenerEvent> = {
      id: string;
   } & (T extends "progress"
      ? { fileName: string; chunkLength: number }
      : T extends "done"
        ? Record<string, never>
        : T extends "error"
          ? { fileName: string; error: Error }
          : T extends "fileDone"
            ? { fileName: string }
            : T extends "fileStart"
              ? { fileName: string }
              : never);

   type ImportListenerEvent =
      | "progress"
      | "done"
      | "error"
      | "fileDone"
      | "fileStart";

   type ImportListenerCallback<T extends ImportListenerCallback> = (
      event: T,
      data: ImportListenerData<T>
   ) => void;
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
         import: {
            importFiles: (data: {
               id: string;
               paths: string[];
               options: {
                  isOneBook: boolean;
               };
            }) => void;
            onMessage: (
               callback: ImportListenerCallback<ImportListenerEvent>
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
