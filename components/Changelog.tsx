import { ReactNode } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  v: string
  children: ReactNode
}

export function Changelog({ v, children }: Props) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 600, mb: "4px" }}>
      <CardContent sx={{ p: "10px", "&:last-child": { pb: "10px" } }}>
        <Typography variant="h6" sx={{ fontWeight: "100" }}>
          Version {v}
        </Typography>
        <Typography variant="body2">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}
