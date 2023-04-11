import { createContext, ReactNode } from "react";

interface RatesContextProps {
  children: ReactNode;
}

interface StateContext {
  calculateAutomobileAmount: (
    hours: number,
    vehicle: string,
    type: string
  ) => number;
}

export const ratesContext = createContext<StateContext>({
  calculateAutomobileAmount: () => {
    throw new Error("Not implemented");
  },
});

export const RatesContextProvider = ({ children }: RatesContextProps) => {
  const calculateAutomobileAmount = (
    minutes: number,
    vehicle: string,
    type: string
  ): number => {
    console.log("minutes:", minutes, "vehicle:", vehicle, "tipo:", type);

    const vehicleType = vehicle + type;
    switch (vehicleType) {
      case "MulaNormal":
        const resultTractor = minutes * 11.11111111111111;
        return Number(resultTractor.toFixed(0));

      case "CarroNormal":
        const resultCar = minutes * 4.166666666666667;
        return Number(resultCar.toFixed(0));

      case "MotoNormal":
        const resultMotocicle = minutes * 2.777777777777778;
        return Number(resultMotocicle.toFixed(0));

      case "CamionNormal":
        const resultTruck = minutes * 8.333333333333333;
        return Number(resultTruck.toFixed(0));

      case "MulaAlbatec":
        const amountAlbatec = 8000;
        if (minutes <= 300) {
          return amountAlbatec;
        } else if (minutes >= 300 && minutes <= 360) {
          return amountAlbatec + 1000;
        } else if (minutes >= 360 && minutes <= 420) {
          return amountAlbatec + 2000;
        } else if (minutes >= 420 && minutes <= 480) {
          return amountAlbatec + 3000;
        } else if (minutes >= 480 && minutes <= 540) {
          return amountAlbatec + 4000;
        } else if (minutes >= 540 && minutes <= 600) {
          return amountAlbatec + 5000;
        } else if (minutes >= 600 && minutes <= 660) {
          return amountAlbatec + 6000;
        } else if (minutes >= 660 && minutes <= 720) {
          return amountAlbatec + 7000;
        } else if (minutes > 720) {
          const resultTractor = minutes * 11.11111111111111;
          return 7000 + Number(resultTractor.toFixed(0));
        }

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
