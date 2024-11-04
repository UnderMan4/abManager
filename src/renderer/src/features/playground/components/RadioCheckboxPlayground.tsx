import { FC } from "react";

import { Checkbox, RadioButton, RadioGroup } from "@/components/forms";

import { Flexbox } from "./Flexbox";

export const RadioCheckboxPlayground: FC = () => {
   return (
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
   );
};
