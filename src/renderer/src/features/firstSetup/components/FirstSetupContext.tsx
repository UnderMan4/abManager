import {
   FC,
   createContext,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from "react";

import { CardNavigation } from "@/features/firstSetup/types";
import { SetObjectState, useObjectState, useSafeContext } from "@/hooks";
import { useSettingsStore } from "@/stores";
import { SaveType } from "@/types/common";

export type FirstSetupContextState = {
   data: FirstSetupData;
   setData: SetObjectState<FirstSetupData>;
   navigation: CardNavigation;
   submit: () => void;
};

export type FirstSetupData = {
   selectedDirectory?: string;
   selectedSaveType: SaveType;
};

export const FirstSetupContext = createContext<FirstSetupContextState | null>(
   null
);

export type FirstSetupContextProps = {
   children: React.ReactNode;
};

export const FirstSetupProvider: FC<FirstSetupContextProps> = ({
   children,
}) => {
   const [currentStep, setCurrentStep] = useState(0);

   const { saveType, firstSetup } = useSettingsStore();

   const [isBack, setIsBack] = useState(false);

   const [data, setData] = useObjectState<FirstSetupData>({
      selectedSaveType: saveType,
   });

   const nextStep = useCallback(() => {
      setCurrentStep((prev) => prev + 1);
   }, [setCurrentStep]);

   const previousStep = useCallback(() => {
      setCurrentStep((prev) => prev - 1);
   }, [setCurrentStep]);

   const navigation = useMemo(
      () => ({
         currentStep,
         previousStep,
         nextStep,
         setIsBack,
         isBack,
      }),
      [isBack, setIsBack, currentStep, nextStep, previousStep]
   );

   const submit = useCallback(() => {
      if (!(data.selectedDirectory && data.selectedSaveType))
         throw new Error("Data is not complete");

      firstSetup({
         libraryPath: data.selectedDirectory,
         saveType: data.selectedSaveType,
      });
   }, [data.selectedDirectory, data.selectedSaveType, firstSetup]);

   const value = useMemo<FirstSetupContextState>(
      () => ({
         data,
         setData,
         navigation,
         submit,
      }),
      [data, isBack, setIsBack, navigation, submit]
   );

   return (
      <FirstSetupContext.Provider value={value}>
         {children}
      </FirstSetupContext.Provider>
   );
};

export const useFirstSetupContext = () =>
   useSafeContext(
      FirstSetupContext,
      "You are trying to use FirstSetupContext outside of its provider."
   );
