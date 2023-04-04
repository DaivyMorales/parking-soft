import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";

dbConnect();

export default function idEntry(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      res.json("Getting entry information");
      break;

    case "PUT":
      res.json("Updating information");
      break;

    case "DELETE":
      res.json("Removing information");
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
