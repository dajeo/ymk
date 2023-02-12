import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Button } from "@mui/material";
import { Title } from "../Title";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { ScheduleTable } from "./ScheduleTable";
import { Container } from "../Container";
import { EmptyError } from "../index";
import { useLocation } from "react-router-dom";

interface Props {
    title: string | undefined,
    schedule: HTMLDivElement | undefined
    previousWeek: () => void,
    nextWeek: () => void,
    type: "group" | "teacher"
}

export function Schedule({ title, schedule, previousWeek, nextWeek, type }: Props) {
  const location = useLocation();
  const [isInShortcut, setIsInShortcut] = useState(false);

  useEffect(() => {
    const shortcut = window.localStorage.quickShortcut;
    if (shortcut) {
      const json = JSON.parse(shortcut);
      if (json.url === location.pathname) setIsInShortcut(true);
    }
  });

  if (!schedule) return <EmptyError />;

  function addToShortcut() {
    if (isInShortcut) {
      window.localStorage.removeItem("quickShortcut");
    } else {
      window.localStorage.quickShortcut = JSON.stringify({
        name: title,
        url: location.pathname
      });
    }

    window.dispatchEvent(new Event("storage"));
    setIsInShortcut(!isInShortcut);
  }

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Title title={title} />
        <IconButton onClick={addToShortcut}>
          <FavoriteRoundedIcon sx={isInShortcut ? { color: "red" } : {}} />
        </IconButton>
      </Box>
      {schedule.getElementsByClassName(type === "group" ? "uchen" : "container_table")[0]
        ? null
        : <EmptyError />
      }
      <Grid container columnSpacing="4px" columns={{ xs: 4, md: 10 }} sx={{ mb: "106px" }}>
        <Grid item xs={4} md={5}>
          {[...schedule.getElementsByClassName(type === "group" ? "uchen" : "container_table")].map((table, tableIndex) => {
            const date = (table.getElementsByClassName("back_date")[0] as HTMLElement).innerText;

            if (!date.startsWith("Понедельник") && !date.startsWith("Вторник") && !date.startsWith("Среда")) {
              return null;
            }

            return <ScheduleTable key={tableIndex} table={table} date={date} type={type} />;
          })}
        </Grid>
        <Grid item xs={4} md={5}>
          {[...schedule.getElementsByClassName(type === "group" ? "uchen" : "container_table")].map((table, tableIndex) => {
            const date = (table.getElementsByClassName("back_date")[0] as HTMLElement).innerText;

            if (!date.startsWith("Четверг") && !date.startsWith("Пятница") && !date.startsWith("Суббота")) {
              return null;
            }

            return <ScheduleTable key={tableIndex} table={table} date={date} type={type} />;
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ position: "fixed", bottom: 0, left: 0, mb: "56px", p: 1 }}>
        <Grid item xs={6}>
          {schedule.getElementsByClassName("previous_week")[0]
            ? <Button
              variant="contained"
              fullWidth
              onClick={previousWeek}
            >Предыдущая</Button>
            : null}
        </Grid>
        <Grid item xs={6}>
          {schedule.getElementsByClassName("next_week")[0]
            ? <Button
              variant="contained"
              fullWidth
              onClick={nextWeek}
            >Следующая</Button>
            : null}
        </Grid>
      </Grid>
    </Container>
  );
}
