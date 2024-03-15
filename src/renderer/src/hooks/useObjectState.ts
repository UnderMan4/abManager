import { useState } from "react";

export type SetObjectState<T> = (arg: Partial<T> | ((state: T) => T)) => void;

export const useObjectState = <T extends Record<string, any>>(
   initialState: T = {} as T
) => {
   const [state, setState] = useState<T>(initialState);

   const set: SetObjectState<T> = (arg: any) => {
      if (typeof arg === "function") {
         setState((prevState) => arg(prevState));
      } else {
         setState((prevState) => ({ ...prevState, ...arg }));
      }
   };

   return [state, set] as const;
};
