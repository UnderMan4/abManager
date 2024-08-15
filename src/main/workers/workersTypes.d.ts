type ImportOptions = {
   isOneBook: boolean;
};

type ImportData = {
   paths: string[];
   id: string;
   options: ImportOptions;
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
