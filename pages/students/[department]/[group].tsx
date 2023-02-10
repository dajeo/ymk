import { useEffect, useState } from "react";
import { useSchedule } from "../../../utils/api";
import { Progress, Error, Schedule } from "../../../components";
import { GetServerSideProps } from "next";

interface Props {
  department: string,
  group: string
}

export default function SchedulePage({ department, group }: Props) {
  const [week, setWeek] = useState(0);
  const { data, error, isLoading } = useSchedule(department, group, week);
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

export const getServerSideProps: GetServerSideProps = async(context) => {
  const department = context.params?.department;
  const group = context.params?.group;

  return { props: { department, group } };
};
