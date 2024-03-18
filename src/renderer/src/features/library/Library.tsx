import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type LibraryProps = {
   className?: string;
};

export const Library: FC<LibraryProps> = ({ className }) => {
   return <div className={twMerge("grow", className)}></div>;
};
