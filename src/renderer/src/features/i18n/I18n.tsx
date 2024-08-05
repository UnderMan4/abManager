import { FC, PropsWithChildren, useState } from "react";
import { IntlProvider } from "react-intl";
import useAsyncEffect from "use-async-effect";

import { FullscreenLoader } from "@/components/common/FullscreenLoader";
import { defaultLocale, namespaces } from "@/features/i18n/i18n-config.js";
import { useSettingsStore } from "@/stores";
import { flattenObject } from "@/utils/objectUtils";

export const I18n: FC<PropsWithChildren> = ({ children }) => {
   const { locale } = useSettingsStore();

   const [messages, setMessages] = useState<Record<string, string> | null>(
      null
   );

   useAsyncEffect(async () => {
      setMessages(null);
      try {
         const newMessages = {};

         for (const namespace of namespaces) {
            const messages = await import(
               `../../lang/${locale}/${namespace}.json`
            );
            newMessages[namespace] = messages;
         }

         setMessages(flattenObject(newMessages) as Record<string, string>);
      } catch (error) {
         console.error(`Error loading locale: ${locale}`, error);
      }
   }, [locale]);

   return messages ? (
      <IntlProvider
         locale={locale}
         defaultLocale={defaultLocale}
         messages={messages}
      >
         {children}
      </IntlProvider>
   ) : (
      <FullscreenLoader />
   );
};
