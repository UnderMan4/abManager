import { LazyMotion, domAnimation } from "framer-motion";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { HistoryProvider } from "@/contexts";
import { FirstSetup } from "@/features/firstSetup";
import { withI18n } from "@/hocs";
import { onImportMessage } from "@/importing";
import { appRouter } from "@/routes";
import { useSettingsStore } from "@/stores";

function App(): JSX.Element {
   const { theme, realTheme } = useSettingsStore();

   const intl = useIntl();

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
      const unsubscribe = window.api.import.onMessage((_, data) => {
         onImportMessage(data, intl);
      });

      return () => {
         unsubscribe();
      };
   }, [intl]);

   const { libraryPath } = useSettingsStore();

   useEffect(() => {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(realTheme);
   }, [realTheme]);

   return (
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
   );
}

const AppWithI18n = withI18n(App);

export default AppWithI18n;
