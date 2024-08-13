import { InlineIcon } from "@iconify/react";
import { FC } from "react";

import { Heading, Tooltip } from "@/components/common";

export type AudiobookDetailsElementProps = {
   label: string;
   value: string | string[] | number | number[] | undefined | null;
   description?: string;
};

export const AudiobookDetailsElement: FC<AudiobookDetailsElementProps> = ({
   label,
   value,
   description,
}) => {
   if (!value) return null;

   const valueArray = Array.isArray(value) ? value : [value];
   return (
      <div className="">
         <div className="flex gap-1 items-center">
            <Heading as="h5" className="font-bold mb-1">
               {label}
            </Heading>
            {description && (
               <Tooltip content={description}>
                  <InlineIcon icon="ph:info-bold" />
               </Tooltip>
            )}
         </div>
         {valueArray.map((val, index) => (
            <p key={index} className="text-lg">
               {val}
            </p>
         ))}
      </div>
   );
};
