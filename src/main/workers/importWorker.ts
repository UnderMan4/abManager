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

const getDirectoryName = async (path: string): Promise<string> => {
   const { nanoid } = await import("nanoid");

   const metadata = await mm.parseFile(path);
   const { artist, album } = metadata.common;

   if (!artist || !album) {
      return `${p.parse(p.basename(path)).name.replace(/\s/g, "_")}_${nanoid()}`;
   }

   return `${artist.replace(/\s/g, "_")}_${album.replace(/\s/g, "_")}_${nanoid()}`;
};

const processFiles = () => {
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
   if (fileQueue.length === 0) {
      parentPort!.postMessage({ status: "done", id });
      return;
   }

   const path = fileQueue.shift()!;
   const fileName = p.basename(path);
   const readStream = fs.createReadStream(path);

   const importDir = options.isOneBook
      ? dirIfIsOneBook ?? p.join(libraryPath, await getDirectoryName(paths[0]))
      : p.join(libraryPath, await getDirectoryName(path));

   if (options.isOneBook && !dirIfIsOneBook) {
      dirIfIsOneBook = importDir;
   }
   if (!fs.existsSync(importDir)) {
      fs.mkdirSync(importDir, { recursive: true });
   }

   const writeStream = fs.createWriteStream(p.join(importDir, fileName));

   parentPort!.postMessage({
      status: "startingFile",
      id,
      fileName,
   });

   readStream.on("data", (chunk) => {
      parentPort!.postMessage({
         status: "copying",
         id,
         fileName,
         chunkLength: chunk.length,
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
               });
            }
         });
      } else {
         parentPort!.postMessage({
            status: "doneFile",
            id,
            fileName,
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
