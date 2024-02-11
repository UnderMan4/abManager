import { Theme } from "@radix-ui/themes";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { appRouter } from "@/routes";
import { useSettingsStore } from "@/stores";

function App(): JSX.Element {
   const { theme, realTheme } = useSettingsStore();

   useEffect(() => {
      const unsubscribe = window.api.onSystemThemeChange((_, newTheme) => {
         // console.log("Theme changed", newTheme);
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
      <Theme appearance={realTheme} accentColor="iris" radius="large">
         <RouterProvider router={appRouter} />
         {/* <ThemePanel /> */}
      </Theme>
   );
}

export default App;
