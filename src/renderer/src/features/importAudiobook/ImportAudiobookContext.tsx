import { FC, createContext } from "react";
import { useStep } from "usehooks-ts";

import { useObjectState, useSafeContext } from "@/hooks";

export type ImportAudiobookContextState = {
   step: number;
   stepHelpers: ReturnType<typeof useStep>[1];
};

export type ImportAudiobookData = {
   importType: "directory" | "file";
};

export const ImportAudiobookContext =
   createContext<ImportAudiobookContextState | null>(null);

export type ImportAudiobookContextProps = {
   children: React.ReactNode;
};

export const ImportAudiobookProvider: FC<ImportAudiobookContextProps> = ({
   children,
}) => {
   const [step, stepHelpers] = useStep(3);

   const [data, setdata] = useObjectState();
   return (
      <ImportAudiobookContext.Provider
         value={{
            step,
            stepHelpers,
         }}
      >
         {children}
      </ImportAudiobookContext.Provider>
   );
};

export const useImportAudiobookContext = () =>
   useSafeContext(
      ImportAudiobookContext,
      "You are trying to use ImportAudiobookContext outside of its provider."
   );
