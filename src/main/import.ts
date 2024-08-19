import { Worker } from "worker_threads";

import { mainWindow } from ".";
import importWorker from "./workers/importWorker?nodeWorker";

const runningImports = new Map<string, { data: ImportData; worker: Worker }>();

export const importFiles = (data: ImportData) => {
   if (runningImports.has(data.id)) return;

   const worker = importWorker({
      workerData: data,
   });

   runningImports.set(data.id, { data, worker });

   worker.on("message", (message: ImportWorkerMessage) => {
      mainWindow?.webContents.send("import-message", message);

      if (message.type === "done") {
         worker.terminate();
      }
   });

   worker.on("error", (err) => {
      console.error(err);
   });

   worker.on("exit", (code) => {
      if (code !== 0) {
         console.error(`Worker stopped with exit code ${code}`);
      }
      runningImports.delete(data.id);
   });
};
