import React, {
   Dispatch,
   PropsWithChildren,
   SetStateAction,
   createContext,
   useEffect,
   useState,
} from "react";

type ImportData = {
   currentFile: string | null;
   paths: string[];
   totalFiles: number;
   totalProgress: {
      value: number;
      max: number;
   };
   fileProgress?: {
      value: number;
      max: number;
   };
   fileStatus: "starting" | "importing" | "finalizing";
};

type State = {
   imports: Map<string, ImportData>;
};

export const ImportContext = createContext<State | undefined>(undefined);

export const ImportProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const [imports, setImports] = useState(new Map<string, ImportData>());

   useEffect(() => {
      const unsubscribe = window.api.import.onMessage(onMessage(setImports));

      return () => {
         unsubscribe();
      };
   }, []);
   return (
      <ImportContext.Provider
         value={{
            imports,
         }}
      >
         {children}
      </ImportContext.Provider>
   );
};

const onMessage =
   (setImports: Dispatch<SetStateAction<Map<string, ImportData>>>) =>
   (_, data: ImportListenerData) => {
      switch (data.status) {
         case "starting":
            setImports((prevImports) => {
               const newImports = new Map(prevImports);
               newImports.set(data.id, {
                  currentFile: null,
                  paths: [],
                  totalFiles: data.totalFiles,
                  totalProgress: { value: 0, max: data.totalSize },
                  fileStatus: "starting",
               });
               return newImports;
            });
            break;
         case "startingFile":
            break;
         case "copying":
            break;
         case "finalizingFile":
            break;
         case "doneFile":
            break;
         case "done":
            break;
         case "fileError":
            break;
         case "deleteError":
            break;
         default:
            break;
      }
   };
