import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export function Item({ children }) {
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

Item.propTypes = {
  children: PropTypes.string
};
