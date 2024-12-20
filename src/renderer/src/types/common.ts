import { COLOR_PALETTES } from "@/constants";

export type Theme = "light" | "dark" | "system";
export type RealTheme = "light" | "dark";

export type ColorPalette = (typeof COLOR_PALETTES)[number];

export type SaveType = "copy" | "move" | "link";

export type SimpleUnit =
   | "acre"
   | "bit"
   | "byte"
   | "celsius"
   | "centimeter"
   | "day"
   | "degree"
   | "fahrenheit"
   | "fluid-ounce"
   | "foot"
   | "gallon"
   | "gigabit"
   | "gigabyte"
   | "gram"
   | "hectare"
   | "hour"
   | "inch"
   | "kilobit"
   | "kilobyte"
   | "kilogram"
   | "kilometer"
   | "liter"
   | "megabit"
   | "megabyte"
   | "meter"
   | "mile"
   | "mile-scandinavian"
   | "millimeter"
   | "milliliter"
   | "millisecond"
   | "minute"
   | "month"
   | "ounce"
   | "percent"
   | "petabyte"
   | "pound"
   | "second"
   | "stone"
   | "terabit"
   | "terabyte"
   | "week"
   | "yard"
   | "year";

export type Unit = SimpleUnit | `${SimpleUnit}-per-${SimpleUnit}`;
