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
  const calculateAutomobileAmount = (minutes: number, type: string): number => {
    console.log("minutes:", minutes, "type:", type);
    switch (type) {
      case "Mula":
        const resultTractor = minutes * 11.11111111111111;
        return Number(resultTractor.toFixed(0));

      case "Carro":
        const resultCar = minutes * 4.166666666666667;
        return Number(resultCar.toFixed(0));

      case "Moto":
        const resultMotocicle = minutes * 2.777777777777778;
        return Number(resultMotocicle.toFixed(0));

      case "Camion":
        const resultTruck = minutes * 8.333333333333333;
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
