import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export function Changelog({ v, children }) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 600, mb: "4px" }}>
      <CardContent sx={{ p: "10px", "&:last-child": { pb: "10px" } }}>
        <Typography variant="h6" sx={{ fontWeight: "300" }}>
          Version {v}
        </Typography>
        <Typography variant="body2">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

Changelog.propTypes = {
  v: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
