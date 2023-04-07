import { createContext, ReactNode } from "react";

interface RatesContextProps {
  children: ReactNode;
}

interface StateContext {
  calculateAutomobileAmount: (hours: number, type: string) => number;
}

export const ratesContext = createContext<StateContext>({
  calculateAutomobileAmount: () => {
    throw new Error("Not implemented");
  },
});

export const RatesContextProvider = ({ children }: RatesContextProps) => {
  const calculateAutomobileAmount = (hours: number, type: string): number => {
    console.log("hours:", hours, "type:", type);
    switch (type) {
      case "Mula":
        const resultTractor = hours * 666.6666666666667;
        return Number(resultTractor.toFixed(0));

      case "Carro":
        const resultCar = hours * 250;
        return Number(resultCar.toFixed(0));

      case "Moto":
        const resultMotocicle = hours * 166.6666666666667;
        return Number(resultMotocicle.toFixed(0));

      case "Camion":
        const resultTruck = hours * 500;
        return Number(resultTruck.toFixed(0));

      default:
        console.error(`Tipo de vehículo inválido: ${type}`);
        return 3;
    }
  };

  return (
    <ratesContext.Provider
      value={{
        calculateAutomobileAmount,
      }}
    >
      {children}
    </ratesContext.Provider>
  );
};
