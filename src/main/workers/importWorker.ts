import fs from "fs";
import * as mm from "music-metadata";
import p from "path";
import { parentPort, workerData } from "worker_threads";

if (!parentPort) {
   throw new Error("No parentPort found");
}

const { paths, options, id, userSettings } = workerData as ImportData;

const { libraryPath, saveType } = userSettings;

const fileQueue = [...paths];

let dirIfIsOneBook: string | null = null;

const combinedSize = paths.reduce(
   (acc, path) => acc + fs.statSync(path).size,
   0
);

const getDirectoryName = async (path: string): Promise<string> => {
   const { nanoid } = await import("nanoid");

   const metadata = await mm.parseFile(path);
   const { artist, title } = metadata.common;

   if (!artist && !title) {
      return `${p.parse(p.basename(path)).name.replace(/\s/g, "_")}_${nanoid()}`;
   }

   let dirName = "";

   if (artist) {
      dirName += artist.replace(/\s/g, "_").replace(/[<>:"/\\|?*]/g, "");
      dirName += "_";
   }

   if (title) {
      dirName += title.replace(/\s/g, "_").replace(/[<>:"/\\|?*]/g, "");
      dirName += "_";
   }

   dirName += nanoid();

   return dirName;
};

const processFiles = () => {
   parentPort!.postMessage({
      status: "starting",
      id,
      totalFiles: paths.length,
      totalSize: combinedSize,
   });

   switch (saveType) {
      case "copy":
      case "move":
         processCopyMove();
         break;
      case "link":
         processLink();
         break;
   }
};

const processCopyMove = async () => {
   const { nanoid } = await import("nanoid");
   if (fileQueue.length === 0) {
      parentPort!.postMessage({ status: "done", id });
      return;
   }

   const path = fileQueue.shift()!;
   const fileName = p.basename(path);
   const readStream = fs.createReadStream(path);

   const fileSize = fs.statSync(path).size;

   const fileNo = paths.length - fileQueue.length;

   const importDir = options.isOneBook
      ? dirIfIsOneBook ?? p.join(libraryPath, await getDirectoryName(paths[0]))
      : p.join(libraryPath, await getDirectoryName(path));

   if (options.isOneBook && !dirIfIsOneBook) {
      dirIfIsOneBook = importDir;
   }
   if (!fs.existsSync(importDir)) {
      fs.mkdirSync(importDir, { recursive: true });
   }

   const targetPath = p.join(importDir, fileName);

   const writeStream = fs.createWriteStream(targetPath);

   parentPort!.postMessage({
      status: "startingFile",
      id,
      fileName,
      fileSize,
      fileNo,
   });

   readStream.on("data", (chunk) => {
      parentPort!.postMessage({
         status: "copying",
         id,
         fileName,
         chunkLength: chunk.length,
         messageId: nanoid(10),
      });
   });

   readStream.on("end", () => {
      if (saveType === "move") {
         parentPort!.postMessage({
            status: "finalizingFile",
            id,
            fileName,
         });

         fs.unlink(path, (error) => {
            if (error) {
               parentPort!.postMessage({
                  status: "deleteError",
                  id,
                  fileName,
                  error,
               });
            } else {
               parentPort!.postMessage({
                  status: "doneFile",
                  id,
                  fileName,
                  filePath: targetPath,
               });
            }
         });
      } else {
         parentPort!.postMessage({
            status: "doneFile",
            id,
            fileName,
            filePath: targetPath,
         });
      }

      processCopyMove();
   });

   readStream.pipe(writeStream);

   writeStream.on("error", (error) => {
      parentPort!.postMessage({
         status: "fileError",
         id,
         fileName,
         error,
      });
   });
};

const processLink = async () => {
   if (fileQueue.length === 0) {
      parentPort!.postMessage({ status: "done", id });
      return;
   }

   const path = fileQueue.shift()!;
   const fileName = p.basename(path);

   const importDir = options.isOneBook
      ? await getDirectoryName(paths[0])
      : await getDirectoryName(path);

   const targetPath = p.join(libraryPath, importDir, fileName);

   parentPort!.postMessage({
      status: "startingFile",
      id,
      fileName,
   });

   fs.symlink(path, targetPath, (error) => {
      if (error) {
         parentPort!.postMessage({
            status: "fileError",
            id,
            fileName,
            error,
         });
      } else {
         parentPort!.postMessage({
            status: "doneFile",
            id,
            fileName,
         });
      }

      processLink();
   });
};

processFiles();
