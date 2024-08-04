import { Icon } from "@iconify/react";
import { FC } from "react";
import { FormattedMessage } from "react-intl";

import { Dropdown } from "@/components/common";
import { ListBoxItem } from "@/components/common/ListBox";
import { Locale } from "@/features/i18n/i18n-config";
import { useSettingsStore } from "@/stores";

export type LocaleSwitcherProps = {
   className?: string;
};

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ className }) => {
   const { setLocale, locale } = useSettingsStore();
   return (
      <Dropdown
         className={className}
         onSelectionChange={(key) => setLocale(key.toString() as Locale)}
         defaultSelectedKey={locale}
      >
         <ListBoxItem key="en-US">
            <div className="flex items-center gap-2">
               <Icon icon="flagpack:us" />
               <span>
                  <FormattedMessage id="settings.locales.en-US" />
               </span>
            </div>
         </ListBoxItem>
         <ListBoxItem key="pl-PL">
            <div className="flex items-center gap-2">
               <Icon icon="flagpack:pl" />
               <span>
                  <FormattedMessage id="settings.locales.pl-PL" />
               </span>
            </div>
         </ListBoxItem>
      </Dropdown>
   );
};
