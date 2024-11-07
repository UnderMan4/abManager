import { IconContext } from "@phosphor-icons/react";
import { LazyMotion, domAnimation } from "framer-motion";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { COLOR_PALETTES } from "@/constants";
import { HistoryProvider } from "@/contexts";
import { FirstSetup } from "@/features/firstSetup";
import { withI18n } from "@/hocs";
import { appRouter } from "@/routes";
import { useSettingsStore } from "@/stores";
import "@/utils/stringExtensions";

function App(): JSX.Element {
   const { theme, realTheme, colorPalette, libraryPath } = useSettingsStore();

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

   useEffect(() => {
      document.body.classList.remove(...COLOR_PALETTES);
      document.body.classList.add(colorPalette);
   }, [colorPalette]);

   return (
      <IconContext.Provider
         value={{
            weight: "bold",
            className: "text-text",
         }}
      >
         <HistoryProvider>
            <LazyMotion features={domAnimation}>
               {libraryPath ? (
                  <RouterProvider router={appRouter} />
               ) : (
                  <FirstSetup />
               )}
            </LazyMotion>
            <Toaster richColors theme="dark" visibleToasts={5} />
         </HistoryProvider>
      </IconContext.Provider>
   );
}

const AppWithI18n = withI18n(App);

export default AppWithI18n;
