import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

export function Error({ children }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      height="calc(100vh - 56px)"
    >
      <Typography variant="h4">{children}</Typography>
    </Box>
  );
}

Error.propTypes = {
  children: PropTypes.string.isRequired
};
