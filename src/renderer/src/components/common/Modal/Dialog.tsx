import { FC, ReactNode, useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

import { Card, CardProps } from "@/components/common/Card";

export type DialogProps = AriaDialogProps & {
   children: ReactNode;
   className?: string;
   cardProps?: Omit<CardProps, "children">;
};

export const Dialog: FC<DialogProps> = (props) => {
   const { children, cardProps: cardOptions } = props;

   const ref = useRef<HTMLDivElement>(null);
   const { dialogProps, titleProps } = useDialog(props, ref);

   return (
      <div {...dialogProps}>
         <Card {...cardOptions} titleId={titleProps.id}>
            {children}
         </Card>
      </div>
   );
};
