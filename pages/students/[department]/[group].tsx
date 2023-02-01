import { useEffect, useState } from "react";
import { useSchedule } from "../../../utils/api";
import { Progress, Error, Schedule } from "../../../components";
import { useRouter } from "next/router";

export default function SchedulePage() {
  const router = useRouter();
  const [department, setDepartment] = useState(router.query["department"]);
  const [group, setGroup] = useState(router.query["group"]);
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
    if (!schedule) return;
    const el = document.getElementById("scrollHere");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setIsScrolled(true);
  }, [isScrolled, schedule]);

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
    <Schedule
      title={group}
      addGroup={addGroup}
      isInShortcut={isInShortcut}
      schedule={schedule}
      previousWeek={previousWeek}
      nextWeek={nextWeek}
      type="group"
    />
  );
}
