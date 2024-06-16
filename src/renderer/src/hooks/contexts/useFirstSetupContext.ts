import { FirstSetupContext } from "@/features/firstSetup/components/FirstSetupContext";
import { useSafeContext } from "@/hooks/useSafeContext";

export const useFirstSetupContext = () =>
   useSafeContext(
      FirstSetupContext,
      "You are trying to use FirstSetupContext outside of its provider."
   );
