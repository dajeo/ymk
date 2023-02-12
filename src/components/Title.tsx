import React from "react";
import { Typography } from "@mui/material";

interface Props {
  title: string | undefined
}

export function Title({ title }: Props) {
  return (
    <Typography variant={"h4"}>
      {title}
    </Typography>
  );
}
