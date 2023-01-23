import { NextApiRequest, NextApiResponse } from "next";
import { sendRequest } from "../../../../utils/request";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { teacher, week } = req.query;

  if (!teacher || !week) {
    res.status(400).send("Please provide path parameters");
    return;
  }

  const params = new URLSearchParams();
  params.append("name_teacher", teacher.toString());
  params.append("week", week.toString());

  res.status(200).send(await sendRequest("teacher", "teacher_schedule", params));
}
