import { I18n } from "@/features/i18n";

export const withI18n = (Component) => {
   return (props) => {
      return (
         <I18n>
            <Component {...props} />
         </I18n>
      );
   };
};
