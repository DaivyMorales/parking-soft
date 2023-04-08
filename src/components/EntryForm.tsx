import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  useFormik,
  useFormikContext,
} from "formik";
import { useState, useContext, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { entryContext } from "@/contexts/EntryContext";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaTruck, FaMotorcycle, FaTrailer } from "react-icons/fa";
import { BsCarFrontFill } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";
import { motion } from "framer-motion";

interface IInitialValues {
  valero_num: string;
  plate: string;
  automobile_type: string;
  exit: boolean;
}

interface EntryFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  showForm: boolean;
}

interface StyleBoxType {
  color: string;
  borderColor: string;
  borderWidth: string;
}

export default function EntryForm({ setShowForm, showForm }: EntryFormProps) {
  const { createEntry } = useContext(entryContext);

  const { push } = useRouter();

  const [entryValues, setEntryValues] = useState<IInitialValues>({
    valero_num: "",
    plate: "",
    automobile_type: "",
    exit: false,
  });

  const formik = useFormik({
    initialValues: { entryValues },
    onSubmit: async (values) => {
      console.log(values);
      await createEntry(values);
      setShowForm(!showForm);
    },
    enableReinitialize: true,
  });

  const handleAutomobileTypeChange = (type: string) => {
    formik.setFieldValue("automobile_type", type);
  };

  console.log("values", formik.values);

  const [colors, setColors] = useState<string>("");

  const [type, setType] = useState<string>("");

  const styleTypeValidateOn: StyleBoxType = {
    color: "#2563eb",
    borderColor: "#2563eb",
    borderWidth: "2px",
  };

  const styleTypeValidateOff: StyleBoxType = {
    color: "#6b7280",
    borderColor: "#6b7280",
    borderWidth: "1px",
  };

  const styleCheckType = {
    visibility: "hidden",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute -top-5 w-screen h-screen flex justify-center items-center"
    >
      <div className="cardForm flex gap-y-10 flex-col   bg-[#242529] rounded-lg px-5  pt-16 pb-5 ">
        <div className="w-full text-left">
          <h2>Ingresar entrada</h2>
          <p>¡Añade a la tabla un nuevo vehiculo aquí!</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1  w-full">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="valero_num">Numero de Valero</label>
              <input
                type="text"
                name="valero_num"
                placeholder="Ej: 5512"
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col gap-y-1  ">
              <label htmlFor="plate">Placa</label>
              <input
                type="text"
                name="plate"
                placeholder="Ej: MBO187"
                onChange={formik.handleChange}
              />
            </div>

            <div className="flex flex-col gap-y-2 justify-start items-start  ">
              <div className="flex items-start gap-y-2  justify-start flex-col gap-x-1">
                <label htmlFor="">Tipo</label>
                <div className="flex gap-x-1">
                  <div
                    style={
                      colors === "Mula"
                        ? styleTypeValidateOn
                        : styleTypeValidateOff
                    }
                    className="boxType"
                    id="mula"
                    onClick={() => {
                      setColors("Mula");
                      handleAutomobileTypeChange("Mula");
                    }}
                  >
                    <HiCheckCircle
                      className="absolute top-1 right-1 "
                      style={
                        colors !== "Mula"
                          ? { visibility: "hidden" }
                          : { visibility: "visible" }
                      }
                    />
                    <FaTrailer size="15" />
                    Mula
                  </div>
                  <div
                    style={
                      colors === "Camion"
                        ? styleTypeValidateOn
                        : styleTypeValidateOff
                    }
                    className="boxType"
                    id="camion"
                    onClick={() => {
                      setColors("Camion");
                      handleAutomobileTypeChange("Camion");
                    }}
                  >
                    <HiCheckCircle
                      className="absolute top-1 right-1 "
                      style={
                        colors !== "Camion"
                          ? { visibility: "hidden" }
                          : { visibility: "visible" }
                      }
                    />
                    <FaTruck size="15" />
                    Camion
                  </div>
                  <div
                    style={
                      colors === "Carro"
                        ? styleTypeValidateOn
                        : styleTypeValidateOff
                    }
                    className="boxType"
                    id="carro"
                    onClick={() => {
                      setColors("Carro");
                      handleAutomobileTypeChange("Carro");
                    }}
                  >
                    <HiCheckCircle
                      className="absolute top-1 right-1 "
                      style={
                        colors !== "Carro"
                          ? { visibility: "hidden" }
                          : { visibility: "visible" }
                      }
                    />
                    <BsCarFrontFill size="15" />
                    Carro
                  </div>
                  <div
                    style={
                      colors === "Moto"
                        ? styleTypeValidateOn
                        : styleTypeValidateOff
                    }
                    className="boxType "
                    id="moto"
                    onClick={() => {
                      setColors("Moto");
                      handleAutomobileTypeChange("Moto");
                    }}
                  >
                    <HiCheckCircle
                      className="absolute top-1 right-1 "
                      style={
                        colors !== "Moto"
                          ? { visibility: "hidden" }
                          : { visibility: "visible" }
                      }
                    />
                    <FaMotorcycle size="15" />
                    Moto
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center gap-x-2">
              <button type="submit" className="bg-blue-600 border-blue-600">
                Insertar vehiculo
              </button>
            </div>
          </div>
        </form>
        <div
          onClick={() => setShowForm(!showForm)}
          className=" flex underline text-blue-600 cursor-pointer hover:text-blue-500"
        >
          <MdKeyboardBackspace />
          <h3 className="font-medium  text-xs">Volver a la tabla</h3>
        </div>
      </div>
    </motion.div>
  );
}
