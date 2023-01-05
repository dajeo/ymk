import { NextApiRequest, NextApiResponse } from "next";
import { sendRequest } from "../../../utils/request";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const params = new URLSearchParams();
  params.append("student", "oenp");

  res.status(200).send(await sendRequest("teacher", "list_alphabet", params));
}
