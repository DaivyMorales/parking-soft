import { createContext, ReactNode, useState } from "react";

interface AlertContextProviderProps {
  children: ReactNode;
}

interface IAlertInformation {
  _id: string;
  valero_num: string;
  plate: string;
  automobile_type: string;
  amount?: number;
  exit: boolean;
}

interface StateContext {
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertInformation: IAlertInformation;
  setAlertInformation: React.Dispatch<React.SetStateAction<IAlertInformation>>;
}

export const alertContext = createContext<StateContext>({
  showAlert: false,
  setShowAlert: () => {},
  alertInformation: {
    _id: "",
    valero_num: "",
    plate: "",
    automobile_type: "",
    amount: 0,
    exit: true,
  },
  setAlertInformation: () => {},
});

export const AlertContextProvider = ({
  children,
}: AlertContextProviderProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertInformation, setAlertInformation] = useState<IAlertInformation>({
    _id: "",
    valero_num: "",
    plate: "",
    automobile_type: "",
    amount: 0,
    exit: true,
  });
  const contextValue = {
    showAlert,
    setShowAlert,
    alertInformation,
    setAlertInformation,
  };
  return (
    <alertContext.Provider value={contextValue}>
      {children}
    </alertContext.Provider>
  );
};
