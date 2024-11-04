import { FC } from "react";

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
} from "@/components/ui";

export const SelectPlayground: FC = () => {
   return (
      <>
         <Select>
            <SelectTrigger className="w-[180px]">
               <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="light">Light</SelectItem>
               <SelectItem value="dark">Dark</SelectItem>
               <SelectSeparator />
               <SelectItem value="system">System</SelectItem>
               {Array.from({ length: 30 }, (_, i) => (
                  <SelectItem key={`select-${i + 1}`} value={i + ""}>
                     Element {i + 1}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         <Select>
            <SelectTrigger className="w-[280px]">
               <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">
                     Eastern Standard Time (EST)
                  </SelectItem>
                  <SelectItem value="cst">
                     Central Standard Time (CST)
                  </SelectItem>
                  <SelectItem value="mst">
                     Mountain Standard Time (MST)
                  </SelectItem>
                  <SelectItem value="pst">
                     Pacific Standard Time (PST)
                  </SelectItem>
                  <SelectItem value="akst">
                     Alaska Standard Time (AKST)
                  </SelectItem>
                  <SelectItem value="hst">
                     Hawaii Standard Time (HST)
                  </SelectItem>
               </SelectGroup>
               <SelectGroup>
                  <SelectLabel>Europe & Africa</SelectLabel>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="cet">
                     Central European Time (CET)
                  </SelectItem>
                  <SelectItem value="eet">
                     Eastern European Time (EET)
                  </SelectItem>
                  <SelectItem value="west">
                     Western European Summer Time (WEST)
                  </SelectItem>
                  <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                  <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
               </SelectGroup>
               <SelectGroup>
                  <SelectLabel>Asia</SelectLabel>
                  <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  <SelectItem value="cst_china">
                     China Standard Time (CST)
                  </SelectItem>
                  <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                  <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                  <SelectItem value="ist_indonesia">
                     Indonesia Central Standard Time (WITA)
                  </SelectItem>
               </SelectGroup>
               <SelectGroup>
                  <SelectLabel>Australia & Pacific</SelectLabel>
                  <SelectItem value="awst">
                     Australian Western Standard Time (AWST)
                  </SelectItem>
                  <SelectItem value="acst">
                     Australian Central Standard Time (ACST)
                  </SelectItem>
                  <SelectItem value="aest">
                     Australian Eastern Standard Time (AEST)
                  </SelectItem>
                  <SelectItem value="nzst">
                     New Zealand Standard Time (NZST)
                  </SelectItem>
                  <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
               </SelectGroup>
               <SelectGroup>
                  <SelectLabel>South America</SelectLabel>
                  <SelectItem value="art">Argentina Time (ART)</SelectItem>
                  <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                  <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                  <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
      </>
   );
};
