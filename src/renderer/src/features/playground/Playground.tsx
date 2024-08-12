import React, { FC } from "react";
import { Item, Section } from "react-stately";

import { Modal, useModalState } from "@/components/common/Modal";
import {
   Button,
   Checkbox,
   ComboBox,
   Dropdown,
   RadioButton,
   RadioGroup,
} from "@/components/forms";
import { cls } from "@/utils/styleUtils";
import { prepareToast } from "@/utils/toastUtils";

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
   const modalState = useModalState({});
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
         <Dropdown disabledKeys={["bbb"]} label="Dropdown">
            <Item key="aaa">aaa</Item>
            <Item key="bbb">bbb</Item>
            <Item>ccc</Item>
            <Item>ddd</Item>
            <Item>eee</Item>
            <Section title="Title">
               <Item>fff</Item>
               <Item>ggg</Item>
               <Item>hhh</Item>
               <Item>iii</Item>
               <Item>jjj</Item>
            </Section>
         </Dropdown>
         <ComboBox label="Combo box">
            <Item key="aaa">aaa</Item>
            <Item key="bbb">bbb</Item>
            <Item>ccc</Item>
            <Item>ddd</Item>
            <Item>eee</Item>
            <Section title="Title">
               <Item>fff</Item>
               <Item>ggg</Item>
               <Item>hhh</Item>
               <Item>iii</Item>
               <Item>jjj</Item>
            </Section>
         </ComboBox>
         <Button onClick={modalState.open}>Open modal</Button>
         <Modal state={modalState} isDismissable>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. At, iste
               quaerat? Debitis assumenda iste ex non impedit neque voluptatum
               quo.
            </p>
         </Modal>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur,
         numquam.
         <div className="flex gap-2">
            <Button
               icon="ph:x-circle-bold"
               onClick={() =>
                  prepareToast.error({
                     title: "Error",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                  })
               }
            >
               Error
            </Button>
            <Button
               icon="ph:check-circle-bold"
               onClick={() =>
                  prepareToast.success({
                     title: "Success",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                  })
               }
            >
               Success
            </Button>
            <Button
               icon="ph:info-bold"
               onClick={() =>
                  prepareToast.info({
                     title: "Info",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                  })
               }
            >
               Info
            </Button>
            <Button
               icon="ph:warning-bold"
               onClick={() =>
                  prepareToast.warning({
                     title: "Warning",
                     description:
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                  })
               }
            >
               Warning
            </Button>
         </div>
      </Flexbox>
   );
};
