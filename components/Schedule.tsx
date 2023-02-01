import { Box, Grid, IconButton, Button } from "@mui/material";
import { Title } from "./Title";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { ScheduleTable } from "./ScheduleTable";
import { Container } from "./Container";

interface Props {
  title: string,
  addGroup?: () => void,
  isInShortcut?: boolean
  schedule: HTMLDivElement | undefined
  previousWeek: () => void,
  nextWeek: () => void,
  type: "group" | "teacher"
}

export function Schedule({ title, addGroup, isInShortcut, schedule, previousWeek, nextWeek, type }: Props) {
  function Empty() {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 138px)">
        <h3>Хм, здесь почему-то пусто 🤔</h3>
      </Box>
    );
  }

  if (!schedule) return <Empty />;
  
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Title title={title} />
        {type === "group"
        ? <IconButton onClick={addGroup}>
            <FavoriteRoundedIcon sx={isInShortcut ? { color: "red" } : {}} />
          </IconButton>
        : null}
      </Box>
      {schedule.getElementsByClassName(type === "group" ? "uchen" : "container_table")[0]
        ? null
        : <Empty />
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
              sx={{ bgcolor: "#1f5290", color: "white" }}
            >Предыдущая</Button>
            : null}
        </Grid>
        <Grid item xs={6}>
          {schedule.getElementsByClassName("next_week")[0]
            ? <Button
              variant="contained"
              fullWidth
              onClick={nextWeek}
              sx={{ bgcolor: "#1f5290", color: "white" }}
            >Следующая</Button>
            : null}
        </Grid>
      </Grid>
    </Container>
  );
}