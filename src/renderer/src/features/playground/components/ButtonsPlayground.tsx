import { Cat } from "@phosphor-icons/react";
import { FC } from "react";

import { Button } from "@/components/ui";

import { Flexbox } from "./Flexbox";

export const ButtonsPlayground: FC = () => {
   return (
      <>
         {(["default", "sm", "lg"] as const).map((size) => (
            <Flexbox key={size}>
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
      </>
   );
};
