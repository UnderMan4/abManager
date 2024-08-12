import { ImportNewFileContext } from "@/features/importNew";
import { useSafeContext } from "@/hooks/useSafeContext";

export const useImportNewFileContext = () =>
   useSafeContext(
      ImportNewFileContext,
      "You are trying to use ImportNewFileContext outside of its provider."
   );
