import EntryCard from "@/components/EntryCard";
import { entryContext } from "@/contexts/EntryContext";
import { GetServerSidePropsContext } from "next";
import { Fragment, useContext, useEffect } from "react";
import {
  MdFindInPage,
  MdGrid3X3,
  MdFilterTiltShift,
  MdTimelapse,
  MdDirectionsCar,
  MdAddCard,
} from "react-icons/md";
import { useRouter } from "next/router";

interface MyProps {
  data: {
    valero_num: string;
    plate: string;
    automobile_type: string;
    amount?: number;
    exit: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Entry {
  _id: string;
  valero_num: string;
  plate: string;
  automobile_type: string;
  amount?: number;
  exit: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function index({ data }: MyProps) {
  const { push } = useRouter();

  const { entrys, setEntrys } = useContext(entryContext);

  useEffect(() => {
    if (Array.isArray(data)) {
      setEntrys(data);
    } else {
      setEntrys(Array.from([data]));
    }
  }, []);

  console.log(entrys);

  return (
    <div className="w-screen h-screen flex justify-center items-start">
      <div className="my-8 relative overflow-x-auto flex flex-col gap-y-3">
        <div>
          <button onClick={() => push("/entry/EntryForm")}>
            Insertar vehiculo
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs  text-gray-700  ">
            <tr className="trBorder  border-gray-700 ">
              <th scope="col" className="py-2 ">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdFindInPage className="iconTable" size={15} />
                  <h3>N. Valero</h3>
                </div>
              </th>
              <th scope="col" className="py-2">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdGrid3X3 className="iconTable" size={15} />
                  <h3>Placa</h3>
                </div>
              </th>
              <th scope="col" className="py-2 w-32">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdDirectionsCar className="iconTable" size={15} />
                  <h3>Tipo</h3>
                </div>
              </th>
              <th scope="col" className="py-2 w-68">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdTimelapse className="iconTable" size={15} />
                  <h3>Entrada y Salida</h3>
                </div>
              </th>
              <th scope="col" className="py-2 w-32">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdFilterTiltShift className="iconTable" size={15} />
                  <h3>Estado</h3>
                </div>
              </th>
              <th scope="col" className="py-2 w-32">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdAddCard className="iconTable" size={15} />
                  <h3>Monto</h3>
                </div>
              </th>
              <th scope="col" className="py-2 w-32">
                <div className="flex gap-x-1 justify-start items-center">
                  <MdGrid3X3 className="iconTable" size={15} />
                  <h3>Accion</h3>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {entrys.map((entry: Entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("http://localhost:3000/api/entry");
  const data = await res.json();

  return {
    props: { data },
  };
}
