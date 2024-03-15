import React, { FC, ReactElement } from "react";
import { AriaRadioGroupProps, useRadioGroup } from "react-aria";
import { RadioGroupState, useRadioGroupState } from "react-stately";

import { RadioButton } from "@/components/common/RadioGroup/RadioButton";

export type RadioGroupProps = AriaRadioGroupProps & {
   className?: string;
   children: ReactElement<typeof RadioButton>[];
};

export const RadioContext = React.createContext<RadioGroupState | null>(null);

export const RadioGroup: FC<RadioGroupProps> = ({
   className,
   children,
   ...props
}) => {
   const state = useRadioGroupState(props);
   const { radioGroupProps } = useRadioGroup(props, state);
   return (
      <div {...radioGroupProps} className={className}>
         <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
   );
};
