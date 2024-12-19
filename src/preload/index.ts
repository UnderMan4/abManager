import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";
import path from "path";

// Custom APIs for renderer
const api = {
   showOpenDialog: (
      options: {modal:boolean,...(Electron.OpenDialogOptions)}
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
   import: {
      importFiles: (data: unknown) => {
         ipcRenderer.invoke("import-files", data);
      },
      onMessage: (
         callback: (event: Electron.IpcRendererEvent, data: unknown) => void
      ) => {
         ipcRenderer.addListener("import-message", callback);
         return () => ipcRenderer.removeListener("import-message", callback);
      },
   },
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

const mainWindow = {
   minimize: () => ipcRenderer.send("minimize-window"),
   maximize: () => ipcRenderer.send("maximize-window"),
   close: () => ipcRenderer.send("close-window"),
   isMaximized: () => ipcRenderer.sendSync("is-window-maximized"),
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
      contextBridge.exposeInMainWorld("mainWindow", mainWindow);
   } catch (error) {
      console.error(error);
   }
} else {
   // @ts-expect-error (defined in dts)
   window.electron = electronAPI;
   // @ts-expect-error (defined in dts)
   window.api = api;
   // @ts-expect-error (defined in dts)
   window.fs = fs;
   // @ts-expect-error (defined in dts)
   window.path = path;
   // @ts-expect-error (defined in dts)
   window.mainWindow = mainWindow;
}
