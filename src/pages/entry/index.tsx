import EntryCard from "@/components/EntryCard";
import { entryContext } from "@/contexts/EntryContext";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useState, ChangeEvent } from "react";
import {
  MdFindInPage,
  MdGrid3X3,
  MdFilterTiltShift,
  MdTimelapse,
  MdDirectionsCar,
  MdAddCard,
} from "react-icons/md";
import Alert from "../../components/alert/Alert";
import { alertContext } from "@/contexts/AlertContext";
import EntryForm from "@/components/EntryForm";

import { BsSearch } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { TbCirclesFilled } from "react-icons/tb";
import { HiFilter, HiRefresh } from "react-icons/hi";

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
  type: string;
  createdAt: string;
  updatedAt: string;
}

export default function index({ data }: MyProps) {
  const { entrys, filterAllCategories } = useContext(entryContext);
  const { showAlert } = useContext(alertContext);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOp = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [selectedType, setSelectedType] = useState<string>("n");

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedType(event.target.value);
  }
  const [selectedStatus, setSelectedStatus] = useState<string>("n");

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(event.target.value);
  }

  const [startDate, setStartDate] = useState<string>("n");

  function handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  const [endDate, setEndDate] = useState<string>("n");

  function handleEndDateChange(event: ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  useEffect(() => {
    filterAllCategories(selectedType, selectedStatus, startDate, endDate);
  }, [selectedType, selectedStatus, endDate]);

  return (
    <div className="w-screen h-screen flex justify-start items-center flex-col relative z-10">
      <div
        style={showAlert || showForm ? { opacity: "0.2" } : {}}
        className="my-8 relative overflow-x-auto flex flex-col gap-y-3 "
      >
        <div className="grid grid-cols-3 py-1  gap-x-1 px-1">
          <div className="flex gap-x-2">
            <button
              className="bg-blue-600 border-blue-800"
              onClick={() => setShowForm(!showForm)}
            >
              <TiPlus /> Insertar vehiculo
            </button>
            <div className="boxFilter">
              <BsSearch size={12} className="" />
              <input
                type="text "
                className="filterInput placeholder: text-gray-300"
                placeholder="Buscar..."
                onChange={handleOp}
              />
            </div>
          </div>
          <div className=" col-span-2 flex gap-x-2 justify-end items-center ">
            <div
              style={
                selectedType !== "n" ||
                selectedStatus !== "n" ||
                endDate !== "n"
                  ? {}
                  : { visibility: "hidden" }
              }
              onClick={() => {
                setSelectedType("n");
                setSelectedStatus("n");
                setEndDate("n");
                setStartDate("n");
              }}
              className=" cursor-pointer shadow-lg items-center gap-x-2 text-xs rounded-md bg-blue-600 p-2 border-[#474950] text-white font-light"
            >
              <HiRefresh />
            </div>
            <div className="boxFilter ">
              <HiFilter />

              <select
                id="automobile_type"
                className="filterSelect"
                onChange={handleTypeChange}
              >
                <option value="n">Tipo</option>
                <option value="Carro">Carro</option>
                <option value="Moto">Moto</option>
                <option value="Camion">Camion</option>
                <option value="Mula">Mula</option>
              </select>
            </div>

            <div className="boxFilter ">
              <MdFilterTiltShift size={15} />

              <select
                id="automobile_type"
                className="filterSelect"
                onChange={handleStatusChange}
              >
                <option value="n">Estado</option>
                <option value="true">Completado</option>
                <option value="false">En Parqueadero</option>
              </select>
            </div>

            <p>Desde</p>
            <div className="boxFilter px-10 ">
              <input
                type="date"
                name=""
                id=""
                onChange={handleStartDateChange}
                value={startDate === "n" ? "dd/mm/aaaa" : startDate}
              />
            </div>

            <p>Hasta</p>

            <div className="boxFilter px-10  ">
              <input
                type="date"
                name=""
                id=""
                onChange={handleEndDateChange}
                value={endDate === "n" ? "dd/mm/aaaa" : endDate}
              />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs  text-gray-700  ">
            <tr className="trBorder  border-gray-700 ">
              <th scope="col" className="py-2">
                <div className="flex gap-x-1 justify-start items-center">
                  <TbCirclesFilled className="iconTable" size={15} />
                  <h3></h3>
                </div>
              </th>
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
            {entrys
              .filter((entry) => {
                if (searchTerm == "") {
                  return entry;
                } else if (
                  entry.plate.includes(searchTerm) ||
                  entry.valero_num.includes(searchTerm)
                ) {
                  return entry;
                }
              })
              .map((entry: Entry) => (
                <EntryCard key={entry._id} entry={entry} />
              ))}
          </tbody>
        </table>
      </div>
      {showAlert ? <Alert /> : ""}
      {showForm ? (
        <EntryForm setShowForm={setShowForm} showForm={showForm} />
      ) : (
        ""
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("https://parking-soft.vercel.app/api/entry");
  const data = await res.json();

  return {
    props: { data },
  };
}
