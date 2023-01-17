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

interface Props {
  table: Element
  date: string
}

export function TeacherScheduleDay({ table, date }: Props) {
  const isToday = table.getElementsByTagName("table")[0].style.color;

  return (
    <Paper
      id={isToday ? "scrollHere" : ""}
      sx={isToday ? { bgcolor: "action.hover" } : {}}
    >
      <Toolbar disableGutters variant="dense" sx={{ minHeight: 0, pl: "4px" }}>
        <Typography>
          {date + (isToday ? " (Сегодня)" : "")}
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
              <TableCell align="right">группа</TableCell>
            </TableRow>
          </TableHead>

        </Table>
      </TableContainer>
    </Paper>
  );
}
