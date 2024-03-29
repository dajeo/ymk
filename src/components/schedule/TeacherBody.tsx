import React, { Fragment } from "react";
import { IconButton, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

interface Props {
  table: Element
}

export function TeacherBody({ table }: Props) {
  return (
    <TableBody>
      {[2, 3, 4, 5, 6].map((tableRow) => (
        <Fragment key={tableRow}>
          {[table.getElementsByTagName("tr")[tableRow]].map((lesson) => {
            if (!lesson) return null;

            return (
              <TableRow
                key={tableRow}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {lesson.getElementsByTagName("td")[0].innerText}
                </TableCell>
                <TableCell align="left" sx={{ whiteSpace: "pre-wrap" }}>
                  {lesson.getElementsByTagName("td")[1].innerText}
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: "pre-wrap" }}>
                  {lesson.getElementsByTagName("td")[2].innerHTML.replace("<br>", "\n")}
                </TableCell>
                <TableCell align="center" sx={{ height: 1 }}>
                  {(() => {
                    const teachers = lesson.getElementsByTagName("td")[3].innerHTML.replace("<br>", "\n");

                    if (teachers) {
                      return <Tooltip
                        title={<div style={{ whiteSpace: "pre-wrap" }}>{teachers}</div>}
                        enterTouchDelay={0}
                        disableInteractive
                      >
                        <IconButton size="small" color="inherit">
                          <ArrowDropDownRoundedIcon />
                        </IconButton>
                      </Tooltip>;
                    }
                  })()}
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  {lesson.getElementsByTagName("td")[4].innerText}
                </TableCell>
              </TableRow>
            );
          })}
        </Fragment>
      ))}
    </TableBody>
  );
}
