import { useCallback, useMemo } from "react";

import { HOME_PATHS } from "@/constants";
import { useHistoryContext } from "@/hooks/contexts";
import { useAppNavigate } from "@/hooks/useAppNavigate";

export const useHistory = () => {
   const { history } = useHistoryContext();
   const navigate = useAppNavigate();
   const stepsToHome = useMemo(() => {
      const historyLength = history.length;
      for (let i = historyLength - 1; i >= 0; i--) {
         if (HOME_PATHS.includes(history[i]!)) {
            return historyLength - 1 - i;
         }
      }
      return -1; // Indicating no home path found
   }, [history]);

   const navigateToHome = useCallback(() => {
      if (stepsToHome <= 0) {
         navigate("/");
      } else {
         navigate(-stepsToHome);
      }
   }, [navigate, stepsToHome]);

   return { history, stepsToHome, navigateToHome };
};
