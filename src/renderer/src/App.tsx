import { LazyMotion, domAnimation } from "framer-motion";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { FirstSetup } from "@/features/firstSetup";
import { appRouter } from "@/routes";
import { useSettingsStore } from "@/stores";

function App(): JSX.Element {
   const { theme, realTheme } = useSettingsStore();

   useEffect(() => {
      const unsubscribe = window.api.onSystemThemeChange((_, newTheme) => {
         if (theme === "system") {
            useSettingsStore.setState({ realTheme: newTheme });
         }
      });
      return () => {
         // @ts-ignore
         unsubscribe();
      };
   }, []);

   const { libraryPath } = useSettingsStore();

   useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(realTheme);
   }, [realTheme]);

   return (
      <LazyMotion features={domAnimation} strict>
         {libraryPath ? <RouterProvider router={appRouter} /> : <FirstSetup />}
      </LazyMotion>
   );
}

export default App;
