import { Icon } from "@iconify/react";
import { Settings } from "luxon";
import { FC, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ListBoxItem } from "@/components/common/ListBox";
import { Dropdown } from "@/components/forms";
import { Locale } from "@/features/i18n/i18n-config";
import { useSettingsStore } from "@/stores";

export type LocaleSwitcherProps = {
   className?: string;
};

type LocaleElement = {
   keyLong: Locale;
   keyShort: string;
};

const locales: LocaleElement[] = [
   { keyLong: "en-US", keyShort: "us" },
   { keyLong: "pl-PL", keyShort: "pl" },
];

export const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ className }) => {
   const { setLocale, locale } = useSettingsStore();
   const { formatMessage } = useIntl();

   useEffect(() => {
      Settings.defaultLocale = locale;
   }, [locale]);

   return (
      <Dropdown
         className={className}
         onSelectionChange={(key) => setLocale(key.toString() as Locale)}
         defaultSelectedKey={locale}
         label={<FormattedMessage id="settings.languageSelector.label" />}
      >
         {locales.map(({ keyLong, keyShort }) => (
            <ListBoxItem
               key={keyLong}
               textValue={formatMessage({ id: `settings.locales.${keyLong}` })}
               aria-label={formatMessage({ id: `settings.locales.${keyLong}` })}
            >
               <div className="flex items-center gap-2">
                  <Icon icon={`flagpack:${keyShort}`} />
                  <span>
                     <FormattedMessage id={`settings.locales.${keyLong}`} />
                  </span>
               </div>
            </ListBoxItem>
         ))}
      </Dropdown>
   );
};
