import { LazyMotion, domAnimation } from "framer-motion";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

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
         unsubscribe();
      };
   }, []);

   useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(realTheme);
   }, [realTheme]);

   return (
      <LazyMotion features={domAnimation} strict>
         <RouterProvider router={appRouter} />
      </LazyMotion>
   );
}

export default App;
