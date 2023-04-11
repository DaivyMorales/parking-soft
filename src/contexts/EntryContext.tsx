import { ReactNode, createContext, useState } from "react";
import axios from "axios";
import { ObjectEncodingOptions } from "fs";

interface EntryContextProviderProps {
  children: ReactNode;
}

interface Request {
  valero_num: string;
  plate: string;
  automobile_type: string;
  amount?: number;
  exit: boolean;
  _id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface StateContext {
  entrys: Request[];
  setEntrys: React.Dispatch<React.SetStateAction<Request[]>>;
  updateEntry: (id: string, body: Request) => Promise<void>;
  updateStatusEntryAndAmount: (id: string, exit: object) => Promise<void>;
  createEntry: (body: object) => Promise<void>;
  filterAutomobile: (type: string) => Promise<void>;
  getEntrys: () => Promise<void>;
  filterStatus: (status: string) => Promise<void>;
  filterAllCategories: (
    type: string,
    status: boolean | string,
    start: string,
    end: string
  ) => Promise<void>;
}

export const entryContext = createContext<StateContext>({
  entrys: [],
  setEntrys: () => {},
  updateEntry: async () => {},
  updateStatusEntryAndAmount: async () => {},
  createEntry: async () => {},
  filterAutomobile: async () => {},
  filterStatus: async () => {},
  getEntrys: async () => {},
  filterAllCategories: async () => {},
});

export const EntryContextProvider: React.FC<EntryContextProviderProps> = ({
  children,
}) => {
  const [entrys, setEntrys] = useState<Request[]>([]);

  const updateEntry = async (id: string, body: object) => {
    try {
      const response = await axios.put(
        `https://parking-soft.vercel.app/api/entry/${id}`,
        body
      );

      setEntrys(
        entrys.map((entry) => {
          if (entry._id === id) {
            return response.data;
          } else {
            return entry;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatusEntryAndAmount = async (id: string, body: object) => {
    try {
      const response = await axios.put(
        `https://parking-soft.vercel.app/api/entry/${id}`,
        body
      );

      setEntrys(
        entrys.map((entry) => {
          if (entry._id === id) {
            return response.data;
          } else {
            return entry;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filterAutomobile = async (type: string) => {
    const response = await axios.get(
      `https://parking-soft.vercel.app/api/entry/type/${type}`
    );
    setEntrys(response.data);
  };

  const filterStatus = async (status: string) => {
    const response = await axios.get(
      `https://parking-soft.vercel.app/api/entry/status/${status}`
    );
    setEntrys(response.data);
  };

  const createEntry = async (body: object) => {
    try {
      const response = await axios.post(
        "https://parking-soft.vercel.app/api/entry",
        body
      );
      setEntrys([...entrys, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getEntrys = async () => {
    try {
      const response = await axios.get(
        "https://parking-soft.vercel.app/api/entry"
      );
      setEntrys(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterAllCategories = async (
    type: string,
    status: boolean | string,
    start: string,
    end: string
  ) => {
    try {
      const response = await axios.get(
        `https://parking-soft.vercel.app/api/entry/filter/${type}/${status}/${start}/${end}/`
      );
      setEntrys(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <entryContext.Provider
      value={{
        entrys,
        setEntrys,
        updateEntry,
        updateStatusEntryAndAmount,
        createEntry,
        filterAutomobile,
        getEntrys,
        filterStatus,
        filterAllCategories,
      }}
    >
      {children}
    </entryContext.Provider>
  );
};
