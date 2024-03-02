import { Dispatch, SetStateAction } from "react";

export type CardNavigation = {
   currentStep: number;
   previousStep: () => void;
   nextStep: () => void;
   setIsBack: Dispatch<SetStateAction<boolean>>;
   isBack: boolean;
};
