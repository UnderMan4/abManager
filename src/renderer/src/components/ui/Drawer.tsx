import { cva } from "class-variance-authority";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { useSafeContext } from "@/hooks";
import { cls } from "@/utils/styleUtils";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

export type DrawerProps = Omit<
   React.ComponentProps<typeof DrawerPrimitive.Root>,
   "direction"
> & {
   position?: DrawerPosition;
   hideHandle?: boolean;
};

type DrawerContextState = {
   position: DrawerPosition;
   hideHandle?: boolean;
};

const DrawerContext = React.createContext<DrawerContextState | null>(null);

const Drawer = ({
   shouldScaleBackground = true,
   position = "right",
   hideHandle,
   ...props
}: DrawerProps) => (
   <DrawerContext.Provider
      value={{
         position,
         hideHandle,
      }}
   >
      {/* @ts-expect-error - `fadeFromIndex` is not necessary for Drawer */}
      <DrawerPrimitive.Root
         shouldScaleBackground={shouldScaleBackground}
         direction={position}
         {...props}
      />
   </DrawerContext.Provider>
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Overlay
      ref={ref}
      className={cls("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
   />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const drawerVariants = cva("fixed z-50 flex bg-background border", {
   variants: {
      position: {
         left: "inset-y-0 left-0 w-auto my-6 rounded-r-2xl flex-row-reverse",
         right: "inset-y-0 right-0 w-auto my-6 rounded-l-2xl flex-row",
         top: "inset-x-0 top-0 mx-6 h-auto rounded-b-2xl flex-col-reverse",
         bottom: "inset-x-0 bottom-0 mx-6 h-auto rounded-t-2xl flex-col",
      },
   },
   defaultVariants: {
      position: "right",
   },
});

const DrawerContent = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
   const { position, hideHandle } = useSafeContext(
      DrawerContext,
      "DrawerContext should be used within Drawer component"
   );
   return (
      <DrawerPortal>
         <DrawerOverlay />
         <DrawerPrimitive.Content
            ref={ref}
            className={cls(drawerVariants({ position, className }))}
            {...props}
         >
            {!hideHandle && (
               <div
                  className={cls(" h-2 w-[100px] rounded-full bg-muted", {
                     "mt-4": position === "bottom",
                     "mb-4": position === "top",
                     "ml-4": position === "right",
                     "mr-4": position === "left",
                     "w-[100px] h-2 mx-auto": position.is("top", "bottom"),
                     "h-[100px] w-2 my-auto": position.is("left", "right"),
                  })}
               />
            )}
            <div className="flex flex-col">{children}</div>
         </DrawerPrimitive.Content>
      </DrawerPortal>
   );
});
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cls("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
   />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cls("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
   />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Title
      ref={ref}
      className={cls(
         "text-lg font-semibold leading-none tracking-tight",
         className
      )}
      {...props}
   />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Description
      ref={ref}
      className={cls("text-sm text-muted-foreground", className)}
      {...props}
   />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
   Drawer,
   DrawerPortal,
   DrawerOverlay,
   DrawerTrigger,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerFooter,
   DrawerTitle,
   DrawerDescription,
};
