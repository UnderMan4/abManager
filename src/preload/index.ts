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

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
   try {
      contextBridge.exposeInMainWorld("electron", electronAPI);
      contextBridge.exposeInMainWorld("api", api);
   } catch (error) {
      console.error(error);
   }
} else {
   // @ts-ignore (define in dts)
   window.electron = electronAPI;
   // @ts-ignore (define in dts)
   window.api = api;
}