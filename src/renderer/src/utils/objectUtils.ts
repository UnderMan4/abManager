export type FlattenObjectOptions = {
   prefix?: string;
   separator?: string;
};

export const flattenObject = (
   obj: object,
   options: FlattenObjectOptions = {
      prefix: "",
      separator: ".",
   }
): Record<string, unknown> => {
   const flattened: Record<string, unknown> = {};

   Object.entries(obj).forEach(([key, value]) => {
      const prefixedKey = options.prefix
         ? `${options.prefix}${options.separator}${key}`
         : key;

      if (
         typeof value === "object" &&
         !Array.isArray(value) &&
         value !== null
      ) {
         Object.assign(
            flattened,
            flattenObject(value, { ...options, prefix: prefixedKey })
         );
      } else {
         flattened[prefixedKey] = value;
      }
   });

   return flattened;
};
