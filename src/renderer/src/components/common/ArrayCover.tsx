import { Icon } from "@iconify/react";
import { ImageBroken } from "@phosphor-icons/react";
import { IPicture } from "music-metadata";
import { FC, useEffect, useState } from "react";

import { Spinner } from "@/components/common/Spinner";
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
   "2xl": 12,
} as const;

export const ArrayCover: FC<ArrayCoverProps> = ({
   className,
   data,
   size = "md",
}) => {
   console.log("🚀 ~ data:", data);
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
            "bg-background-200/70 rounded-xl overflow-hidden flex items-center justify-center aspect-square shrink-0",
            className
         )}
         style={{ width: `${sizeMap[size]}rem` }}
      >
         {data?.data ? (
            imgSrc ? (
               <div className="relative overflow-hidden size-full">
                  <img src={imgSrc} className="object-fill size-full" />
                  <div className="absolute inset-0 backdrop-blur-xl">
                     <img src={imgSrc} className="object-contain size-full" />
                  </div>
               </div>
            ) : (
               <Spinner size="lg" />
            )
         ) : (
            <ImageBroken
               weight="bold"
               className="text-current"
               size={`${sizeMap[size] * 0.5}rem`}
            />
         )}
      </div>
   );
};
