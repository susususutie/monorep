import { createContext, useContext } from "react";
export type DialogType = "modal" | "drawer";

const defaultDialogType: DialogType = "modal";
export const DialogTypeContext = createContext<DialogType>(defaultDialogType);
export const DialogTypeConsumer = DialogTypeContext.Consumer;

function useDialogType(): DialogType {
  const originDialogType = useContext(DialogTypeContext);
  return originDialogType;
}

interface DialogTypeProviderProps {
  dialogType?: DialogType;
  children?: React.ReactNode;
}

function DialogTypeProvider(props: DialogTypeProviderProps) {
  const { dialogType, children } = props;

  const originDialogType = useContext(DialogTypeContext);
  return <DialogTypeContext.Provider value={dialogType ?? originDialogType}>{children}</DialogTypeContext.Provider>;
}

DialogTypeProvider.useDialogType = useDialogType;

if (process.env.NODE_ENV !== "production") {
  DialogTypeProvider.displayName = "DialogTypeProvider";
}
export default DialogTypeProvider;
