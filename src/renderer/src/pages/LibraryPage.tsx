import { FC } from "react";

import { FirstSetup } from "@/features/firstSetup";
import { useSettingsStore } from "@/stores";

export const LibraryPage: FC = () => {
   const { libraryPath } = useSettingsStore();

   return libraryPath ? (
      <div className="h-full w-full flex items-center justify-center"></div>
   ) : (
      <FirstSetup />
   );
};
