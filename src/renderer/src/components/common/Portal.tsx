import React, { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

export type PortalProps = {
   portalId: "modal" | "tooltip" | "dropdown" | "contextMenu";
   children: ReactNode;
};

export const Portal: FC<PortalProps> = ({ portalId, children }) => {
   const modalRoot = document.getElementById(portalId);

   const elementRef = React.useRef<HTMLDivElement>(
      document.createElement("div")
   );

   useEffect(() => {
      modalRoot?.appendChild(elementRef.current);
      return () => {
         modalRoot?.removeChild(elementRef.current);
      };
   }, []);

   return createPortal(children, elementRef.current);
};
