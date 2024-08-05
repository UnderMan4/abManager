import { HistoryContext, HistoryContextValue } from "@/contexts/HistoryContext";
import { useSafeContext } from "@/hooks/useSafeContext";

export const useHistoryContext = (): HistoryContextValue => {
   return useSafeContext(
      HistoryContext,
      "You are trying to use HistoryContext outside of its provider."
   );
};
