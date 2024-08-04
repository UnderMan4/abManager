import { Icon } from "@iconify/react";
import { FC } from "react";

import { Dropdown } from "@/components/common";
import { ListBoxItem } from "@/components/common/ListBox";
import { Locale } from "@/features/i18n/i18n-config";
import { useSettingsStore } from "@/stores";

export type LocaleSwitcherProps = {
   className?: string;
};

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ className }) => {
   const { setLocale } = useSettingsStore();
   return (
      <Dropdown
         className={className}
         onSelectionChange={(key) => setLocale(key.toString() as Locale)}
      >
         <ListBoxItem key="pl-PL">
            <div className="flex items-center gap-2">
               <Icon icon="flagpack:pl" />
               <span>Polish</span>
            </div>
         </ListBoxItem>
         <ListBoxItem key="en-US">
            <div className="flex items-center gap-2">
               <Icon icon="flagpack:us" />
               <span>English</span>
            </div>
         </ListBoxItem>
      </Dropdown>
   );
};
