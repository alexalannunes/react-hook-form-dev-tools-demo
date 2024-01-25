import { ReactNode, createContext, useContext, useState } from "react";
import { Control } from "react-hook-form";

type ControlContextDispatchType = React.Dispatch<
  React.SetStateAction<Control<any> | null>
>;

const ControlContext = createContext<Control<any> | null>(null);

const ControlContextDispatch = createContext<
  ControlContextDispatchType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function ControlFormProvider({ children }: Props) {
  const [control, setControl] = useState<Control<any> | null>(null);

  return (
    <ControlContext.Provider value={control}>
      <ControlContextDispatch.Provider value={setControl}>
        {children}
      </ControlContextDispatch.Provider>
    </ControlContext.Provider>
  );
}

ControlContext.displayName = "ControlContext";
ControlContextDispatch.displayName = "ControlContextDispatch";

export function useControl() {
  const context = useContext(ControlContext);
  if (context === undefined) {
    throw new Error("useControl must be inside ControlContext");
  }
  return context;
}

export function useControlDispatch() {
  const context = useContext(ControlContextDispatch);
  if (context === undefined) {
    throw new Error("useControlDispatch must be inside ControlContextDispatch");
  }
  return context;
}
