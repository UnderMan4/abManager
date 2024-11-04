import { FC } from "react";

import { Spinner } from "@/components/common";

export const SpinnerPlayground: FC = () => {
   return (
      <div className="flex gap-4">
         <Spinner size="lg" />
         <Spinner size="md" />
         <Spinner size="sm" />
      </div>
   );
};
