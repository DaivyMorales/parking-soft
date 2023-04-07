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
  createdAt: string;
  updatedAt: string;
}

interface StateContext {
  entrys: Request[];
  setEntrys: React.Dispatch<React.SetStateAction<Request[]>>;
  updateEntry: (id: string, body: Request) => Promise<void>;
  updateStatusEntryAndAmount: (id: string, exit: object) => Promise<void>;
  createEntry: (body: object) => Promise<void>;
}

export const entryContext = createContext<StateContext>({
  entrys: [],
  setEntrys: () => {},
  updateEntry: async () => {},
  updateStatusEntryAndAmount: async () => {},
  createEntry: async () => {},
});

export const EntryContextProvider: React.FC<EntryContextProviderProps> = ({
  children,
}) => {
  const [entrys, setEntrys] = useState<Request[]>([]);

  const updateEntry = async (id: string, body: object) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/entry/${id}`,
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
        `http://localhost:3000/api/entry/${id}`,
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

  const createEntry = async (body: object) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/entry",
        body
      );
      setEntrys([...entrys, response.data]);
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
      }}
    >
      {children}
    </entryContext.Provider>
  );
};
