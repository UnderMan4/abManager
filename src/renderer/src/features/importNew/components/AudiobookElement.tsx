import { Bone, Circle, Dot, DotOutline, Skull } from "@phosphor-icons/react";
import { FC } from "react";

import { ArrayCover } from "@/components/common";
import { cls } from "@/utils/styleUtils";

import { FileData } from "../ImportNewFile";

export type AudiobookElementProps = {
   className?: string;
   data: FileData;
};

export const AudiobookElement: FC<AudiobookElementProps> = ({
   className,
   data,
}) => {
   const title = data.audioMetadata.common?.title;
   const cover = data.audioMetadata.common?.picture?.[0];
   const authors = data.audioMetadata.common?.artists;
   const series = data.audioMetadata.common?.album;
   const year = data.audioMetadata.common?.year;
   const seriesPart = data.audioMetadata.common?.track.no;
   const filename = window.path.basename(data.path);
   const description =
      data.audioMetadata.common?.description ||
      data.audioMetadata.common?.comment;
   const fileSize = data.stats.size;
   const fileSizeMegabytes = fileSize / 1024 / 1024;
   const fileSizeGigabytes = fileSizeMegabytes / 1024;
   const quality = data.audioMetadata.format?.bitrate;
   const duration = data.audioMetadata.format?.duration;
   return (
      <div className={cls("flex gap-2 w-full", className)}>
         <ArrayCover data={cover} />
         <div className="grow-0 overflow-hidden pr-2">
            <h3 className="text-xl font-bold truncate">{title}</h3>
            <h4 className="text-">
               {authors?.map((author, index) => (
                  <>
                     {index > 0 && (
                        <DotOutline
                           weight="fill"
                           size="1em"
                           className="inline-block mx-[0.1rem]"
                        />
                     )}
                     <span>{author}</span>
                  </>
               ))}
            </h4>
            {series && (
               <p>
                  {series} {seriesPart && `[${seriesPart}]`}
               </p>
            )}
         </div>
      </div>
   );
};

export const AudiobookSkeleton: FC = () => {
   return (
      <div className="flex">
         <Bone size={36} weight="bold" />
         <Skull size={36} weight="bold" />
         <Bone size={36} weight="bold" />
      </div>
   );
};
