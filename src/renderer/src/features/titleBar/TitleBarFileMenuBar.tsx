import React, { FC, useLayoutEffect, useState } from "react";
import { CustomScroll } from "react-custom-scroll";
import { FormattedMessage } from "react-intl";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarSub,
   MenubarSubContent,
   MenubarSubTrigger,
   MenubarTrigger,
} from "@/components/ui";

type DialogType = "importFiles" | "importFolder";

export const TitleBarFileMenuBar: FC = () => {
   const [dialogType, setDialogType] = useState<DialogType | null>(null);

   return (
      <Dialog>
         <MenubarMenu>
            <MenubarTrigger>
               <FormattedMessage id="menubar.menu.file.label" />
            </MenubarTrigger>
            <MenubarContent>
               <MenubarSub>
                  <MenubarSubTrigger>
                     <FormattedMessage id="menubar.menu.file.import.label" />
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                     <DialogTrigger asChild>
                        <MenubarItem
                           onSelect={() => setDialogType("importFiles")}
                        >
                           <FormattedMessage id="menubar.menu.file.import.files" />
                        </MenubarItem>
                     </DialogTrigger>
                     <DialogTrigger asChild>
                        <MenubarItem
                           onSelect={() => setDialogType("importFolder")}
                        >
                           <FormattedMessage id="menubar.menu.file.import.directory" />
                        </MenubarItem>
                     </DialogTrigger>
                  </MenubarSubContent>
               </MenubarSub>
            </MenubarContent>
         </MenubarMenu>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Are you absolutely sure?</DialogTitle>
               <DialogDescription>{dialogType}</DialogDescription>
            </DialogHeader>
            <div className="overflow-x-auto">
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  error sint soluta libero nemo a quasi nulla nobis recusandae
                  mollitia harum vel ad deleniti minima veritatis sequi illo
                  architecto, perferendis aliquid rem iusto veniam facere
                  debitis itaque. Facere nam eos totam eligendi dolorem vel
                  dolor, vitae quas error quos tempore. Iusto aliquid, totam
                  expedita nam vel animi nisi, corrupti fugiat sed quia
                  accusantium vero possimus unde nesciunt architecto esse,
                  doloribus qui natus omnis itaque dolorem aut corporis ex!
                  Corporis fugiat sed facilis eaque totam neque iure minima
                  laudantium nam culpa, suscipit quas cupiditate laboriosam
                  facere, aut illo officiis veniam doloribus!
               </p>
               <p>
                  Commodi non officiis nemo possimus voluptatibus ipsam itaque,
                  sint magnam nobis, assumenda asperiores autem voluptatum
                  beatae ad cum quas doloribus, repudiandae id! Doloremque quis
                  repellat assumenda ratione provident soluta rerum fugit non
                  consectetur esse minus sit nobis molestiae rem nisi labore
                  dicta sunt placeat, repellendus obcaecati iure maiores vitae.
                  A ipsam nisi ex magnam ipsa. A nisi perferendis natus ut
                  officia sint, nostrum ullam repellat adipisci mollitia labore
                  rerum alias. Dolorum qui delectus quae mollitia laboriosam
                  quos pariatur, ducimus saepe similique sequi incidunt
                  voluptatum repellendus sed provident ab, aspernatur
                  praesentium illo nostrum laudantium, voluptas debitis ullam
                  eos aperiam. Natus, aspernatur.
               </p>
               <p>
                  Ut, veritatis! Veritatis quia est eum quae officia facere,
                  iure debitis ex amet quidem eaque omnis beatae aperiam quam,
                  voluptas ratione. Corrupti ipsum ipsam aliquid molestias quia
                  iusto asperiores dolores nihil quasi omnis, tempora soluta
                  voluptatum error sapiente autem iure. Vero, temporibus dicta
                  natus doloribus error distinctio excepturi, tempore iure
                  blanditiis sunt laudantium fuga consequatur aut nulla officiis
                  harum illo? Sapiente exercitationem voluptatem autem est sit
                  quod, error quia eum temporibus ab molestiae illum modi nisi!
                  Deleniti, consequatur autem! Vel esse voluptatum natus
                  accusamus aut consequuntur odio, quas id unde modi nemo
                  temporibus nulla, deserunt soluta odit distinctio dolores
                  corporis!
               </p>
               <p>
                  Non saepe, magnam deleniti dolorem ipsa inventore labore
                  officiis porro doloremque, explicabo modi minima ipsam fuga
                  iste exercitationem! Incidunt rerum voluptatem libero
                  nesciunt, et consequatur aut facere similique quam adipisci
                  quaerat recusandae sint quibusdam vero eius ex, voluptas
                  delectus maiores facilis magnam culpa explicabo! Nulla
                  perspiciatis cumque, laborum qui iure nam. Modi quis,
                  repellendus omnis delectus in voluptates qui quisquam
                  necessitatibus odio vitae consequatur quae, porro nam numquam
                  ea officiis eius. Doloremque esse aut tenetur. Similique nam
                  odio molestiae a corporis facilis placeat quis quas debitis
                  eveniet quam accusantium, possimus rem quisquam excepturi
                  animi delectus dignissimos voluptate praesentium. Blanditiis,
                  rerum?
               </p>
               <p>
                  Ad earum deleniti unde eius et laudantium, amet reprehenderit
                  a enim neque quod consequuntur minus illo natus sit magni
                  maiores aliquam fuga. Saepe ipsa eius ut repellendus atque ad
                  consectetur corporis, amet, non architecto eaque maiores
                  officiis libero a facilis esse modi hic velit voluptates nam.
                  Voluptatum neque ullam ab dolores natus voluptates ipsum
                  voluptate doloremque odio id ratione dolorum quibusdam iure,
                  blanditiis explicabo illo error molestiae quos possimus iste
                  praesentium perferendis obcaecati. Ducimus facilis amet
                  aliquam deserunt sequi aut corrupti eum temporibus quo. Ab,
                  commodi odit nobis dolorum amet sequi non quae laborum qui
                  deserunt? Consectetur illum neque pariatur?
               </p>
               <p>
                  Exercitationem repellendus enim ipsum soluta a distinctio
                  corrupti vel saepe neque provident rerum mollitia harum
                  aperiam, deleniti, magni, similique adipisci dignissimos
                  minima omnis atque aut! Maiores maxime laborum architecto
                  itaque saepe, corrupti quidem, dolorem officiis ea quod ex,
                  voluptatibus reiciendis? Sapiente est repellat voluptatum
                  quisquam ea recusandae? Tempore quos nisi saepe eaque quia
                  vitae ipsum perferendis nam laborum! Necessitatibus unde,
                  laborum soluta praesentium fugit reiciendis quaerat ratione
                  minus molestiae. Velit amet voluptatibus molestias obcaecati,
                  sunt illum eligendi hic totam mollitia, similique natus nobis
                  libero non iste, sint incidunt accusamus repellat iusto unde
                  culpa alias vitae perspiciatis doloremque. Ratione, earum
                  tempora?
               </p>
               <p>
                  Consequatur sapiente cupiditate fuga, ratione aspernatur sequi
                  amet, mollitia dolor earum maiores hic, velit corporis eum
                  quos voluptas nemo necessitatibus minus porro quidem? Eveniet
                  iste fugiat labore corporis cumque? Ullam, culpa fugit ut rem
                  modi quibusdam placeat itaque nam quis incidunt at tempora
                  inventore saepe dolore aperiam eos in accusamus illo magni
                  excepturi debitis ex voluptas rerum? Deleniti consequuntur
                  mollitia, libero velit optio illum unde ipsum sequi neque
                  minima deserunt obcaecati natus non ratione animi suscipit,
                  quos eveniet inventore sint voluptate repellat, accusantium
                  cupiditate? Harum iure at ab quia doloribus, minima tempora
                  hic iusto expedita earum reiciendis aut dicta voluptatibus.
               </p>
               <p>
                  Id voluptas iste placeat ratione veniam maxime odit!
                  Dignissimos obcaecati libero deserunt voluptates, accusantium,
                  distinctio natus vitae inventore vel porro facere ex eius
                  harum! Animi laborum, consectetur repellendus reprehenderit
                  perferendis sunt nam consequuntur. Soluta cumque itaque
                  numquam labore, animi rem perspiciatis odit aspernatur aut
                  molestias veritatis ullam hic quibusdam minima debitis? Animi,
                  tempora enim, expedita ipsa explicabo architecto numquam illo
                  repellendus et praesentium reprehenderit, aperiam omnis
                  mollitia eum cum odit nostrum nemo! Velit voluptatem itaque
                  saepe cupiditate vel commodi. Similique natus delectus dolorum
                  aperiam error fugiat cupiditate perferendis vitae deleniti
                  quidem amet autem quibusdam quia voluptatum, quod aliquam sint
                  magnam?
               </p>
               <p>
                  Atque ab quam, amet blanditiis illo, earum animi aliquid
                  quisquam eius et aperiam iste itaque veniam accusamus
                  repudiandae quae non soluta distinctio. Aliquid expedita
                  laboriosam esse cupiditate. Nihil, cum dignissimos sint dolore
                  nulla esse ullam assumenda magni. Velit quisquam debitis,
                  labore deleniti adipisci, praesentium iste exercitationem,
                  quas ullam quod ipsam nemo sunt in magni laborum consequatur
                  architecto. Sint autem enim veritatis a ut. Quibusdam sit non
                  architecto hic libero ut reiciendis totam sequi, maiores
                  placeat dolorum ad veniam magnam recusandae tempora doloremque
                  voluptatem earum eum quasi quis nobis dolore aspernatur quia
                  nulla. Possimus, at et quas reprehenderit quam iusto natus.
               </p>
               <p>
                  Dignissimos earum fugit qui tenetur nostrum a, eos aliquid,
                  expedita eius, ipsum fugiat officia. Quidem odit nobis aliquid
                  dicta ad at animi ullam quis eligendi nesciunt. Vitae fugit,
                  at aliquid minus quaerat expedita libero accusantium porro
                  quam ducimus, a impedit blanditiis ipsum magni earum atque
                  debitis hic voluptates nemo, dolor in quasi dolorem natus ab!
                  Nulla quae pariatur nam velit error reiciendis accusantium
                  corporis molestiae aspernatur eius quis autem modi, obcaecati
                  facere doloremque illum impedit sit placeat ex repellendus,
                  est sapiente. Doloribus pariatur, id laudantium, dolores
                  quidem beatae corporis suscipit assumenda, vero dignissimos
                  mollitia! Libero ullam distinctio debitis minus dolorum!
               </p>
               <p>
                  Quas quasi, tempore amet assumenda a vitae in soluta! Modi
                  nostrum id esse! Nihil, ullam iusto corrupti aperiam
                  reiciendis provident. Temporibus veritatis quas deleniti eum.
                  Nostrum nisi quaerat ullam, eveniet necessitatibus, facere
                  delectus odit illum debitis vel explicabo sunt impedit vero,
                  modi nobis deleniti obcaecati doloribus autem praesentium
                  tempora commodi dignissimos provident? Aliquid quae dolorem
                  natus! Iste, saepe sequi minus quo aliquid magnam rem
                  veritatis deserunt. Numquam excepturi odit ad, consectetur
                  nostrum, vero sint error dolor mollitia sapiente aperiam iure?
                  Ut ea inventore et excepturi incidunt cumque sunt tempore
                  necessitatibus possimus, commodi quod officia adipisci fugit
                  animi suscipit aliquam. Quisquam!
               </p>
               <p>
                  Excepturi quos labore id, commodi nam ducimus, facilis, sunt
                  obcaecati enim odio quaerat. Commodi dolorum fuga cum dolor
                  saepe repellendus numquam fugiat incidunt fugit ullam, et
                  dignissimos nobis assumenda aliquam id exercitationem unde
                  odio totam ab magni alias natus. Temporibus porro labore aut
                  et delectus harum error animi asperiores corrupti maxime.
                  Quasi molestias sit accusamus vel obcaecati? Vero, quisquam
                  unde. Unde animi vel corrupti necessitatibus accusantium,
                  alias minus aliquid laudantium quia impedit et nulla
                  architecto, explicabo beatae modi qui quo incidunt tempora
                  quibusdam? Ratione adipisci optio id, necessitatibus quasi
                  libero. Mollitia eveniet esse adipisci cumque? Excepturi quia
                  officia quos quas?
               </p>
               <p>
                  Natus optio vero iure ipsam. Quas tempora dolorum a assumenda
                  culpa, repellendus amet consectetur? Aperiam sequi animi nam
                  quasi blanditiis dignissimos ex. Voluptas architecto expedita
                  sint veritatis, id cumque numquam nulla nostrum sed at iusto,
                  enim atque alias unde consequatur sit repudiandae, ut vel ad
                  modi! Facilis aspernatur accusantium quasi deleniti totam
                  eveniet voluptatem velit debitis soluta nemo neque, corporis
                  vero laboriosam veniam sunt dolores pariatur? Libero maxime
                  nemo vitae obcaecati, ipsum ea maiores quia magnam aliquid
                  quisquam placeat dignissimos, ab earum culpa. Perspiciatis,
                  sapiente possimus iste doloremque laboriosam porro, repellat
                  molestias accusamus facilis voluptatum odit nemo nisi tenetur
                  ipsam?
               </p>
               <p>
                  Perferendis temporibus nihil quae tenetur quibusdam reiciendis
                  eius esse obcaecati praesentium! Est expedita quod minima rem
                  molestiae quas earum velit dicta facere. Corporis labore, quae
                  iure similique nam animi ipsum adipisci non? Libero qui,
                  deleniti molestiae soluta maiores deserunt laborum illo harum
                  alias eveniet eligendi delectus quos voluptates expedita modi
                  amet nihil doloremque, ab velit porro maxime in ad? Tenetur
                  numquam accusamus aperiam unde culpa sit fugiat eius
                  laboriosam vero dolorum fugit ducimus minus consectetur,
                  dolorem ipsum quos rem corporis, reiciendis sed. Veritatis
                  earum incidunt natus molestiae explicabo minus recusandae est
                  sint! Sunt dolorum sed dignissimos consequuntur quisquam
                  itaque consequatur.
               </p>
               <p>
                  Itaque, ab voluptas. Architecto eveniet veritatis voluptatum
                  voluptate ducimus dolor temporibus id. Inventore, neque fuga
                  qui amet deserunt aut perferendis, ullam eaque est nisi velit
                  optio, modi illum in. Eius tempore exercitationem architecto
                  fugit corrupti quasi iure officiis fuga nulla voluptatem velit
                  minima ea quia ipsum explicabo, impedit expedita. Ipsum ut
                  maiores repellendus, aliquid quidem nam rem quis consectetur
                  nemo nobis magnam porro, facere voluptate accusamus
                  repudiandae cum natus eveniet itaque voluptatem minima.
                  Nesciunt, placeat dolorum ratione, obcaecati libero commodi
                  iure incidunt autem nam officiis quos sit tenetur ut voluptas
                  non accusamus error magnam assumenda amet. Officiis officia
                  quibusdam itaque?
               </p>
               <p>
                  Qui, quod ducimus laborum quos quis minima totam, suscipit,
                  perspiciatis at distinctio porro non aliquid quibusdam cumque
                  minus maiores nostrum. Libero porro omnis perspiciatis, soluta
                  illo, nulla, optio repudiandae qui consequuntur cum non
                  doloribus. Doloremque iure vero dolore similique debitis
                  architecto corrupti autem ducimus odio esse eum eveniet
                  repudiandae adipisci non consectetur dolorum atque fugit
                  aliquid, ad iste minus eos! Deserunt, quam quis? Quaerat
                  placeat dolorem blanditiis fugit, vitae possimus? Dolore
                  voluptatem a assumenda adipisci quos laudantium earum natus.
                  At sunt voluptates tempora sequi eveniet! Nemo doloremque
                  magni temporibus adipisci rem repellendus, incidunt minus
                  iure, ullam suscipit nulla voluptatibus delectus!
               </p>
               <p>
                  Deserunt fuga unde aut, ratione doloribus vel! Sit illum
                  laborum minima soluta magni neque sed, nisi fugit aperiam
                  ullam! Nobis voluptatem ut eaque commodi natus hic ipsam id
                  minima aspernatur, porro soluta voluptatibus temporibus
                  distinctio delectus ex repudiandae quibusdam! Tempora ullam
                  est vel accusantium maiores deserunt similique neque
                  laboriosam maxime iusto placeat, dolores quaerat asperiores
                  consequatur aspernatur non soluta obcaecati vitae quibusdam
                  sed voluptatibus et quos. Veritatis facilis, dolore vitae
                  minus eos sint nam laudantium doloremque at id totam, incidunt
                  impedit itaque commodi praesentium, obcaecati sunt. Cupiditate
                  harum quis, ipsa pariatur nulla recusandae nemo aliquam, quia
                  maxime dolor maiores aliquid.
               </p>
               <p>
                  Veritatis assumenda ducimus minima nobis pariatur dolorum
                  natus unde, optio tempora porro iste maxime a cumque qui
                  provident accusantium aspernatur quisquam dolore commodi
                  consequuntur quasi, totam delectus. Perspiciatis illum
                  corrupti, quis autem eum blanditiis nemo temporibus sint ipsa
                  et? Voluptatem, reprehenderit magni nihil fugit blanditiis
                  deserunt corrupti, ullam modi rem sunt quam laboriosam unde ab
                  nemo consequuntur iste ducimus eaque sed repellendus debitis
                  suscipit aspernatur quia alias! Facere similique nostrum
                  exercitationem, magnam ut temporibus deleniti quisquam
                  reprehenderit quos sunt, porro maxime. Laudantium, ab aliquam
                  impedit accusamus, a maiores optio repellendus culpa
                  voluptates dolor aliquid sint amet facilis molestiae et iusto!
               </p>
               <p>
                  Veritatis eaque vero eos deserunt! Nobis incidunt, odio eos
                  nihil officiis repudiandae, illum natus architecto veritatis
                  et vero eveniet mollitia quod facere laborum assumenda dolore,
                  quis illo veniam voluptas sint recusandae perferendis ut?
                  Alias rerum quaerat quod perspiciatis vitae amet minus placeat
                  autem libero ea mollitia veritatis fugiat pariatur,
                  reprehenderit blanditiis minima! Magni error molestias
                  nostrum! Labore molestias ad quos ipsum expedita placeat
                  architecto laborum maxime repellendus? Officia velit, hic
                  alias, debitis officiis atque vel laborum minima ducimus cum
                  cumque. Ad ipsa adipisci totam voluptate dicta, molestias id
                  cum maxime deleniti. Culpa est molestias voluptatem
                  repellendus illum quidem quas eum?
               </p>
               <p>
                  Similique aspernatur ipsa, voluptatem commodi natus, ex in
                  accusamus cum placeat fuga atque iusto explicabo vel dolores
                  architecto? Cum dolor unde culpa quis hic quam facilis totam
                  laborum beatae et placeat, doloremque vero autem quaerat
                  blanditiis itaque asperiores quia harum qui atque earum nisi
                  modi incidunt. Pariatur quaerat repellat voluptas. Dignissimos
                  assumenda hic deleniti, harum alias temporibus inventore ad
                  nostrum ratione libero numquam expedita exercitationem, porro
                  minima quam praesentium blanditiis non distinctio incidunt,
                  unde quod illo fugiat explicabo vitae? Unde tempore voluptatum
                  possimus a quod sed ipsam nobis laboriosam est sint
                  consectetur fugiat, ab cupiditate inventore perspiciatis quam.
                  Quos, dicta!
               </p>
            </div>
         </DialogContent>
      </Dialog>
   );
};
