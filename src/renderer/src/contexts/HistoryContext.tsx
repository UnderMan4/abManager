import React, { PropsWithChildren, createContext, useState } from "react";

// Define the shape of your context value
export type HistoryContextValue = {
   history: string[];
   addToHistory: (item: string) => void;
   goBack: (delta?: number) => void;
};

// Create the context
const HistoryContext = createContext<HistoryContextValue | null>(null);

const HistoryProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const [history, setHistory] = useState<string[]>(["/"]);

   const addToHistory = (item: string) => {
      setHistory((prevHistory) => [...prevHistory, item]);
   };

   const goBack = (delta: number = -1) => {
      if (delta === 0) return;
      if (delta > 0) {
         throw new Error("delta must be negative");
      }
      setHistory((prevHistory) =>
         prevHistory.slice(0, prevHistory.length + delta)
      );
   };

   const contextValue: HistoryContextValue = {
      history,
      addToHistory,
      goBack,
   };

   return (
      <HistoryContext.Provider value={contextValue}>
         {children}
      </HistoryContext.Provider>
   );
};

export { HistoryContext, HistoryProvider };
