import { useEffect, useState } from "react";
import { useSchedule } from "../../../utils/api";
import { Progress, Error, Schedule } from "../../../components";
import { useRouter } from "next/router";

export default function SchedulePage() {
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [group, setGroup] = useState("");
  const [week, setWeek] = useState(0);
  const { data, error, isLoading } = useSchedule(department, group, week);
  const [isInShortcut, setIsInShortcut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const departmentTemp = router.query["department"];
    const groupTemp = router.query["group"];

    if (!departmentTemp || !groupTemp) return;

    setDepartment(departmentTemp.toString());
    setGroup(groupTemp.toString());
  }, [router.isReady, router.query]);

  useEffect(() => {
    const shortcut = window.localStorage.quickShortcut;
    if (shortcut) {
      const json = JSON.parse(shortcut);
      if (json.group === group) setIsInShortcut(true);
    }
  }, [group]);

  useEffect(() => {
    if (isScrolled) return;
    if (!data) return;
    const el = document.getElementById("scrollHere");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setIsScrolled(true);
  }, [isScrolled, data]);

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

  if (error) return <Error />;
  if (isLoading) return <Progress />;

  return (
    <Schedule
      title={group}
      addGroup={addGroup}
      isInShortcut={isInShortcut}
      schedule={data}
      previousWeek={previousWeek}
      nextWeek={nextWeek}
      type="group"
    />
  );
}
