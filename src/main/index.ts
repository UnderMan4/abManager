import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import {
   BrowserWindow,
   app,
   dialog,
   ipcMain,
   nativeTheme,
   shell,
} from "electron";
import fs from "fs";
import { getDiskInfoSync } from "node-disk-info";
import os from "os";
import path from "path";

import icon from "../../resources/icon.png?asset";
import { importFiles } from "./import";
import { readFileMetadata } from "./utils";

function createWindow(): void {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minHeight: 600,
      minWidth: 1100,
      show: false,
      autoHideMenuBar: false,
      ...(process.platform === "linux" ? { icon } : {}),
      webPreferences: {
         preload: path.join(__dirname, "../preload/index.js"),
         sandbox: false,
         nodeIntegrationInWorker: true,
      },
   });

   mainWindow.on("ready-to-show", () => {
      mainWindow.show();
   });

   mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
   });

   // HMR for renderer base on electron-vite cli.
   // Load the remote URL for development or the local html file for production.
   if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
   } else {
      mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
   }

   nativeTheme.on("updated", () => {
      mainWindow?.webContents.send(
         "system-theme-changed",
         nativeTheme.shouldUseDarkColors ? "dark" : "light"
      );
   });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   // Set app user model id for windows
   electronApp.setAppUserModelId("com.electron");

   // Default open or close DevTools by F12 in development
   // and ignore CommandOrControl + R in production.
   // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
   app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
   });

   // IPC test
   ipcMain.on("ping", () => console.warn("pong"));
   //expose variable to the renderer

   apiHandling();

   fsHandling();

   createWindow();

   app.on("activate", function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
   }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const apiHandling = () => {
   ipcMain.on("get-system-theme", (event) => {
      event.returnValue = nativeTheme.shouldUseDarkColors ? "dark" : "light";
   });

   ipcMain.handle(
      "show-open-dialog",
      (_, options: Electron.OpenDialogOptions) => dialog.showOpenDialog(options)
   );

   ipcMain.on("get-system-theme", (event) => {
      event.returnValue = nativeTheme.shouldUseDarkColors ? "dark" : "light";
   });

   ipcMain.on("get-platform", (event) => {
      event.returnValue = os.platform();
   });

   ipcMain.on("add-to-import-queue", (_, data) => {
      importFiles(data);
   });
};

const fsHandling = () => {
   ipcMain.on("list-directory", (event, path) => {
      fs.readdir(path, (err, files) => {
         if (err) {
            event.returnValue = { error: err };
         } else {
            event.returnValue = { files };
         }
      });
   });

   ipcMain.on("create-directory", (event, path) => {
      try {
         fs.mkdirSync(path, { recursive: true });
         event.returnValue = { success: true };
      } catch (err) {
         if (err instanceof Error) {
            event.returnValue = { error: err };
         } else {
            event.returnValue = { error: new Error("Unknown error") };
         }
      }
   });

   ipcMain.on("get-disk-stats", (event, targetPath) => {
      try {
         const disks = getDiskInfoSync();
         const disk = disks.find((diskInfo) =>
            path.resolve(targetPath).startsWith(diskInfo.mounted)
         );

         if (!disk) {
            event.returnValue = { error: new Error("Disk not found") };
            return;
         }

         event.returnValue = {
            data: {
               filesystem: disk.filesystem,
               blocks: disk.blocks,
               used: disk.used,
               available: disk.available,
               capacity: disk.capacity,
               mounted: disk.mounted,
            },
         };
      } catch (error) {
         event.returnValue = { error };
      }
   });

   ipcMain.handle("read-file-metadata", async (_, filePath) => {
      const result = await readFileMetadata(filePath);

      return result;
   });
};
