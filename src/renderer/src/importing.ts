import { IntlShape } from "react-intl";
import { toast } from "sonner";

import { prepareToast } from "@/utils/toastUtils";

export type ImportData = {
   currentFile: string | null;
   paths: string[];
   totalFiles: number;
   errors: number;
   warnings: number;
   totalProgress: {
      value: number;
      max: number;
   };
   fileProgress?: {
      value: number;
      max: number;
      status: "starting" | "importing" | "finalizing" | "done";
      fileNo: number;
   };
};

const imports = new Map<string, ImportData>();

export const onImportMessage = (data: ImportListenerData, intl: IntlShape) => {
   switch (data.status) {
      case "starting":
         onStarting(data, intl);
         break;
      case "startingFile":
         onStartingFile(data, intl);
         break;
      case "copying":
         onCopying(data, intl);
         break;
      case "finalizingFile":
         onFinalizingFile(data, intl);
         break;
      case "doneFile":
         onDoneFile(data, intl);
         break;
      case "done":
         onDone(data, intl);
         break;
      case "fileError":
         onFileError(data, intl);
         break;
      case "deleteError":
         onDeleteError(data, intl);
         break;
   }
};

const onStarting = (data: ImportListenerData<"starting">, intl: IntlShape) => {
   imports.set(data.id, {
      currentFile: null,
      paths: [],
      totalFiles: data.totalFiles,
      totalProgress: { value: 0, max: data.totalSize },
      errors: 0,
      warnings: 0,
   });

   prepareToast.progress({
      id: data.id,
      title: intl.formatMessage({ id: "toasts.progress.fileImport.title" }),
      description: intl.formatMessage(
         { id: "toasts.progress.fileImport.startingDescription" },
         { totalFiles: data.totalFiles }
      ),
      progress: {
         value: 0,
         max: data.totalSize,
      },
   });
};

const onStartingFile = (
   data: ImportListenerData<"startingFile">,
   intl: IntlShape
) => {
   const importData = imports.get(data.id);

   if (importData) {
      importData.currentFile = data.fileName;
      importData.fileProgress = {
         value: 0,
         max: data.fileSize,
         status: "starting",
         fileNo: data.fileNo,
      };

      prepareToast.progress({
         id: data.id,
         title: intl.formatMessage({ id: "toasts.progress.fileImport.title" }),
         description: intl.formatMessage(
            {
               id: "toasts.progress.fileImport.startingFileDescription",
            },
            {
               fileName: data.fileName,
               totalFiles: importData.totalFiles,
               fileNo: data.fileNo,
            }
         ),
         progress: {
            value: 0,
            max: importData.totalProgress.max,
         },
         secondaryProgress: {
            value: 0,
            max: data.fileSize,
            mode: "indeterminate",
         },
      });
   }
};

const onCopying = (data: ImportListenerData<"copying">, intl: IntlShape) => {
   const importData = imports.get(data.id);

   if (importData) {
      importData.totalProgress.value += data.chunkLength;
      importData.fileProgress = {
         value: importData.fileProgress!.value + data.chunkLength,
         max: importData.fileProgress!.max,
         status: "importing",
         fileNo: importData.fileProgress!.fileNo,
      };

      prepareToast.progress({
         id: data.id,
         title: intl.formatMessage({ id: "toasts.progress.fileImport.title" }),
         description: intl.formatMessage(
            {
               id: "toasts.progress.fileImport.copyingDescription",
            },
            {
               fileName: data.fileName,
               totalFiles: importData.totalFiles,
               fileNo: importData.fileProgress.fileNo,
            }
         ),
         progress: {
            value: importData.totalProgress.value,
            max: importData.totalProgress.max,
         },
         secondaryProgress: {
            value: importData.fileProgress.value,
            max: importData.fileProgress.max,
         },
      });
   }
};

const onFinalizingFile = (
   data: ImportListenerData<"finalizingFile">,
   intl: IntlShape
) => {
   const importData = imports.get(data.id);

   if (importData) {
      importData.fileProgress = {
         value: importData.fileProgress!.max,
         max: importData.fileProgress!.max,
         status: "finalizing",
         fileNo: importData.fileProgress!.fileNo,
      };

      prepareToast.progress({
         id: data.id,
         title: intl.formatMessage({ id: "toasts.progress.fileImport.title" }),
         description: intl.formatMessage(
            {
               id: "toasts.progress.fileImport.finalizingDescription",
            },
            {
               fileName: data.fileName,
               totalFiles: importData.totalFiles,
               fileNo: importData.fileProgress.fileNo,
            }
         ),
         progress: {
            value: importData.totalProgress.value,
            max: importData.totalProgress.max,
         },
         secondaryProgress: {
            value: importData.fileProgress.value,
            max: importData.fileProgress.max,
            mode: "indeterminate",
         },
      });
   }
};

const onDoneFile = (data: ImportListenerData<"doneFile">, intl: IntlShape) => {
   const importData = imports.get(data.id);

   if (importData) {
      importData.paths.push(data.filePath);
      importData.fileProgress = {
         value: importData.fileProgress!.max,
         max: importData.fileProgress!.max,
         status: "done",
         fileNo: importData.fileProgress!.fileNo,
      };

      prepareToast.progress({
         id: data.id,
         title: intl.formatMessage({ id: "toasts.progress.fileImport.title" }),
         description: intl.formatMessage(
            {
               id: "toasts.progress.fileImport.doneFileDescription",
            },
            {
               fileName: data.fileName,
               totalFiles: importData.totalFiles,
               fileNo: importData.fileProgress.fileNo,
            }
         ),
         progress: {
            value: importData.totalProgress.value,
            max: importData.totalProgress.max,
         },
         secondaryProgress: {
            value: importData.fileProgress.max,
            max: importData.fileProgress.max,
         },
      });
   }
};

const onDone = (data: ImportListenerData<"done">, intl: IntlShape) => {
   const importData = imports.get(data.id);

   if (importData) {
      toast.dismiss(data.id);
      if (importData.errors !== importData.totalFiles) {
         prepareToast.success({
            title: intl.formatMessage({
               id: "toasts.success.fileImport.title",
            }),
            description: intl.formatMessage(
               { id: "toasts.success.fileImport.description" },
               {
                  totalFiles: importData.totalFiles - importData.errors,
                  failedFiles: importData.errors,
                  warnings: importData.warnings,
               }
            ),
         });
      } else {
         prepareToast.error({
            title: intl.formatMessage({
               id: "toasts.error.fileImport.title",
            }),
            description: intl.formatMessage(
               { id: "toasts.error.fileImport.description" },
               {
                  totalFiles: importData.totalFiles - importData.errors,
                  failedFiles: importData.errors,
               }
            ),
         });
      }
      imports.delete(data.id);
   }
};

const onFileError = (
   data: ImportListenerData<"fileError">,
   intl: IntlShape
) => {
   const importData = imports.get(data.id);

   if (importData) {
      importData.errors += 1;

      prepareToast.error({
         title: intl.formatMessage({
            id: "toasts.error.singleFileImport.title",
         }),
         description: data.fileName,
      });
   }
};

const onDeleteError = (
   data: ImportListenerData<"deleteError">,
   intl: IntlShape
) => {
   const importData = imports.get(data.id);

   if (importData) {
      importData.warnings += 1;

      prepareToast.error({
         title: intl.formatMessage({
            id: "toasts.error.fileImportDelete.title",
         }),
         description: data.fileName,
      });
   }
};
