import { NextApiRequest, NextApiResponse } from "next";
import { sendRequest } from "../../../utils/request";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { department } = req.query;

  const params = new URLSearchParams();
  params.append("branch", department!.toString());

  res.status(200).send(await sendRequest("student", "list_group", params));
}
