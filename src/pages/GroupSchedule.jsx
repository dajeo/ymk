import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSchedule } from "../api";
import { Progress, NetworkError, Schedule } from "../components";
import { useScrollHere } from "../hooks";

export function GroupSchedule() {
  const { department, group } = useParams();
  const [week, setWeek] = useState(0);
  const { data, error, isLoading } = useSchedule(department, group, week);
  const [isInShortcut, setIsInShortcut] = useState(false);

  useEffect(() => {
    const shortcut = window.localStorage.quickShortcut;
    if (shortcut) {
      const json = JSON.parse(shortcut);
      if (json.group === group) setIsInShortcut(true);
    }
  }, []);

  useScrollHere(data);

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

  if (error) return <NetworkError />;
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
