// const { slug } = req.query
// res.status(200).json({ slug })

import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../../utils/database";
import Entry from "../../../../models/entry.model";

dbConnect();

interface IElements {
  automobile_type?: string;
  exit?: boolean | null;
  createdAt?: { $gte?: any; $lte?: any };
}

export default async function idEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { slug },
  } = req;

  if (!slug || slug.length === 0  ) {
    return res.status(500).json("There's not elements");
  }

  const type = slug?.[0];
  const statusStr = slug?.[1];
  const startDate = slug?.[2];
  const endDate = slug?.[3];

  const start = startDate !== "n" ? new Date(startDate) : "n";
  const end = endDate !== "n" ? new Date(endDate) : "n";

  let status;

  if (statusStr === "true") {
    status = true;
  } else if (statusStr === "false") {
    status = false;
  } else if (statusStr === "n") {
    status = null;
  } else {
    status = undefined;
  }



  let elements: IElements = {
    automobile_type: type,
    exit: status,
    createdAt: { $gte: start, $lte: end },
  };

  if (type === undefined || type === "n") {
    delete elements.automobile_type;
  }

  if (status === null) {
    delete elements.exit;
  }

  if (startDate === "n" || endDate === "n") {
    delete elements.createdAt;
  }

  // res.json(slug);

  switch (method) {
    case "GET":
      try {
        const entry = await Entry.find(elements);

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

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
