import { Icon } from "@iconify/react";
import { IPicture } from "music-metadata";
import { FC, useEffect, useState } from "react";

import { cls } from "@/utils/styleUtils";

export type ArrayCoverProps = {
   data: IPicture | undefined;
   className?: string;
   size?: keyof typeof sizeMap;
};

const sizeMap = {
   sm: 5,
   md: 6,
   lg: 8,
   xl: 10,
};

export const ArrayCover: FC<ArrayCoverProps> = ({
   className,
   data,
   size = "md",
}) => {
   const [imgSrc, setImgSrc] = useState<string | null>(null);

   useEffect(() => {
      if (!data) return;
      const { format, data: img } = data;
      const blob = new Blob([img], { type: format });
      const url = URL.createObjectURL(blob);
      setImgSrc(url);

      return () => URL.revokeObjectURL(url);
   }, [data]);

   return (
      <div
         className={cls(
            "bg-radix-gray-500 rounded-xl overflow-hidden flex items-center justify-center aspect-square",
            className
         )}
         style={{ width: `${sizeMap[size]}rem` }}
      >
         {data?.data ? (
            imgSrc ? (
               <img src={imgSrc} className="object-contain w-full h-full" />
            ) : (
               <Icon
                  icon="svg-spinners:180-ring"
                  className="text-radix-gray-900"
                  height={`${sizeMap[size] * 0.5}rem`}
               />
            )
         ) : (
            <Icon
               icon="ph:image-broken-bold"
               className="text-radix-gray-900"
               height={`${sizeMap[size] * 0.5}rem`}
            />
         )}
      </div>
   );
};
