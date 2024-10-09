import { FC } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = {
   className?: string;
   size?: SpinnerSize | number;
};

const sizeMap: Record<SpinnerSize, number> = {
   sm: 1,
   md: 2,
   lg: 3,
};

export const Spinner: FC<SpinnerProps> = ({ className, size = "md" }) => {
   const sizeValue =
      typeof size === "number" ? `${size}px` : `${sizeMap[size]}em`;

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={sizeValue}
         height={sizeValue}
         viewBox="0 0 24 24"
         className={className}
      >
         <path
            fill="currentColor"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
         >
            <animateTransform
               attributeName="transform"
               dur="1s"
               repeatCount="indefinite"
               type="rotate"
               values="0 12 12;360 12 12"
            />
         </path>
      </svg>
   );
};
