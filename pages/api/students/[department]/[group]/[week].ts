import { NextApiRequest, NextApiResponse } from "next";
import { sendRequest } from "../../../../../utils/request";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { department, group, week } = req.query;

  if (!group || !department || !week) {
    res.status(400).send("Please provide path parameters");
    return;
  }

  const params = new URLSearchParams();
  params.append("num_group", group.toString());
  params.append("branch", department.toString());
  params.append("week", week.toString());

  res.status(200).send(await sendRequest("student", "schedule_group", params));
}
