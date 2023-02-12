import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSchedule } from "../api";
import { Progress, NetworkError, Schedule } from "../components";
import { useScrollHere } from "../hooks";

export function GroupSchedule() {
  const { department, group } = useParams();
  const [week, setWeek] = useState(0);
  const { data, error, isLoading } = useSchedule(department, group, week);

  useScrollHere(data);

  function previousWeek() {
    setWeek(week - 1);
  }

  function nextWeek() {
    setWeek(week + 1);
  }

  if (error) return <NetworkError />;
  if (isLoading) return <Progress />;

  return (
    <Schedule
      title={group}
      schedule={data}
      previousWeek={previousWeek}
      nextWeek={nextWeek}
      type="group"
    />
  );
}
