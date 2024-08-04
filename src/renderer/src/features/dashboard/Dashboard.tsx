import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { twMerge } from "tailwind-merge";

import { LocaleSwitcher } from "@/features/i18n";

export type DashboardProps = {
   className?: string;
};

export const Dashboard: FC<DashboardProps> = ({ className }) => {
   return (
      <div className={twMerge("", className)}>
         <FormattedMessage id="common.aaa.test" />
         <LocaleSwitcher />
      </div>
   );
};
