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
         <Dropdown
            options={{
               placeholder:
                  "Commodo labore eiusmod eiusmod irure ex exercitation adipisicing laborum do elit dolore.",
            }}
         >
            <DropdownOption value="option1">Option 1</DropdownOption>
            <DropdownOption value="option2">Option 2</DropdownOption>
            <DropdownOption value="option3">Option 3</DropdownOption>
            <DropdownOption.Separator label="Separator" />
            <DropdownOption value="option4">Option 4</DropdownOption>
            <DropdownOption value="option5">Option 5</DropdownOption>
            <DropdownOption value="option6">Option 6</DropdownOption>
            <DropdownOption value="option7">Option 7</DropdownOption>
            <DropdownOption value="option8">Option 8</DropdownOption>
            <DropdownOption value="option9">Option 9</DropdownOption>
            <DropdownOption value="option10">Option 10</DropdownOption>
            <DropdownOption value="option11">Option 11</DropdownOption>
            <DropdownOption value="option12">Option 12</DropdownOption>
            <DropdownOption value="option13">Option 13</DropdownOption>
            <DropdownOption value="option14">Option 14</DropdownOption>
         </Dropdown>
         <Dropdown
            options={{
               multiselect: true,
               placeholder:
                  "Commodo labore eiusmod eiusmod irure ex exercitation adipisicing laborum do elit dolore.",
            }}
         >
            <DropdownOption value="option1">
               Option 1 Commodo labore eiusmod eiusmod irure ex
            </DropdownOption>
            <DropdownOption value="option2">Option 2</DropdownOption>
            <DropdownOption value="option3">Option 3</DropdownOption>
            <DropdownOption.Separator label="Separator" />
            <DropdownOption value="option4">Option 4</DropdownOption>
            <DropdownOption value="option5">Option 5</DropdownOption>
            <DropdownOption value="option6">Option 6</DropdownOption>
            <DropdownOption value="option7">Option 7</DropdownOption>
            <DropdownOption.Separator />
            <DropdownOption value="option8">Option 8</DropdownOption>
            <DropdownOption value="option9">Option 9</DropdownOption>
            <DropdownOption value="option10">Option 10</DropdownOption>
            <DropdownOption value="option11">Option 11</DropdownOption>
            <DropdownOption value="option12">Option 12</DropdownOption>
            <DropdownOption value="option13">Option 13</DropdownOption>
            <DropdownOption value="option14">Option 14</DropdownOption>
         </Dropdown>
      </Flexbox>
   );
};
