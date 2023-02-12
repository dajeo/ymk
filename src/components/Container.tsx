import React, { ReactNode } from "react";
import { Box, Container as MuiContainer } from "@mui/material";

interface Props {
    children: ReactNode
}

export function Container({ children }: Props) {
  return (
    <Box>
      <MuiContainer
        disableGutters
        maxWidth="xl"
        sx={{ pl: "4px", pr: "4px", mb: "56px" }}
      >
        {children}
      </MuiContainer>
    </Box>
  );
}
