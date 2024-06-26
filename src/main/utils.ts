import fs from "fs";
import * as mm from "music-metadata";
import path from "path";

export const findMountPoint = (targetPath: string): string | null => {
   let currentPath = path.resolve(targetPath);

   // eslint-disable-next-line no-constant-condition
   while (true) {
      try {
         const stats = fs.statSync(currentPath);
         if (stats.isDirectory()) {
            return currentPath;
         }
      } catch (error) {
         // Ignore errors, and move to the parent directory
      }

      const parentPath = path.dirname(currentPath);
      if (parentPath === currentPath) {
         // Reached the root without finding a mount point
         return null;
      }

      currentPath = parentPath;
   }
};

export type DiskStats =
   | {
        data?: {
           blocks: number | null;
           used: number | null;
           available: number | null;
           capacity: number | null;
           mounted: string;
        };
        error?: never;
     }
   | {
        data?: never;
        error?: Error;
     };

export const getDiskStats = async (targetPath: string) => {
   fs.statfs(targetPath, (err, stats) => {
      if (err) {
         return { error: err };
      }
      return {
         data: {
            blocks: stats.blocks,
            used: stats.blocks - stats.bfree,
            available: stats.bavail,
            capacity: stats.blocks,
            mounted: targetPath,
         },
      };
   });
   //    try {
   //       if (os.platform() === "win32") {
   //          const drives = await drivelist.list();
   //          const drive = drives.find((d) =>
   //             path.resolve(targetPath).startsWith(d.mountpoints[0].path)
   //          );
   //          if (!drive) {
   //             return { error: new Error("Drive not found") };
   //          }
   //          return {
   //             data: {
   //                filesystem: drive.description,
   //                blocks: drive.size,
   //                used: 0,
   //                available: 0,
   //                capacity: drive.size,
   //                mounted: drive.mountpoints[0].path,
   //             },
   //          };
   //       } else {
   //          const mountPoint = findMountPoint(targetPath);
   //          console.log(
   //             "🚀 ~ file: utils.ts:71 ~ getDiskStats ~ mountPoint:",
   //             mountPoint
   //          );
   //          if (!mountPoint) {
   //             return { error: new Error("Mount point not found") };
   //          }
   //          const diskStats = fs.statSync(mountPoint);
   //          console.log(
   //             "🚀 ~ file: utils.ts:77 ~ getDiskStats ~ diskStats:",
   //             diskStats
   //          );
   //          return {
   //             data: {
   //                filesystem: mountPoint,
   //                blocks: diskStats.blocks,
   //                used: 0,
   //                available: 0,
   //                capacity: diskStats.blocks,
   //                mounted: mountPoint,
   //             },
   //          };
   //       }
   //    } catch (error) {
   //       if (error instanceof Error) {
   //          return { error };
   //       } else {
   //          return { error: new Error("Unknown error") };
   //       }
   //    }
};

export const readFileMetadata = async (filePath: string) => {
   try {
      const audioMetadata = await mm.parseFile(filePath);
      const stats = await fs.promises.stat(filePath);
      return {
         audioMetadata,
         stats,
      };
   } catch (error) {
      return { error };
   }
};
