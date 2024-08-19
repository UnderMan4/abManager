type ImportOptions = {
   isOneBook: boolean;
};

type UserSettings = {
   libraryPath: string;
   saveType: "link" | "copy" | "move";
};

type ImportData = {
   paths: string[];
   id: string;
   options: ImportOptions;
   userSettings: UserSettings;
};

type ImportWorkerMessage =
   | {
        type: "progress";
        id: string;
        fileName: string;
        chunkLength: number;
     }
   | {
        type: "done";
        id: string;
     }
   | {
        type: "error";
        id: string;
        fileName: string;
        error: Error;
     }
   | {
        type: "fileDone";
        id: string;
        fileName: string;
     }
   | {
        type: "fileStart";
        id: string;
        fileName: string;
     };
