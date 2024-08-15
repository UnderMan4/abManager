import fs from "fs";
import p from "path";
import { parentPort, workerData } from "worker_threads";

if (!parentPort) {
   throw new Error("No parentPort found");
}

const { paths, options, id } = workerData as ImportData;

const fileQueue = [...paths];

const processFiles = () => {
   if (fileQueue.length === 0) {
      parentPort!.postMessage({ type: "done", id });
      return;
   }

   const path = fileQueue.shift()!;
   const fileName = p.basename(path);
   const readStream = fs.createReadStream(path);
   const writeStream = fs.createWriteStream(
      p.join("C:\\Users\\filip\\Desktop", fileName)
   );
   parentPort!.postMessage({
      type: "fileStart",
      id,
      fileName,
   });

   readStream.on("data", (chunk) => {
      parentPort!.postMessage({
         type: "progress",
         id,
         fileName,
         chunkLength: chunk.length,
      });
   });

   readStream.on("end", () => {
      parentPort!.postMessage({
         type: "fileDone",
         id,
         fileName,
      });
      processFiles();
   });

   readStream.pipe(writeStream);

   writeStream.on("error", (error) => {
      parentPort!.postMessage({
         type: "error",
         id,
         fileName,
         error,
      });
   });
};

processFiles();
