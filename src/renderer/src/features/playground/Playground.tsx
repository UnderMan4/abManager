/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-console */
import {
   Cat,
   CheckCircle,
   Info,
   Warning,
   XCircle,
} from "@phosphor-icons/react";
import { nanoid } from "nanoid";
import React, { FC, useEffect, useState } from "react";

import { ProgressBar, Spinner } from "@/components/common";
import {
   Checkbox,
   Button as OldButton,
   RadioButton,
   RadioGroup,
} from "@/components/forms";
import {
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
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

            <Select>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectSeparator />
                  <SelectItem value="system">System</SelectItem>
                  {Array.from({ length: 30 }, (_, i) => (
                     <SelectItem value={i + ""}>Element {i + 1}</SelectItem>
                  ))}
               </SelectContent>
            </Select>

            <Select>
               <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a timezone" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>North America</SelectLabel>
                     <SelectItem value="est">
                        Eastern Standard Time (EST)
                     </SelectItem>
                     <SelectItem value="cst">
                        Central Standard Time (CST)
                     </SelectItem>
                     <SelectItem value="mst">
                        Mountain Standard Time (MST)
                     </SelectItem>
                     <SelectItem value="pst">
                        Pacific Standard Time (PST)
                     </SelectItem>
                     <SelectItem value="akst">
                        Alaska Standard Time (AKST)
                     </SelectItem>
                     <SelectItem value="hst">
                        Hawaii Standard Time (HST)
                     </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                     <SelectLabel>Europe & Africa</SelectLabel>
                     <SelectItem value="gmt">
                        Greenwich Mean Time (GMT)
                     </SelectItem>
                     <SelectItem value="cet">
                        Central European Time (CET)
                     </SelectItem>
                     <SelectItem value="eet">
                        Eastern European Time (EET)
                     </SelectItem>
                     <SelectItem value="west">
                        Western European Summer Time (WEST)
                     </SelectItem>
                     <SelectItem value="cat">
                        Central Africa Time (CAT)
                     </SelectItem>
                     <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                     <SelectLabel>Asia</SelectLabel>
                     <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                     <SelectItem value="ist">
                        India Standard Time (IST)
                     </SelectItem>
                     <SelectItem value="cst_china">
                        China Standard Time (CST)
                     </SelectItem>
                     <SelectItem value="jst">
                        Japan Standard Time (JST)
                     </SelectItem>
                     <SelectItem value="kst">
                        Korea Standard Time (KST)
                     </SelectItem>
                     <SelectItem value="ist_indonesia">
                        Indonesia Central Standard Time (WITA)
                     </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                     <SelectLabel>Australia & Pacific</SelectLabel>
                     <SelectItem value="awst">
                        Australian Western Standard Time (AWST)
                     </SelectItem>
                     <SelectItem value="acst">
                        Australian Central Standard Time (ACST)
                     </SelectItem>
                     <SelectItem value="aest">
                        Australian Eastern Standard Time (AEST)
                     </SelectItem>
                     <SelectItem value="nzst">
                        New Zealand Standard Time (NZST)
                     </SelectItem>
                     <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                     <SelectLabel>South America</SelectLabel>
                     <SelectItem value="art">Argentina Time (ART)</SelectItem>
                     <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                     <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                     <SelectItem value="clt">
                        Chile Standard Time (CLT)
                     </SelectItem>
                  </SelectGroup>
               </SelectContent>
            </Select>

            <Flexbox>
               <Dialog>
                  <DialogTrigger asChild>
                     <Button>Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                           This action cannot be undone. This will permanently
                           delete your account and remove your data from our
                           servers.
                        </DialogDescription>
                     </DialogHeader>
                  </DialogContent>
               </Dialog>

               <Drawer>
                  <DrawerTrigger asChild>
                     <Button>Open drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                     <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>
                           This action cannot be undone.
                        </DrawerDescription>
                     </DrawerHeader>
                     <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                           <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                     </DrawerFooter>
                  </DrawerContent>
               </Drawer>
            </Flexbox>

            {/* <div className="flex gap-2">
               <Button
                  onClick={() =>
                     prepareToast.error({
                        title: "Error",
                        description:
                           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                     })
                  }
               >
                  <XCircle weight="bold" />
                  Error
               </Button>
               <Button
                  onClick={() =>
                     prepareToast.success({
                        title: "Success",
                        description:
                           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                     })
                  }
               >
                  <CheckCircle weight="bold" />
                  Success
               </Button>
               <Button
                  onClick={() =>
                     prepareToast.info({
                        title: "Info",
                        description:
                           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                     })
                  }
               >
                  <Info weight="bold" />
                  Info
               </Button>
               <Button
                  onClick={() =>
                     prepareToast.warning({
                        title: "Warning",
                        description:
                           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
                     })
                  }
               >
                  <Warning weight="bold" />
                  Warning
               </Button>
            </div>
            <Button
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
            </Button>
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
            </div> */}
         </div>
      </div>
   );
};
