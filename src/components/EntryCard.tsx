import { entryContext } from "@/contexts/EntryContext";
import { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { ratesContext } from "@/contexts/RatesContext";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

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

interface EntryCardProps {
  entry: Entry;
}

type Exit = {
  exit: boolean;
  amount: number;
};
export default function EntryCard({ entry }: EntryCardProps) {
  const { updateStatusEntryAndAmount } = useContext(entryContext);
  const { calculateAutomobileAmount } = useContext(ratesContext);

  const [amountState, setAmountState] = useState<number>(1);
  const [timeDiff, setTimeDiff] = useState<number>(0);

  const dateCreated = new Date(entry.createdAt);
  const formattedTimeCreated = dateCreated.toISOString().substring(11, 16);
  const formattedDateCreated = dateCreated.toISOString().substring(0, 10);

  const createdTime: string = `${formattedTimeCreated} - ${formattedDateCreated}`;

  const dateUpdated = new Date(entry.updatedAt);
  const formattedTimeUpdated = dateUpdated.toISOString().substring(11, 16);
  const formattedDateUpdated = dateUpdated.toISOString().substring(0, 10);

  const updatedTime: string = `${formattedTimeUpdated} - ${formattedDateUpdated}`;

  useEffect(() => {
    const diffInMs =
      new Date(entry.updatedAt).getTime() - new Date(entry.createdAt).getTime();
    setTimeDiff(Math.floor(diffInMs / (1000 * 60 * 60)));
  }, [amountState]);

  const amountCalculate = async () => {
    const amountCalculated = calculateAutomobileAmount(
      timeDiff,
      entry.automobile_type
    );
    const amountStatus: Exit = {
      exit: true,
      amount: amountCalculated,
    };
    console.log(amountCalculated);
    updateStatusEntryAndAmount(entry._id, amountStatus);
  };

  return (
    <tr className="border-b border-gray-700 text-left">
      <th scope="row" className=" font-bold text-gray-400 whitespace-nowrap ">
        {entry.valero_num}
      </th>
      <td className="">{entry.plate}</td>
      <td className="">{entry.automobile_type}</td>
      <td className="">
        {createdTime} -{">"}
        {entry.createdAt !== entry.updatedAt ? updatedTime : ""}
      </td>
      <td className="">
        {entry.exit ? (
          <div className="tagBox flex justify-start items-center gap-x-1 bg-green-500 font-semibold text-white  rounded-full">
            <MdRadioButtonChecked />
            Completado
          </div>
        ) : (
          <div className="tagBox  flex justify-start items-center gap-x-1 bg-blue-500 font-semibold text-white  rounded-full">
            <MdRadioButtonUnchecked />
            En parqueadero
          </div>
        )}
      </td>
      <td>${entry.amount !== undefined ? entry.amount : "---"}</td>

      <th className="text-xs">
        <a
          href="#"
          onClick={() => {
            setAmountState(1);
            amountCalculate();
          }}
          className="font-medium text-red-600  hover:underline"
        >
          Pagar
        </a>
      </th>
    </tr>
  );
}
