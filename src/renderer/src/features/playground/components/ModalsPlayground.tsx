import {
   AlignBottomSimple,
   AlignRightSimple,
   AlignTopSimple,
} from "@phosphor-icons/react";
import { AlignLeftSimple } from "@phosphor-icons/react/dist/ssr";
import { FC, useState } from "react";

import { Checkbox } from "@/components/forms";
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
   DrawerPosition,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui";

import { Flexbox } from "./Flexbox";

type DrawerDemoProps = {
   position: DrawerPosition;
   hideHandle?: boolean;
};

const drawerDemoIcon: Record<DrawerPosition, React.ReactNode> = {
   top: <AlignTopSimple weight="bold" />,
   right: <AlignRightSimple weight="bold" />,
   bottom: <AlignBottomSimple weight="bold" />,
   left: <AlignLeftSimple weight="bold" />,
};

const DrawerDemo: FC<DrawerDemoProps> = ({ position, hideHandle }) => (
   <Drawer position={position} hideHandle={hideHandle}>
      <DrawerTrigger asChild>
         <Button size="icon">{drawerDemoIcon[position]}</Button>
      </DrawerTrigger>
      <DrawerContent>
         <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
         </DrawerHeader>
         <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
               <Button variant="outline">Cancel</Button>
            </DrawerClose>
         </DrawerFooter>
      </DrawerContent>
   </Drawer>
);

export const ModalsPlayground: FC = () => {
   const [hideDrawerHandle, setHideDrawerHandle] = useState(false);

   return (
      <>
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
         </Flexbox>
         <Flexbox column>
            <Flexbox>
               <h4 className="font-bold">Open dialog:</h4>
               <Checkbox
                  isSelected={hideDrawerHandle}
                  onChange={setHideDrawerHandle}
                  label="Hide drawer handle"
               />
            </Flexbox>
            <div className="grid grid-cols-3 grid-rows-3 w-max gap-2">
               <div className="col-start-2">
                  <DrawerDemo position="top" hideHandle={hideDrawerHandle} />
               </div>
               <div className="col-start-3 row-start-2">
                  <DrawerDemo position="right" hideHandle={hideDrawerHandle} />
               </div>
               <div className="col-start-2 row-start-3">
                  <DrawerDemo position="bottom" hideHandle={hideDrawerHandle} />
               </div>
               <div className="row-start-2">
                  <DrawerDemo position="left" hideHandle={hideDrawerHandle} />
               </div>
            </div>
         </Flexbox>
      </>
   );
};
