import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTeachersSchedule } from "../api";
import { Progress, Error, Schedule } from "../components";
import { useScrollHere } from "../hooks";

export function TeacherSchedule() {
  const { teacher } = useParams();
  const [week, setWeek] = useState(0);
  const { data, error, isLoading } = useTeachersSchedule(teacher, week);

  useScrollHere(data);

  function previousWeek() {
    setWeek(week - 1);
  }

  function nextWeek() {
    setWeek(week + 1);
  }

  if (error) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Schedule
      title={teacher}
      schedule={data}
      previousWeek={previousWeek}
      nextWeek={nextWeek}
      type="teacher"
    />
  );
}
