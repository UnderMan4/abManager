import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type FinishCardProps = {
   className?: string;
};

export const FinishCard: FC<FinishCardProps> = ({ className }) => {
   return <div className={twMerge("", className)}>FinishCard</div>;
};
