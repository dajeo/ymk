import useSWR from "swr";

function createEl(html: string) {
  const buffer = document.createElement("div");
  buffer.innerHTML = html;
  return buffer;
}

const fetcher = (url: string) => fetch(url, { method: "POST" })
  .then(res => res.text())
  .then(data => createEl(data));

const jsonFetcher = (url: string) => fetch(url).then(res => res.json());

function useGroups(department: string | string[] | undefined) {
  const { data, error, isLoading } = useSWR(`/api/students/${department}`, fetcher);
  return { groups: data, isError: error, isLoading };
}

function useSchedule(department: string | string[] | undefined, group: string | string[] | undefined, week: number) {
  const { data, error, isLoading } = useSWR(`/api/students/${department}/${group}/${week}`, fetcher);
  return { schedule: data, isError: error, isLoading };
}

function useTeachers() {
  const { data, error, isLoading } = useSWR("/api/teachers", fetcher);
  return {teachers: data, isError: error, isLoading };
}

function useTeachersSchedule(teacher: string | string[] | undefined, week: number) {
  const { data, error, isLoading } = useSWR(`/api/teachers/${teacher}/${week}`, fetcher);
  return { schedule: data, isError: error, isLoading };
}

function useVersion(version: string) {
  const { data, error, isLoading } = useSWR(`/api/checkVersion/${version}`, jsonFetcher);
  return { data, error, isLoading };
}

function useSnowflakes(): { sfData: { isNewYear: boolean }, sfError: any, sfIsLoading: boolean } {
  const { data, error, isLoading } = useSWR("/api/snowflakes", jsonFetcher);
  return { sfData: data, sfError: error, sfIsLoading: isLoading };
}

export {
  useGroups,
  useSchedule,
  useTeachers,
  useTeachersSchedule,
  useVersion,
  useSnowflakes
};
