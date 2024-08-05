import { FC, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

import { useAppNavigate } from "@/hooks";

import { MethodButton } from "./components/MethodButton";

const MAX_BUTTON_HEIGHT = 32;
const MAX_BUTTON_WIDTH = 22;
export const ImportNewMethod: FC = () => {
   const navigate = useAppNavigate();

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

   return (
      <div className="center h-full gap-16" ref={ref}>
         <MethodButton
            icon="ph:file-bold"
            onClick={() => navigate("/import-new/file")}
            maxHeight={buttonHeight}
            maxWidth={buttonWidth}
         >
            <FormattedMessage id="navbar.addNew.selectFile" />
         </MethodButton>
         <MethodButton
            icon="ph:folder-open-bold"
            onClick={() => navigate("/import-new/folder")}
            maxHeight={buttonHeight}
            maxWidth={buttonWidth}
         >
            <FormattedMessage id="navbar.addNew.selectFolder" />
         </MethodButton>
      </div>
   );
};
