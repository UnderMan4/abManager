import { CheckCircle, Info, Warning, XCircle } from "@phosphor-icons/react";
import { FC } from "react";

import { Button } from "@/components/ui";
import { prepareToast } from "@/utils/toastUtils";

export const ToastsPlayground: FC = () => {
   return (
      <div className="flex gap-2">
         <Button
            onClick={() =>
               prepareToast.error({
                  title: "Error",
                  description:
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
               })
            }
         >
            <XCircle weight="bold" />
            Error
         </Button>
         <Button
            onClick={() =>
               prepareToast.success({
                  title: "Success",
                  description:
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
               })
            }
         >
            <CheckCircle weight="bold" />
            Success
         </Button>
         <Button
            onClick={() =>
               prepareToast.info({
                  title: "Info",
                  description:
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
               })
            }
         >
            <Info weight="bold" />
            Info
         </Button>
         <Button
            onClick={() =>
               prepareToast.warning({
                  title: "Warning",
                  description:
                     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, numquam.",
               })
            }
         >
            <Warning weight="bold" />
            Warning
         </Button>
      </div>
   );
};
