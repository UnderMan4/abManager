/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-console */
import { FC, ReactNode } from "react";

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui";

import {
   ButtonsPlayground,
   ImportPlayground,
   ModalsPlayground,
   ProgressPlayground,
   RadioCheckboxPlayground,
   SelectPlayground,
   SpinnerPlayground,
   ToastsPlayground,
} from "./components";
import { Flexbox } from "./components/Flexbox";

type Demo = {
   title: string;
   component: ReactNode;
};

const demos: Demo[] = [
   {
      title: "Buttons",
      component: <ButtonsPlayground />,
   },
   {
      title: "Radio & Checkbox",
      component: <RadioCheckboxPlayground />,
   },
   {
      title: "Select",
      component: <SelectPlayground />,
   },
   {
      title: "Modals",
      component: <ModalsPlayground />,
   },
   {
      title: "Toasts",
      component: <ToastsPlayground />,
   },
   {
      title: "Import",
      component: <ImportPlayground />,
   },
   {
      title: "Progress",
      component: <ProgressPlayground />,
   },
   {
      title: "Spinner",
      component: <SpinnerPlayground />,
   },
];

const DemoAccordionItem: FC<{
   title: string;
   component: ReactNode;
   value: string;
}> = ({ title, component, value }) => (
   <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
         <Flexbox column>{component}</Flexbox>
      </AccordionContent>
   </AccordionItem>
);

export const Playground: FC = () => {
   return (
      <div className="p-4">
         <Accordion type="multiple">
            {demos.map(({ component, title }, index) => (
               <DemoAccordionItem
                  key={title}
                  title={title}
                  component={component}
                  value={`accordion-${index}`}
               />
            ))}
         </Accordion>
      </div>
   );
};
