import { FC } from "react";
import { twMerge } from "tailwind-merge";

import { NavBar } from "@/features/library/components/NavBar";

export type LibraryProps = {
   className?: string;
};

export const Library: FC<LibraryProps> = ({ className }) => {
   return <div className={twMerge("w-full h-screen flex", className)}></div>;
};
