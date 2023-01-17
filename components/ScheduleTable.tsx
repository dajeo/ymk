import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import { GroupBody } from "./GroupBody";
import { TeacherBody } from "./TeacherBody";

interface Props {
  table: Element
  date: string
  type: "group" | "teacher"
}

export function ScheduleTable({ table, date, type }: Props) {
  const isToday = table.getElementsByTagName("table")[0].style.color;

  return (
    <Paper
      id={isToday ? "scrollHere" : ""}
      sx={isToday ? { bgcolor: "#1f5290", color: "white", "th, td": { color: "white" } } : {}}
    >
      <Toolbar disableGutters variant="dense" sx={{ minHeight: 0, pl: "4px" }}>
        <Typography>
          {date}
        </Typography>
      </Toolbar>
      <TableContainer sx={{
        mb: "4px",
        "th, td": {
          pt: 0, pb: 0, pl: "4px", pr: "4px"
        }
      }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="left">предмет</TableCell>
              <TableCell align="right">каб</TableCell>
              <TableCell align="center">преп</TableCell>
              <TableCell align="right">{type === "group" ? "время" : "группа"}</TableCell>
            </TableRow>
          </TableHead>
          {type === "group" ? <GroupBody table={table} /> : <TeacherBody table={table} />}
        </Table>
      </TableContainer>
    </Paper>
  );
}
