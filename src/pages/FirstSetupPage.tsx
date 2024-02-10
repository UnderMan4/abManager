import { Button } from "@radix-ui/themes";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";

export type FirstSetupPageProps = {
   className?: string;
};

export const FirstSetupPage: FC<FirstSetupPageProps> = ({ className }) => {
   const [selectedDir, setSelectedDir] = useState<string>();
   return (
      <div className={twMerge("", className)}>
         <Button
         // onClick={async () => {
         //    // const dir = await dialog.showOpenDialog({
         //    //    properties: ["openDirectory"],
         //    // });
         //    const dir = await window.electron.dialog.showOpenDialog({
         //       properties: ["openDirectory"],
         //    });
         //    if (dir.canceled) return;
         //    setSelectedDir(dir.filePaths[0]);
         // }}
         >
            Select folder
         </Button>
         <p>{selectedDir}</p>
      </div>
   );
};
