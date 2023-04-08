import { alertContext } from "@/contexts/AlertContext";
import { entryContext } from "@/contexts/EntryContext";
import React from "react";
import { useContext } from "react";

export default function Alert() {
  const { alertInformation, setShowAlert, showAlert } =
    useContext(alertContext);
  const { updateStatusEntryAndAmount } = useContext(entryContext);

  return (
    <div className="alertBox">
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="" className="text-gray-500">
            Numero de Valero
          </label>
          <h3 className="text-2xl">{alertInformation.valero_num}</h3>
        </div>
        <div>
          <label htmlFor="" className="text-gray-500">
            Placa
          </label>
          <h1 className="font-bold text-2xl">
            {alertInformation.automobile_type}
          </h1>
        </div>
        <div>
          <label htmlFor="" className="text-gray-500">
            Placa
          </label>
          <h1 className="font-bold text-2xl">{alertInformation.plate}</h1>
        </div>
        <div>
          <label htmlFor="" className="text-gray-500">
            Monto
          </label>
          <h3 className="text-4xl underline">${alertInformation.amount}</h3>
        </div>
        <div>
          <button
            onClick={() => {
              setShowAlert(!showAlert);
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setShowAlert(!showAlert);
              updateStatusEntryAndAmount(
                alertInformation._id,
                alertInformation
              );
            }}
            className="bg-blue-600 border-blue-600"
          >
            Cobrar
          </button>
        </div>
      </div>
    </div>
  );
}
