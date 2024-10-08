import { AnimatePresence, Variants, motion } from "framer-motion";
import _ from "lodash";
import { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, Checkbox } from "@/components/forms";
import { useImportNewFileContext } from "@/hooks/contexts/useImportNewFileContext";
import { cls } from "@/utils/styleUtils";

const sortVariants: Variants = {
   hidden: {
      height: 0,
      paddingBlock: 0,
   },
   visible: {
      height: "auto",
      paddingBlock: "0.5rem",
   },
};

export const ImportNewFileOptions: FC = () => {
   const { formatMessage } = useIntl();
   const { options, setOptions, setFiles } = useImportNewFileContext();

   const sortByTitle = () => {
      setFiles((files) =>
         _.sortBy(files, (file) => file.audioMetadata.common?.title)
      );
   };

   const sortByNumberInSeries = () => {
      setFiles((files) =>
         _.sortBy(files, (file) => file.audioMetadata.common?.track.no)
      );
   };

   const sortByFilename = () => {
      setFiles((files) =>
         _.sortBy(files, (file) => window.path.basename(file.path))
      );
   };
   return (
      <div className={cls("")}>
         <Checkbox
            label={formatMessage({ id: "importNew.options.oneBook.label" })}
            description={formatMessage({
               id: "importNew.options.oneBook.description",
            })}
            descriptionAsTooltip
            isSelected={options.isOneBook}
            onChange={(value) => setOptions({ isOneBook: value })}
         />
         <AnimatePresence>
            {options.isOneBook && (
               <motion.div
                  className="overflow-hidden flex flex-col gap-1"
                  variants={sortVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
               >
                  <p className="">
                     <FormattedMessage id="importNew.options.sort.label" />
                  </p>
                  <div className="flex flex-wrap gap-3">
                     <Button onClick={sortByTitle} mini>
                        <FormattedMessage id="importNew.options.sort.byTitle" />
                     </Button>
                     <Button onClick={sortByFilename} mini>
                        <FormattedMessage id="importNew.options.sort.byFilename" />
                     </Button>
                     <Button onClick={sortByNumberInSeries} mini>
                        <FormattedMessage id="importNew.options.sort.byTrackNumber" />
                     </Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};
