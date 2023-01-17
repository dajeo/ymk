import React from "react";
import { IconButton, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

interface Props {
  table: Element
}

export function GroupBody({ table }: Props) {
  return (
    <TableBody>
      {[1, 2, 3, 4, 5].map((tableRow) => (
        <React.Fragment key={tableRow}>
          {[table.getElementsByClassName(`time_background${tableRow}`)[0]].map((lesson, lessonIndex) => (
            <TableRow
              key={lessonIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 }} }
            >
              <TableCell align="center">
                {lesson.getElementsByTagName("td")[0].innerText}
              </TableCell>
              <TableCell align="left" sx={{ whiteSpace: "pre-wrap" }}>
                {(() => {
                  const item = lesson.getElementsByTagName("td")[1];
                  const link = item.getElementsByTagName("span")[0];

                  if (!link) return item.innerHTML.replace("<br>", "\n");
                  else {
                    // If anything add replace here
                    return <a style={{ color: "inherit" }} href={link.getAttribute("data-href")!}>
                      {link.getElementsByTagName("u")[0].innerHTML}
                    </a>;
                  }
                })()}
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
                <br />
                {table.getElementsByClassName(`time_background${tableRow}`)[1].getElementsByTagName("td")[0].innerText}
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
}
