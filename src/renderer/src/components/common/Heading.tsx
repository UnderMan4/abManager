import { PolymorphicPropsWithoutRef } from "react-polymorphic-types";
import { twMerge } from "tailwind-merge";

export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingOwnProps = unknown;

export type HeadingProps<T extends HeadingTagName = "h1"> =
   PolymorphicPropsWithoutRef<HeadingOwnProps, T>;

const headingSizes: Record<HeadingTagName, string> = {
   h1: "text-4xl",
   h2: "text-3xl",
   h3: "text-2xl",
   h4: "text-xl",
   h5: "text-lg",
   h6: "text-base",
};

export const Heading = <T extends HeadingTagName = "h1">({
   as,
   className,
   ...props
}: HeadingProps<T>) => {
   const Component: HeadingTagName = as ?? "h1";
   return (
      <Component
         className={twMerge(
            "text-radix-gray-1200",
            headingSizes[as ?? "h1"],
            className
         )}
         {...props}
      />
   );
};
