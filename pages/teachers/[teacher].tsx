import React, { useEffect, useState } from "react";
import { useTeachersSchedule } from "../../utils/api";
import { Progress, Error, List } from "../../components";
import { useRouter } from "next/router";

export default function TeacherSchedule() {
  const router = useRouter();
  const [teacher, setTeacher] = useState("");
  const [week, setWeek] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { schedule, isError, isLoading } = useTeachersSchedule(teacher, week);

  useEffect(() => {
    if (!router.isReady) return;

    setTeacher(router.query["teacher"]!.toString());
  }, [router.isReady, router.query]);

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
    <List
      title={teacher!.toString()}
      schedule={schedule}
      previousWeek={previousWeek}
      nextWeek={nextWeek}
      type="teacher"
    />
  );
}
