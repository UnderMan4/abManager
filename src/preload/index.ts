import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge, ipcRenderer } from "electron";

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
};

const fs = {
   listDirectory: (
      path: string
   ): { files: string[] } | { error: NodeJS.ErrnoException | null } => {
      return ipcRenderer.sendSync("list-directory", path);
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
   } catch (error) {
      console.error(error);
   }
} else {
   // @ts-ignore (define in dts)
   window.electron = electronAPI;
   // @ts-ignore (define in dts)
   window.api = api;
}
