import { useState } from "react";
import { useTeachersSchedule } from "../../utils/api";
import { Progress, Error, Schedule } from "../../components";
import { GetServerSideProps } from "next";
import { useScrollHere } from "../../utils/hooks";

interface Props {
  teacher: string
}

export default function TeacherSchedulePage({ teacher }: Props) {
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

export const getServerSideProps: GetServerSideProps = async(context) => {
  const teacher = context.params?.teacher;

  return { props: { teacher } };
};
