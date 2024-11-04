import { nanoid } from "nanoid";
import { FC } from "react";

import { Button } from "@/components/ui";
import { useSettingsStore } from "@/stores";

const paths = Array.from(
   { length: 9 },
   (_, i) =>
      `C:\\Users\\filip\\Downloads\\samples\\0${i + 1} - www.mfiles.co.uk - Ludwig van Beethoven - Title ${i + 1}.mp3`
);

export const ImportPlayground: FC = () => {
   const settings = useSettingsStore();

   return (
      <Button
         onClick={() =>
            window.api.import.importFiles({
               id: nanoid(),
               paths,
               options: {
                  isOneBook: true,
               },
               userSettings: {
                  libraryPath: settings.libraryPath!,
                  saveType: settings.saveType,
               },
            })
         }
      >
         Import
      </Button>
   );
};
