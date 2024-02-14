import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

export const useAppForm = <T extends z.ZodRawShape>(
   schema: z.ZodObject<T>,
   defaultValues?: DefaultValues<z.infer<typeof schema>>
) => {
   const form = useForm<z.infer<typeof schema>>({
      defaultValues,
      resolver: zodResolver(schema),
      mode: "onChange",
   });
   return form;
};
