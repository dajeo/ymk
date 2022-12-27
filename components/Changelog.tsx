import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  v: string
  date: string
  children: React.ReactNode
}

export function Changelog({ v, date, children }: Props) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 600, mb: "4px" }}>
      <CardContent sx={{ p: "10px", "&:last-child": { pb: "10px" } }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {date}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: "100" }}>
          Version {v}
        </Typography>
        <Typography variant="body2">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}
