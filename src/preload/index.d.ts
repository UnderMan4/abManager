import { ElectronAPI } from "@electron-toolkit/preload";
import * as mm from "music-metadata";
import Drive from "node-disk-info/dist/classes/drive";
import { PlatformPath } from "path";

declare global {
   type ImportListenerStatus =
      | "starting"
      | "startingFile"
      | "copying"
      | "finalizingFile"
      | "doneFile"
      | "done"
      | "fileError"
      | "deleteError";
   type ImportListenerData<
      T extends ImportListenerStatus = ImportListenerStatus,
   > = T extends "starting"
      ? {
           status: "starting";
           id: string;
           totalFiles: number;
           totalSize: number;
        }
      : T extends "startingFile"
        ? {
             status: "startingFile";
             id: string;
             fileName: string;
             fileSize: number;
             fileNo: number;
          }
        : T extends "copying"
          ? {
               status: "copying";
               id: string;
               fileName: string;
               chunkLength: number;
               messageId: string;
            }
          : T extends "finalizingFile"
            ? {
                 status: "finalizingFile";
                 id: string;
                 fileName: string;
              }
            : T extends "doneFile"
              ? {
                   status: "doneFile";
                   id: string;
                   fileName: string;
                   filePath: string;
                }
              : T extends "done"
                ? {
                     status: "done";
                     id: string;
                  }
                : T extends "fileError"
                  ? {
                       status: "fileError";
                       id: string;
                       fileName: string;
                       error: Error;
                    }
                  : T extends "deleteError"
                    ? {
                         status: "deleteError";
                         id: string;
                         fileName: string;
                         error: Error;
                      }
                    : never;

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
      mainWindow: {
         minimize: () => void;
         maximize: () => void;
         close: () => void;
         isMaximized: () => boolean;
      };
   }
}
