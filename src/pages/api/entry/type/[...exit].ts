import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../../utils/database";
import Entry from "../../../../models/entry.model";

dbConnect();

export default async function idEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { slug },
  } = req;

  res.status(200).json({ slug })
  
}
