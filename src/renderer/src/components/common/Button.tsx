import { ButtonHTMLAttributes, FC } from "react";

import { cls } from "@/utils/styleUtils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   mode?: "solid" | "outline";
   icon?: string;
};

export const Button: FC<ButtonProps> = ({
   className,
   mode = "solid",
   ...props
}) => {
   return <button className={cls("", className)} {...props} />;
};
