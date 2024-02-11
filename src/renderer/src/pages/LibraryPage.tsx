import { FC } from "react";

import { Button, Card } from "@/components/common";
import { useSettingsStore } from "@/stores";

export type LibraryPageProps = {
   className?: string;
};

export const LibraryPage: FC<LibraryPageProps> = ({ className }) => {
   const { libraryPath } = useSettingsStore();

   // const navigate = useNavigate();

   // useLayoutEffect(() => {
   //    // if (!libraryPath) {
   //    navigate("/first-setup", { replace: true });
   //    // }
   // }, [libraryPath]);

   return libraryPath ? (
      <div className="h-full w-full flex items-center justify-center"></div>
   ) : (
      <>
         <Card>
            <Button>Lorem, ipsum.</Button>
         </Card>
      </>
   );
};
