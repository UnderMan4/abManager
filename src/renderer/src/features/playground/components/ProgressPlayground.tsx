/* eslint-disable no-console */
import { FC, useEffect, useState } from "react";

import { ProgressBar } from "@/components/common";

export const ProgressPlayground: FC = () => {
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         const random = Math.random() * 7 + 1;
         setProgress((prevProgress) =>
            prevProgress === 100
               ? 0
               : prevProgress + random > 100
                 ? 100
                 : prevProgress + random
         );
      }, 500);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className="flex flex-col gap-8 mb-5">
         <ProgressBar
            max={100}
            value={50}
            label="Lorem ipsum"
            status="success"
         />
         <ProgressBar
            max={100}
            value={50}
            label="Lorem ipsum"
            errorMessage="Lorem ipsum dolor sit emet"
            status="error"
            onCanceled={() => console.log("Canceled")}
         />
         <ProgressBar
            max={100}
            value={50}
            label="Lorem ipsum"
            status="pending"
            onCanceled={() => console.log("Canceled")}
         />
         <ProgressBar
            max={100}
            value={progress}
            label="Lorem ipsum"
            displayFormatOptions={{
               style: "unit",
               unit: "megabyte",
            }}
            timeRemaining={2000 - (2000 * progress) / 100}
         />
      </div>
   );
};
