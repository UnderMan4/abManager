import { useHistoryContext } from "@/hooks/contexts";

export const useHistory = () => {
   const { history } = useHistoryContext();
   return history;
};
