import { Icon } from "@iconify/react";
import { FC, InputHTMLAttributes, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useEventListener } from "usehooks-ts";

import { cls } from "@/utils/styleUtils";

export type FolderSelectorProps = Omit<
   InputHTMLAttributes<HTMLInputElement>,
   "className" | "onChange"
> & {
   inputClassName?: string;
   className?: string;
   onChange?: (e: { path: string }) => void;
};

export const FolderSelector: FC<FolderSelectorProps> = ({
   className,
   inputClassName,
   onChange,
   ...inputProps
}) => {
   const inputRef = useRef<HTMLInputElement>(null);
   useEventListener(
      "change",
      (e) =>
         onChange?.({
            path: (e.target as HTMLInputElement).value,
         }),
      inputRef
   );

   return (
      <div
         className={twMerge(
            "border border-radix-gray-700 rounded-xl flex",
            className
         )}
      >
         <div className="px-4 py-2 grow flex">
            <input
               type="text"
               className={cls(
                  "bg-transparent p-0 border-none grow text-radix-gray-1200"
               )}
               ref={inputRef}
               onChange={(e) => onChange?.({ path: e.target.value })}
               disabled
               {...inputProps}
            />
         </div>
         <button
            className="bg-radix-gray-600 rounded-r-[calc(0.75rem-1px)] px-3"
            onClick={async () => {
               const selectedDir = (
                  await window.api.showOpenDialog({
                     properties: ["openDirectory"],
                  })
               ).filePaths[0];

               if (selectedDir && inputRef.current) {
                  onChange?.({
                     path: selectedDir,
                  });
               }
            }}
         >
            <Icon
               icon="ph:folder-bold"
               className="text-radix-gray-1200"
               height="1.3rem"
            />
         </button>
      </div>
   );
};
