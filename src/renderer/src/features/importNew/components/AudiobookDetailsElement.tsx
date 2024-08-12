import { FC } from "react";

import { Heading } from "@/components/common";

export type AudiobookDetailsElementProps = {
   label: string;
   value: string | string[] | number | number[] | undefined | null;
};

export const AudiobookDetailsElement: FC<AudiobookDetailsElementProps> = ({
   label,
   value,
}) => {
   if (!value) return null;

   const valueArray = Array.isArray(value) ? value : [value];
   return (
      <div className="">
         <Heading as="h5" className="font-bold mb-1">
            {label}
         </Heading>
         {valueArray.map((val, index) => (
            <p key={index} className="text-lg">
               {val}
            </p>
         ))}
      </div>
   );
};
