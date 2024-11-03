import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { FullscreenLoader } from "@/components/common";
import { AUDIO_FILES_EXTENSIONS } from "@/constants";
import { useAppNavigate } from "@/hooks";
import { prepareToast } from "@/utils/toastUtils";

import { MethodButton } from "../components/MethodButton";

const MAX_BUTTON_HEIGHT = 32;
const MAX_BUTTON_WIDTH = 22;
export const ImportNewMethod: FC = () => {
   const navigate = useAppNavigate();

   const { formatMessage } = useIntl();

   const ref = useRef<HTMLDivElement>(null);

   const [buttonHeight, setButtonHeight] = useState(32);
   const [buttonWidth, setButtonWidth] = useState(22);

   useEffect(() => {
      const handleResize = () => {
         if (ref.current) {
            const containerHeight = ref.current.clientHeight / 16;
            const containerWidth = ref.current.clientWidth / 16;

            const newButtonHeight = Math.min(
               containerHeight - 4,
               MAX_BUTTON_HEIGHT
            );
            const newButtonWidth = Math.min(
               (containerWidth - 4) / 2 - 4,
               MAX_BUTTON_WIDTH
            );

            setButtonHeight(newButtonHeight);
            setButtonWidth(newButtonWidth);
         }
      };

      window.addEventListener("resize", handleResize);
      handleResize(); // Call initially to set the size based on initial container size

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const [canOpenDialog, setCanOpenDialog] = useState(true);

   const selectFile = useCallback(async () => {
      if (!canOpenDialog) return;

      setCanOpenDialog(false);
      const result = await window.api.showOpenDialog({
         properties: ["multiSelections", "openFile"],
         title: formatMessage({ id: "importNew.selectFilesWindow.title" }),
         buttonLabel: formatMessage({
            id: "importNew.selectFilesWindow.button",
         }),
         filters: [
            {
               name: formatMessage({
                  id: "importNew.selectFilesWindow.filterName",
               }),
               extensions: AUDIO_FILES_EXTENSIONS,
            },
         ],
      });
      setCanOpenDialog(true);
      if (!result || result.canceled) return;
      const paths = result.filePaths;
      navigate("/import-new/file", { state: { paths } });
   }, [navigate]);

   const selectFolder = useCallback(async () => {
      prepareToast.info({
         title: formatMessage({ id: "toasts.info.comingSoon.title" }),
         description: formatMessage({
            id: "toasts.info.comingSoon.description",
         }),
         id: "comingSoon",
      });

      return;

      if (!canOpenDialog) return;

      setCanOpenDialog(false);
      const result = await window.api.showOpenDialog({
         properties: ["openDirectory"],
      });
      setCanOpenDialog(true);

      if (!result || result.canceled) return;

      const paths = result.filePaths;
      navigate("/import-new/folder", { state: { paths } });
   }, [navigate]);

   if (!canOpenDialog) {
      return (
         <FullscreenLoader
            translucent
            description={formatMessage({ id: "importNew.selectFilesMessage" })}
         />
      );
   }
   return (
      <>
         {!canOpenDialog && (
            <FullscreenLoader
               translucent
               description={formatMessage({
                  id: "importNew.selectFilesMessage",
               })}
            />
         )}
         <div className="center h-full gap-16" ref={ref}>
            <MethodButton
               icon="ph:file-bold"
               onClick={selectFile}
               maxHeight={buttonHeight}
               maxWidth={buttonWidth}
            >
               <FormattedMessage id="navbar.addNew.selectFile" />
            </MethodButton>
            <MethodButton
               icon="ph:folder-open-bold"
               onClick={selectFolder}
               maxHeight={buttonHeight}
               maxWidth={buttonWidth}
            >
               <FormattedMessage id="navbar.addNew.selectFolder" />
            </MethodButton>
         </div>
      </>
   );
};
