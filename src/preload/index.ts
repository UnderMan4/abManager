import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";
import path from "path";

// Custom APIs for renderer
const api = {
   showOpenDialog: (
      options: Electron.OpenDialogOptions
   ): Promise<Electron.OpenDialogReturnValue> =>
      ipcRenderer.invoke("show-open-dialog", options),
   getSystemTheme: (): "light" | "dark" =>
      ipcRenderer.sendSync("get-system-theme"),
   onSystemThemeChange: (
      callback: (
         event: Electron.IpcRendererEvent,
         theme: "light" | "dark"
      ) => void
   ) => {
      ipcRenderer.addListener("system-theme-changed", callback);
      return () => ipcRenderer.removeListener("system-theme-changed", callback);
   },
   getPlatform: (): NodeJS.Platform => ipcRenderer.sendSync("get-platform"),
};

const fs = {
   listDirectory: (
      path: string
   ): { files: string[] } | { error: NodeJS.ErrnoException | null } => {
      return ipcRenderer.sendSync("list-directory", path);
   },
   createDirectory: (path: string): { success: true } | { error: Error } => {
      return ipcRenderer.sendSync("create-directory", path);
   },
   getDiskStats: (path: string) => {
      return ipcRenderer.sendSync("get-disk-stats", path);
   },
   readFileMetadata: (filePath: string) => {
      return ipcRenderer.invoke("read-file-metadata", filePath);
   },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
   try {
      contextBridge.exposeInMainWorld("electron", electronAPI);
      contextBridge.exposeInMainWorld("api", api);
      contextBridge.exposeInMainWorld("fs", fs);
      contextBridge.exposeInMainWorld("path", path);
   } catch (error) {
      console.error(error);
   }
} else {
   // @ts-ignore (define in dts)
   window.electron = electronAPI;
   // @ts-ignore (define in dts)
   window.api = api;
   // @ts-ignore (define in dts)
   window.fs = fs;
   // @ts-ignore (define in dts)
   window.path = path;
}
