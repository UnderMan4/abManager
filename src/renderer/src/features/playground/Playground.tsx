import React, { FC } from "react";

import {
   Button,
   Checkbox,
   Dropdown,
   RadioButton,
   RadioGroup,
} from "@/components/common";
import { DropdownOption } from "@/components/common/Dropdown/DropdownOption";
import { cls } from "@/utils/styleUtils";

type FlexboxProps = {
   className?: string;
   children?: React.ReactNode | React.ReactNode[];
   column?: boolean;
};

const Flexbox: FC<FlexboxProps> = ({ children, className, column }) => {
   return (
      <div
         className={cls(
            "flex gap-4",
            {
               "flex-col": column,
            },
            className
         )}
      >
         {children}
      </div>
   );
};

export const Playground: FC = () => {
   return (
      <Flexbox column>
         <Flexbox>
            <Button>Button</Button>
            <Button appearance="outlineColor">Button</Button>
            <Button appearance="outlineGray">Button</Button>
         </Flexbox>

         <Flexbox>
            <RadioGroup className="flex flex-col gap-3 max-w-md">
               <RadioButton value="option1" label="Option" />
               <RadioButton
                  value="option2"
                  label="Option with tooltip"
                  descriptionAsTooltip
                  description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam corporis a alias, sit animi labore quia voluptatum sequi maxime ad."
               />
               <RadioButton
                  value="option3"
                  label="Option with description"
                  description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam corporis a alias, sit animi labore quia voluptatum sequi maxime ad."
               />
            </RadioGroup>
            <Flexbox column className="max-w-md">
               <Checkbox label="Checkbox" />
               <Checkbox
                  label="Checkbox with tooltip"
                  descriptionAsTooltip
                  description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam corporis a alias, sit animi labore quia voluptatum sequi maxime ad."
               />{" "}
               <Checkbox
                  label="Checkbox with description"
                  description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam corporis a alias, sit animi labore quia voluptatum sequi maxime ad."
               />
            </Flexbox>
         </Flexbox>
         <Dropdown options={{ placeholder: "Select one" }}>
            <DropdownOption>Option 1</DropdownOption>
            <DropdownOption>Option 2</DropdownOption>
            <DropdownOption>Option 3</DropdownOption>
            <DropdownOption.Separator label="Separator" />
            <DropdownOption>Option 4</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
            <DropdownOption>Option 5</DropdownOption>
         </Dropdown>
      </Flexbox>
   );
};
