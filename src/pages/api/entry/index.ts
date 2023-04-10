import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";
import Entry from "../../../models/entry.model";

dbConnect();

export default async function indexEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const entry = await Entry.find();
        return res.status(200).json(entry);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "POST":
      try {
        const { valero_num, plate, automobile_type, amount, exit, type } = body;

        const newEntry = new Entry({
          valero_num,
          plate,
          automobile_type,
          amount,
          exit,
          type,
        });

        const entrySaved = await newEntry.save();

        return res.status(200).json(entrySaved);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
