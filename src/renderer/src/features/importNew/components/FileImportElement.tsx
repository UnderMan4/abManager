import { Icon } from "@iconify/react";
import {
   AnimatePresence,
   Reorder,
   Variants,
   motion,
   useDragControls,
} from "framer-motion";
import { FC } from "react";

import { ArrayCover } from "@/components/common";
import { Heading } from "@/components/common/Heading";
import { IconButton } from "@/components/forms";
import { FileData } from "@/features/importNew";
import { useImportNewFileContext } from "@/hooks/contexts/useImportNewFileContext";
import { cls } from "@/utils/styleUtils";

export type FileImportElementProps = {
   file: FileData;
};

const handleVariants: Variants = {
   hidden: {
      width: 0,
      marginRight: 0,
      opacity: 0,
   },
   visible: {
      width: "1rem",
      marginRight: "0.75rem",
      opacity: 1,
   },
};

export const FileImportElement: FC<FileImportElementProps> = ({ file }) => {
   const controls = useDragControls();

   const title = file.audioMetadata.common?.title;
   const cover = file.audioMetadata.common?.picture?.[0];
   const authors = file.audioMetadata.common?.artists;
   const series = file.audioMetadata.common?.album;
   const seriesPart = file.audioMetadata.common?.track.no;
   const filename = window.path.basename(file.path);

   const { setSelectedFile, options } = useImportNewFileContext();
   return (
      <Reorder.Item
         value={file}
         className={cls("flex bg-radix-gray-400 p-3 rounded-2xl w-full")}
         dragListener={false}
         dragControls={controls}
         key={file.path}
      >
         <AnimatePresence>
            {options.isOneBook && (
               <motion.div
                  className="flex flex-col center select-none justify-between overflow-hidden cursor-grab"
                  variants={handleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  onPointerDown={(e) => controls.start(e)}
               >
                  <Icon icon="ph:dots-six-vertical-bold" height="1.2rem" />
               </motion.div>
            )}
         </AnimatePresence>
         <ArrayCover
            data={cover}
            className="pointer-events-none self-center mr-3"
         />
         <div className="min-w-0 flex-1 mr-3">
            <Heading as="h4" className="truncate">
               {title}
            </Heading>
            <p className="text-radix-gray-1100 text-sm truncate">
               {authors?.join(", ")}
            </p>
            {series && (
               <p className="truncate">
                  {series}
                  {seriesPart && ` ${seriesPart}`}
               </p>
            )}
            <p className="text-radix-gray-1100 truncate">{filename}</p>
         </div>
         <div className="flex flex-col center">
            <IconButton
               icon="ph:notebook-bold"
               className="grow-0"
               appearance="outlineColor"
               onClick={() => setSelectedFile(file)}
            />
         </div>
      </Reorder.Item>
   );
};
