import { NextApiRequest, NextApiResponse } from "next";
import { get } from "@vercel/edge-config";

type Data = {
  latest: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { clientVersion } = req.query;
  const latestVersion = await get("latestVersion");
  let isLatest = false;

  if (clientVersion === latestVersion) {
    isLatest = true;
  }

  res.status(200).json({ latest: isLatest });
}