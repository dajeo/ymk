import React, { useEffect, useState } from "react";
import { useSchedule } from "../../../utils/api";
import { Progress, Error, List } from "../../../components";
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
    <List
      title={group!.toString()}
      addGroup={addGroup}
      isInShortcut={isInShortcut}
      schedule={schedule}
      previousWeek={previousWeek}
      nextWeek={nextWeek}
      type="group"
    />
  );
}
