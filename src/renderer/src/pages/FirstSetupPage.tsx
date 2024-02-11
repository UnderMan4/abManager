import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";

export type FirstSetupPageProps = {
   className?: string;
};

export const FirstSetupPage: FC<FirstSetupPageProps> = ({ className }) => {
   const [selectedDir, setSelectedDir] = useState<string>();
   return (
      <div className={twMerge("", className)}>
         <p>{selectedDir}</p>
      </div>
   );
};
