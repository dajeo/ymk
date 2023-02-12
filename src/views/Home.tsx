import React from "react";
import { Box, Typography } from "@mui/material";

export function Home() {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      width="100%"
    >
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        ЯМК
      </Typography>
      <Typography variant="body2" sx={{ mt: "-20px", mb: "6px" }}>
        Developed by <a style={{ color: "inherit" }} href="https://github.com/HeadcrabJ">Headcrab</a>
      </Typography>
    </Box>
  );
}
