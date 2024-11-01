import { Icon } from "@iconify/react";
import { Settings } from "luxon";
import { FC, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui";
import { Locale } from "@/features/i18n/i18n-config";
import { useSettingsStore } from "@/stores";

type LocaleElement = {
   keyLong: Locale;
   keyShort: string;
};

const locales: LocaleElement[] = [
   { keyLong: "en-US", keyShort: "us" },
   { keyLong: "pl-PL", keyShort: "pl" },
];

export const LocaleSwitcher: FC = () => {
   const { setLocale, locale } = useSettingsStore();
   const { formatMessage } = useIntl();

   useEffect(() => {
      Settings.defaultLocale = locale;
   }, [locale]);

   return (
      <Select
         onValueChange={(key) => setLocale(key.toString() as Locale)}
         defaultValue={locale}
      >
         <SelectTrigger>
            <SelectValue
               placeholder={
                  <FormattedMessage id="settings.languageSelector.label" />
               }
            />
         </SelectTrigger>
         <SelectContent>
            {locales.map(({ keyLong, keyShort }) => (
               <SelectItem
                  key={keyLong}
                  value={keyLong}
                  aria-label={formatMessage({
                     id: `settings.locales.${keyLong}`,
                  })}
               >
                  <div className="flex items-center gap-2">
                     <Icon icon={`flagpack:${keyShort}`} />
                     <span>
                        <FormattedMessage id={`settings.locales.${keyLong}`} />
                     </span>
                  </div>
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};
