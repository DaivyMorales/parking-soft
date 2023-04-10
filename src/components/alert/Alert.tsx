import { alertContext } from "@/contexts/AlertContext";
import { entryContext } from "@/contexts/EntryContext";
import { HiExclamationCircle, HiMinusCircle } from "react-icons/hi2";
import React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";

export default function Alert() {
  const { alertInformation, setShowAlert, showAlert } =
    useContext(alertContext);
  const { updateStatusEntryAndAmount } = useContext(entryContext);

  return (
    <motion.div
      className="alertBox"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {alertInformation.type === "Normal" ? (
        ""
      ) : (
        <div className="flex justify-center items-center bg-red-900 rounded-md text-red-400 pr-1">
          <HiExclamationCircle />
          <p className="text-red-400">Albatec</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="" className="text-gray-500">
            Numero de Valero
          </label>
          <h3 className="text-xl  text-gray-300">
            {alertInformation.valero_num}
          </h3>
        </div>
        <div>
          <label htmlFor="" className="text-gray-500">
            Placa
          </label>
          <h1 className="font-bold text-xl text-gray-300">
            {alertInformation.automobile_type}
          </h1>
        </div>
        <div>
          <label htmlFor="" className="text-gray-500">
            Placa
          </label>
          <h1 className="font-bold text-xl text-gray-300">
            {alertInformation.plate}
          </h1>
        </div>
        <div>
          <label htmlFor="" className="text-gray-500">
            Monto a Cobrar
          </label>
          <h3 className="text-2xl underline ">${alertInformation.amount}</h3>
        </div>
        <div className="col-start-2 flex gap-x-2 ">
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
    </motion.div>
  );
}
