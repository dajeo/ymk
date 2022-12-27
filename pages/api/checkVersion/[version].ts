import { NextApiRequest, NextApiResponse } from "next";
import { get } from "@vercel/edge-config";

type Data = {
  latest: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { version } = req.query;
  const latestVersion = await get("latestVersion");
  let isLatest = version === latestVersion;

  res.status(200).json({ latest: isLatest });
}