import { DiskSizeOptions, sizeFormatter } from "human-readable";

import { isWindows } from "@/constants";

export const getFileSizeFormatter = <T = string>(
   opts?: Omit<DiskSizeOptions<T>, "std">
) => {
   return sizeFormatter<T>({
      std: isWindows ? "JEDEC" : "IEC",
      ...(opts ?? {}),
   });
};
