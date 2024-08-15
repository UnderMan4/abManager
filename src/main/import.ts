import { ipcMain } from "electron";
import { Worker } from "worker_threads";

import importWorker from "./workers/importWorker?nodeWorker";

const runningImports = new Map<string, { data: ImportData; worker: Worker }>();

export const importFiles = (data: ImportData) => {
   if (runningImports.has(data.id)) return;

   const worker = importWorker({
      workerData: data,
   });

   runningImports.set(data.id, { data, worker });

   worker.on("message", (message: ImportWorkerMessage) => {
      switch (message.type) {
         case "progress":
            ipcMain.emit("import-message", message.type, {
               id: message.id,
               fileName: message.fileName,
               chunkLength: message.chunkLength,
            });
            break;
         case "fileDone":
            ipcMain.emit("import-message", message.type, {
               id: message.id,
               fileName: message.fileName,
            });
            break;
         case "done":
            ipcMain.emit("import-message", message.type, {
               id: message.id,
            });
            worker.terminate();
            break;
         case "error":
            ipcMain.emit("import-message", message.type, {
               id: message.id,
               fileName: message.fileName,
               error: message.error,
            });
            break;
      }
   });

   worker.on("error", (err) => {
      console.error(err);
      // Handle error
   });

   worker.on("exit", (code) => {
      runningImports.delete(data.id);
   });
};

// type ImportQueueItem = {
//    paths: string[];
//    options: ImportOptions;
// };

// type ImportOptions = {
//    isOneBook: boolean;
// };

// type CurrentImportStatus = {
//    paths: string[];
//    totalSize: number;
//    finishedSize: number;
//    currentFile: string | null;
//    options: ImportOptions;
// };

// const queue: ImportQueueItem[] = [];

// let currentImport: CurrentImportStatus | null = null;

// const addToQueue = (paths: string[], options: ImportOptions) => {
//    queue.push({
//       paths,
//       options,
//    });

//    processQueue();
// };

// const processQueue = () => {
//    if (queue.length === 0) return;
//    if (currentImport !== null) return;

//    const item = queue.shift();

//    if (item === undefined) return;

//    const totalSize = item.paths.reduce((acc, path) => {
//       const stats = fs.statSync(path);
//       return acc + stats.size;
//    }, 0);

//    currentImport = {
//       paths: item.paths,
//       totalSize,
//       finishedSize: 0,
//       currentFile: null,
//       options: item.options,
//    };

//    let filesRemaining = item.paths.length;

//    currentImport.paths.forEach((path) => {
//       importWorker({
//          workerData: {
//             path,
//             destination: "C:\\Users\\filip\\Desktop",
//          },
//       })
//          .on("message", (message) => {
//             switch (message.type) {
//                case "progress":
//                   currentImport!.finishedSize += message.chunkLength;
//                   currentImport!.currentFile = message.fileName;
//                   break;
//                case "done":
//                   filesRemaining--;
//                   if (filesRemaining === 0) {
//                      currentImport = null;
//                      processQueue();
//                   }
//                   break;
//                case "error":
//                   console.log(message.error);
//             }
//          })
//          .on("error", (err) => {
//             console.error(err);
//          });

//       // const fileName = p.basename(path);
//       // const readStream = fs.createReadStream(path);
//       // const writeStream = fs.createWriteStream(
//       //    p.join("C:\\Users\\filip\\Desktop", fileName)
//       // );
//       // readStream.on("data", (chunk) => {
//       //    currentImport!.finishedSize += chunk.length;
//       //    currentImport!.currentFile = fileName;
//       //    console.info("chunk", chunk);
//       //    console.info("chunkLength", chunk.length);
//       // });
//       // readStream.pipe(writeStream);
//       // // Simulate an error after 1 second
//       // // setTimeout(() => {
//       // //    writeStream.emit("error", new Error("Simulated error"));
//       // // }, 3000);
//       // writeStream.on("finish", () => {
//       //    currentImport!.currentFile = null;
//       //    filesRemaining--;
//       //    if (filesRemaining === 0) {
//       //       currentImport = null;
//       //       processQueue();
//       //    }
//       // });
//       // writeStream.on("error", (err) => {
//       //    //TODO: Add error handling
//       //    console.error(err);
//       // });
//    });
// };

// export { addToQueue as addToImportQueue };
