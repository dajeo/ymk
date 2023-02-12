import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export function Title({ title }) {
  return (
    <Typography variant={"h4"}>
      {title}
    </Typography>
  );
}

Title.propTypes = {
  title: PropTypes.string
};
