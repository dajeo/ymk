import React from "react";
import { Box, Container as MuiContainer } from "@mui/material";
import PropTypes from "prop-types";

export function Container({ children }) {
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

Container.propTypes = {
  children: PropTypes.array
};
