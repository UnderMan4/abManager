import { NavigateOptions, To, useNavigate } from "react-router-dom";

import { useHistoryContext } from "@/hooks/contexts";

export const useAppNavigate = () => {
   const navigate = useNavigate();

   const { addToHistory, goBack } = useHistoryContext();

   function navigateTo(path: To, options?: NavigateOptions): void;
   function navigateTo(steps: number): void;

   function navigateTo(
      pathOrSteps: To | number,
      options?: NavigateOptions
   ): void {
      if (typeof pathOrSteps === "number") {
         goBack(pathOrSteps);
         navigate(pathOrSteps);
      } else {
         addToHistory(pathOrSteps.toString());
         navigate(pathOrSteps, options);
      }
   }
   return navigateTo;
};
