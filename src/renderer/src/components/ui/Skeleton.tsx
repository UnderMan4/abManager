import { cls } from "@/utils/styleUtils";

function Skeleton({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div
         className={cls("animate-pulse rounded-lg bg-muted", className)}
         {...props}
      />
   );
}

export { Skeleton };
