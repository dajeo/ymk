import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export function Progress() {
  return (
    <Backdrop open={true} sx={{ zIndex: 999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
