import { NextApiRequest, NextApiResponse } from "next";
import { get } from "@vercel/edge-config";

type Data = {
  isNewYear: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const isNewYear = await get("isNewYear");
    res.status(200).json({ isNewYear: isNewYear });
  } catch (e) {
    res.status(200).json({ isNewYear: false });
  }
}
