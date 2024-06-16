import { createContext } from "react";

export const createNullableContext = <T>(defaultValue?: T | null) =>
   createContext<T | null>(defaultValue ?? null);
