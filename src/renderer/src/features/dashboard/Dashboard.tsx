import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type DashboardProps = {
   className?: string;
};

export const Dashboard: FC<DashboardProps> = ({ className }) => {
   return <div className={twMerge("", className)}>Dashboard</div>;
};
