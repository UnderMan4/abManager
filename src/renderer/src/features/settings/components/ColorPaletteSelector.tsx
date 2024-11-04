import { FC, useRef } from "react";
import { AriaRadioProps, useRadio, useRadioGroup } from "react-aria";
import { RadioGroupState, useRadioGroupState } from "react-stately";

import { COLOR_PALETTES } from "@/constants";
import { useSettingsStore } from "@/stores";
import { ColorPalette } from "@/types/common";
import { cls } from "@/utils/styleUtils";

type ColorPaletteItemProps = AriaRadioProps & {
   state: RadioGroupState;
};

const ColorPaletteItem: FC<ColorPaletteItemProps> = ({ state, ...props }) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const { inputProps } = useRadio(props, state, inputRef);

   return (
      <div
         className={cls("p-1 rounded-xl", {
            // "ring-2 ring-secondary": state.selectedValue === props.value,
            "bg-accent-700": state.selectedValue === props.value,
         })}
      >
         <label
            className={cls(
               "size-12 rounded-lg gap-1 overflow-hidden grid grid-rows-2 grid-cols-2",
               props.value
            )}
         >
            <input
               type="radio"
               className="sr-only"
               aria-label={props.value}
               ref={inputRef}
               {...inputProps}
            />
            <div className="row-span-2 bg-primary" />
            <div className="bg-secondary" />
            <div className="bg-accent" />
         </label>
      </div>
   );
};

export const ColorPaletteSelector: FC = () => {
   const { colorPalette, setColorPalette } = useSettingsStore();

   const state = useRadioGroupState({
      value: colorPalette,
      onChange: (color) => setColorPalette(color as ColorPalette),
   });

   const { radioGroupProps } = useRadioGroup({}, state);
   return (
      <div className="flex gap-2" {...radioGroupProps}>
         {COLOR_PALETTES.map((color) => (
            <ColorPaletteItem key={color} value={color} state={state} />
         ))}
      </div>
   );
};
