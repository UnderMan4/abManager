import invariant from "invariant";
import { useContext } from "react";

export const useSafeContext = <T>(
   context: React.Context<T | null>,
   message: string
): T => {
   const value = useContext(context);
   invariant(value, message);
   return value;
};
