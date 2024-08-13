import { Duration } from "luxon";
import { FC } from "react";
import { useIntl } from "react-intl";

import { ArrayCover, Heading } from "@/components/common";
import { useImportNewFileContext } from "@/hooks/contexts/useImportNewFileContext";
import { cls } from "@/utils/styleUtils";

import { AudiobookDetailsElement } from "./AudiobookDetailsElement";

export type AudiobookDetailsProps = {
   className?: string;
};

export const AudiobookDetails: FC<AudiobookDetailsProps> = ({ className }) => {
   const { selectedFile } = useImportNewFileContext();

   const { formatMessage, formatNumber } = useIntl();

   if (!selectedFile) return null;

   const title = selectedFile.audioMetadata.common?.title;
   const cover = selectedFile.audioMetadata.common?.picture?.[0];
   const authors = selectedFile.audioMetadata.common?.artists;
   const series = selectedFile.audioMetadata.common?.album;
   const year = selectedFile.audioMetadata.common?.year;
   const seriesPart = selectedFile.audioMetadata.common?.track.no;
   const filename = window.path.basename(selectedFile.path);
   const description =
      selectedFile.audioMetadata.common?.description ||
      selectedFile.audioMetadata.common?.comment;
   const fileSize = selectedFile.stats.size;
   const fileSizeMegabytes = fileSize / 1024 / 1024;
   const fileSizeGigabytes = fileSizeMegabytes / 1024;
   const quality = selectedFile.audioMetadata.format?.bitrate;
   const duration = selectedFile.audioMetadata.format?.duration;

   return (
      <div className={cls("flex flex-col gap-5", className)}>
         <div className="flex gap-5 flex-wrap">
            <ArrayCover data={cover} size="xl" />
            <div>
               <Heading as="h3">{title}</Heading>
               <p className="text-lg ">{authors?.join(", ")}</p>
            </div>
         </div>
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.series" })}
            value={
               series
                  ? `${series}${seriesPart ? ` [${seriesPart}]` : ""}`
                  : undefined
            }
            description={formatMessage({ id: "importNew.details.seriesDesc" })}
         />
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.duration" })}
            value={
               duration
                  ? Duration.fromObject({ seconds: duration }).toFormat(
                       "hh:mm:ss",
                       {
                          floor: true,
                       }
                    )
                  : undefined
            }
         />
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.year" })}
            value={year}
         />
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.description" })}
            value={description}
            description={formatMessage({
               id: "importNew.details.descriptionDesc",
            })}
         />
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.bitrate" })}
            value={
               quality
                  ? formatNumber(quality / 1000, {
                       style: "unit",
                       unit: "kilobit-per-second",
                    })
                  : undefined
            }
         />
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.filename" })}
            value={filename}
         />
         <AudiobookDetailsElement
            label={formatMessage({ id: "importNew.details.fileSize" })}
            value={
               fileSizeGigabytes > 1
                  ? formatNumber(fileSizeGigabytes, {
                       style: "unit",
                       unit: "gigabyte",
                    })
                  : formatNumber(fileSizeMegabytes, {
                       style: "unit",
                       unit: "megabyte",
                    })
            }
         />
      </div>
   );
};
