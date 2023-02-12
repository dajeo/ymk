import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  children: string
}

export function Error({ children }: Props) {
  return (
    <Box
      top="0"
      left="0"
      position="absolute"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="100vh"
      width="100%"
    >
      <Typography variant="h6">{children}</Typography>
    </Box>
  );
}
