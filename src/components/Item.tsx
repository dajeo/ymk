import React, { ReactNode } from "react";
import { Typography } from "@mui/material";

interface Props {
  children: ReactNode
}

export function Item({ children }: Props) {
  return (
    <Typography
      variant="body2"
      component="span"
      sx={{ display: "list-item", listStylePosition: "inside", "&::marker": { content: '"• "' } }} // eslint-disable-line quotes
    >
      {children}
    </Typography>
  );
}
