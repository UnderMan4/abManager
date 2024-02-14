import { DiskSizeOptions, sizeFormatter } from "human-readable";

import { isWindows } from "@/constants";

export const getFileSizeFormatter = <T>(
   opts?: Omit<DiskSizeOptions<T>, "std"> 
) => {
   return sizeFormatter({
      std: isWindows ? "JEDEC" : "IEC",
        ...(opts ??{}),
   });
};

