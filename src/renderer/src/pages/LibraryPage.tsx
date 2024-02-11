import { Button } from "@radix-ui/themes";
import { FC, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useSettingsStore } from "@/stores";

export type LibraryPageProps = {
   className?: string;
};

export const LibraryPage: FC<LibraryPageProps> = ({ className }) => {
   const { libraryPath } = useSettingsStore();

   const navigate = useNavigate();

   useLayoutEffect(() => {
      if (!libraryPath) {
         navigate("/first-setup", { replace: true });
      }
   }, [libraryPath]);

   return (
      <div className={twMerge("", className)}>
         <Link to="/first-setup">
            <Button>Setup page</Button>
         </Link>
      </div>
   );
};
