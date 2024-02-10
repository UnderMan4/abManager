import { Theme, ThemePanel } from "@radix-ui/themes";
import { RouterProvider } from "react-router-dom";

import { appRouter } from "@/routing";
import { useSettingsStore } from "@/stores";

function App() {
   const { theme } = useSettingsStore();
   return (
      <Theme appearance={theme} accentColor="ruby" radius="large">
         <RouterProvider router={appRouter} />
         {/* <ThemePanel /> */}
      </Theme>
   );
}

export default App;
