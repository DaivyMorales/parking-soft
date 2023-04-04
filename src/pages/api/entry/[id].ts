import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";
import Entry from "../../../models/entry.model";

dbConnect();

export default async function idEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const entry = await Entry.findById(id);

        if (!entry) return res.status(404).json({ msg: "Entry not found" });

        return res.status(200).json(entry);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "PUT":
      try {
        const entry = await Entry.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!entry) return res.status(404).json({ msg: "Entry not found" });

        return res.status(200).json(entry);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "DELETE":
      try {
        const deletedEntry = await Entry.findByIdAndRemove(id);

        if (!deletedEntry)
          return res.status(404).json({ msg: "Entry not found" });

        return res.status(204).json("Entry deleted!");
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
