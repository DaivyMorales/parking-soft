import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";

dbConnect();

export default function indexEntry(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.json("Getting entry information");
      break;

    case "POST":
      res.json("Creating new information");
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
