import { Grid, Box, IconButton } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useSchedule } from "../../../utils/api";
import { Progress, ScheduleDay, Title, Container, Error } from "../../../components";
import { useRouter } from "next/router";

export default function Schedule() {
  const router = useRouter();
  const { department, group } = router.query;
  const [week, setWeek] = useState(0);
  const { schedule, isError, isLoading } = useSchedule(department, group, week);
  const [isInShortcut, setIsInShortcut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const shortcut = window.localStorage.quickShortcut;
    if (shortcut) {
      const json = JSON.parse(shortcut);
      if (json.group === group) setIsInShortcut(true);
    }
  }, [group]);

  useEffect(() => {
    if (isScrolled) return;
    const el = document.getElementById("scrollHere");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setIsScrolled(true);
  }, [isScrolled]);

  function previousWeek() {
    setWeek(week - 1);
  }

  function nextWeek() {
    setWeek(week + 1);
  }

  function addGroup() {
    if (isInShortcut) {
      window.localStorage.removeItem("quickShortcut");
    } else {
      window.localStorage.quickShortcut = JSON.stringify({ department, group });
    }

    window.dispatchEvent(new Event("storage"));
    setIsInShortcut(!isInShortcut);
  }

  if (isError) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Title title={group!.toString()} />
        <IconButton onClick={addGroup}>
          <FavoriteRoundedIcon sx={isInShortcut ? { color: "red" } : {}} />
        </IconButton>
      </Box>
      {schedule!.getElementsByClassName("uchen")[0]
        ? null
        : <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 138px)">
          <h3>Хм, здесь почему-то пусто 🤔</h3>
        </Box>
      }
      <Grid container columnSpacing="4px" columns={{ xs: 4, md: 10 }}>
        <Grid item xs={4} md={5}>
          {[...schedule!.getElementsByClassName("uchen")].map((table, tableIndex) => {
            const date = (table.getElementsByClassName("back_date")[0] as HTMLElement).innerText;

            if (!date.startsWith("Понедельник") && !date.startsWith("Вторник") && !date.startsWith("Среда")) {
              return null;
            }

            return <ScheduleDay key={tableIndex} table={table} date={date} />;
          })}
        </Grid>
        <Grid item xs={4} md={5}>
          {[...schedule!.getElementsByClassName("uchen")].map((table, tableIndex) => {
            const date = (table.getElementsByClassName("back_date")[0] as HTMLElement).innerText;

            if (!date.startsWith("Четверг") && !date.startsWith("Пятница") && !date.startsWith("Суббота")) {
              return null;
            }

            return <ScheduleDay key={tableIndex} table={table} date={date} />;
          })}
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          {schedule!.getElementsByClassName("previous_week")[0]
            ? <LoadingButton
              fullWidth
              onClick={previousWeek}
            >Предыдущая</LoadingButton>
            : ""}
        </Grid>
        <Grid item xs={6}>
          {schedule!.getElementsByClassName("next_week")[0]
            ? <LoadingButton
              fullWidth
              onClick={nextWeek}
            >Следующая</LoadingButton>
            : ""}
        </Grid>
      </Grid>
    </Container>
  );
}
