/* eslint-disable no-console */
import { Cat } from "@phosphor-icons/react";
import { VariantProps } from "class-variance-authority";
import { nanoid } from "nanoid";
import React, { FC, useEffect, useState } from "react";
import { Item, Section } from "react-stately";

import { Modal, ProgressBar, Spinner } from "@/components/common";
import {
   Checkbox,
   ComboBox,
   Dropdown,
   Button as OldButton,
   RadioButton,
   RadioGroup,
} from "@/components/forms";
import {
   Button,
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui";
import { useSettingsStore } from "@/stores";
import { cls } from "@/utils/styleUtils";
import { prepareToast } from "@/utils/toastUtils";

type FlexboxProps = {
   className?: string;
   children?: React.ReactNode | React.ReactNode[];
   column?: boolean;
};

const paths = Array.from(
   { length: 9 },
   (_, i) =>
      `C:\\Users\\filip\\Downloads\\samples\\0${i + 1} - www.mfiles.co.uk - Ludwig van Beethoven - Title ${i + 1}.mp3`
);

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
   const settings = useSettingsStore();

   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         const random = Math.random() * 7 + 1;
         setProgress((prevProgress) =>
            prevProgress === 100
               ? 0
               : prevProgress + random > 100
                 ? 100
                 : prevProgress + random
         );
      }, 500);

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      const removeImportListener = window.api.import.onMessage(
         (event, data) => {
            console.info(event, data);
         }
      );

      return () => {
         removeImportListener();
      };
   }, []);

   return (
      <div className="p-4">
         <div className="flex flex-col gap-3">
            <Flexbox>
               <OldButton>Button</OldButton>
               <OldButton appearance="outlineColor">Button</OldButton>
               <OldButton appearance="outlineGray">Button</OldButton>
            </Flexbox>

            {(["default", "sm", "lg"] as const).map((size) => (
               <Flexbox>
                  <Button size={size}>Button</Button>
                  <Button size={size} variant="secondary">
                     Button
                  </Button>
                  <Button size={size} variant="ghost">
                     Button
                  </Button>
                  <Button size={size} variant="outline">
                     Button
                  </Button>
                  <Button size={size} variant="destructive">
                     Button
                  </Button>
                  <Button size={size} variant="link">
                     Button
                  </Button>
               </Flexbox>
            ))}

            <Flexbox>
               <Button size="icon">
                  <Cat size={36} weight="bold" />
               </Button>
               <Button size="icon" variant="secondary">
                  <Cat size={36} weight="bold" />
               </Button>
               <Button size="icon" variant="ghost">
                  <Cat size={36} weight="bold" />
               </Button>
               <Button size="icon" variant="outline">
                  <Cat size={36} weight="bold" />
               </Button>
               <Button size="icon" variant="destructive">
                  <Cat size={36} weight="bold" />
               </Button>
               <Button size="icon" variant="link">
                  <Cat size={36} weight="bold" />
               </Button>
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
            {/* <Button onClick={modalState.open}>Open modal</Button>
            <Modal state={modalState} isDismissable>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  iste quaerat? Debitis assumenda iste ex non impedit neque
                  voluptatum quo.
               </p>
            </Modal> */}
            {/* <Modal
               renderTrigger={<Button>Open modal</Button>}
               title="Lorem ipsum dolor sit amet"
            >
               {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
               iure corporis quae obcaecati quos id amet ut qui cumque dolore
               nemo quam ab cum molestiae ipsa dolores quaerat, porro veritatis
               at voluptas perspiciatis sed sint. Illo sit eius aliquam odit
               voluptatibus ea delectus quidem incidunt facere. Commodi nisi
               repellat explicabo?`.repeat(3)}
            </Modal> */}
            <Dialog>
               <DialogTrigger>AAA</DialogTrigger>
               <DialogContent></DialogContent>
            </Dialog>
            <div className="flex gap-2">
               <OldButton
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
               </OldButton>
               <OldButton
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
               </OldButton>
               <OldButton
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
               </OldButton>
               <OldButton
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
               </OldButton>
            </div>
            <OldButton
               onClick={() =>
                  window.api.import.importFiles({
                     id: nanoid(),
                     paths,
                     options: {
                        isOneBook: true,
                     },
                     userSettings: {
                        libraryPath: settings.libraryPath!,
                        saveType: settings.saveType,
                     },
                  })
               }
            >
               Import
            </OldButton>
            <div className="flex flex-col gap-8 mb-5">
               <ProgressBar
                  max={100}
                  value={50}
                  label="Lorem ipsum"
                  status="success"
               />
               <ProgressBar
                  max={100}
                  value={50}
                  label="Lorem ipsum"
                  errorMessage="Lorem ipsum dolor sit emet"
                  status="error"
                  onCanceled={() => console.log("Canceled")}
               />
               <ProgressBar
                  max={100}
                  value={50}
                  label="Lorem ipsum"
                  status="pending"
                  onCanceled={() => console.log("Canceled")}
               />
               <ProgressBar
                  max={100}
                  value={progress}
                  label="Lorem ipsum"
                  displayFormatOptions={{
                     style: "unit",
                     unit: "megabyte",
                  }}
                  timeRemaining={2000 - (2000 * progress) / 100}
               />
            </div>
            <div className="flex gap-4">
               <Spinner size="lg" />
               <Spinner size="md" />
               <Spinner size="sm" />
            </div>
         </div>
      </div>
   );
};
