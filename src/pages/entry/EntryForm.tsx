import { Formik, Form, Field, FormikHelpers } from "formik";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { entryContext } from "@/contexts/EntryContext";
import { MdKeyboardBackspace } from "react-icons/md";

interface IInitialValues {
  valero_num: string;
  plate: string;
  automobile_type: string;
  exit: boolean;
}

export default function EntryForm() {
  const { createEntry } = useContext(entryContext);

  const { push } = useRouter();

  const [entryValues, setEntryValues] = useState<IInitialValues>({
    valero_num: "",
    plate: "",
    automobile_type: "",
    exit: false,
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="cardForm flex gap-y-10 flex-col   bg-[#242529] rounded-lg px-5  pt-16 pb-5 ">
        <div className="w-full text-left">
          <h2>Ingresar entrada</h2>
          <p>¡Añade a la tabla un nuevo vehiculo aquí!</p>
        </div>
        <Formik
          initialValues={entryValues}
          onSubmit={async (values) => {
            console.log(values);
            await createEntry(values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-1  w-full">
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="valero_num">Numero de Valero</label>
                  <Field type="text" name="valero_num" placeholder="Ej: 5512" />
                </div>
                <div className="flex flex-col gap-y-1  ">
                  <label htmlFor="plate">Placa</label>
                  <Field type="text" name="plate" placeholder="Ej: MBO187" />
                </div>

                <div className="flex flex-col gap-y-2 justify-start items-start  ">
                  <div className="flex items-start gap-y-2  justify-start flex-col gap-x-1">
                    <label htmlFor="">Tipo</label>
                    <div className="flex flex-col  gap-y-1">
                      <div className="flex items-center gap-x-1">
                        <Field
                          id="default-radio-1"
                          type="radio"
                          value="Mula"
                          name="automobile_type"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="default-radio-1" className="labelRadio">
                          Mula
                        </label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Field
                          id="default-radio-2"
                          type="radio"
                          value="Camion"
                          name="automobile_type"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="default-radio-2" className="labelRadio">
                          Camion
                        </label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Field
                          id="default-radio-2"
                          type="radio"
                          value="Carro"
                          name="automobile_type"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="default-radio-2" className="labelRadio">
                          Carro
                        </label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Field
                          id="default-radio-2"
                          type="radio"
                          value="Moto"
                          name="automobile_type"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="default-radio-2" className="labelRadio">
                          Moto
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-center items-center gap-x-2">
                  <button
                    onClick={() => {
                      push("/entry");
                    }}
                    type="submit"
                    className="bg-blue-600 border-blue-600"
                  >
                    Insertar vehiculo
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div
          onClick={() => push("/entry")}
          className=" flex underline text-blue-600 cursor-pointer hover:text-blue-500"
        >
          <MdKeyboardBackspace />
          <h3 className="font-medium  text-xs">Volver a la tabla</h3>
        </div>
      </div>
    </div>
  );
}
