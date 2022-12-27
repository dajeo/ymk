import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTeachersSchedule } from "../../utils/api";
import { Progress, TeacherScheduleDay, Title, Container, Error } from "../../components";
import { useRouter } from "next/router";

export default function TeacherSchedule() {
  const router = useRouter();
  const { teacher } = router.query;
  const [week, setWeek] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { schedule, isError, isLoading } = useTeachersSchedule(teacher, week);

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

  if (isError) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Container>
      <Title title={teacher!.toString()} />
      <Grid container columnSpacing={"4px"} columns={{ xs: 4, md: 10 }}>
        <Grid item xs={4} md={5}>
          {[...schedule!.getElementsByClassName("container_table")].map((table, tableIndex) => {
            const date = table.getElementsByClassName("back_date")[0].innerHTML;

            if (!date.startsWith("Понедельник") && !date.startsWith("Вторник") && !date.startsWith("Среда")) {
              return null;
            }

            return <TeacherScheduleDay key={tableIndex} table={table} date={date} />;
          })}
        </Grid>
        <Grid item xs={4} md={5}>
          {[...schedule!.getElementsByClassName("container_table")].map((table, tableIndex) => {
            const date = table.getElementsByClassName("back_date")[0].innerHTML;

            if (!date.startsWith("Четверг") && !date.startsWith("Пятница") && !date.startsWith("Суббота")) {
              return null;
            }

            return <TeacherScheduleDay key={tableIndex} table={table} date={date} />;
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
