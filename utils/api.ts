import config from "../config.json";
import useSWR from "swr";

function createEl(html: string) {
  const buffer = document.createElement("div");
  buffer.innerHTML = html;
  return buffer;
}

function url(key: string) {
  return `${config.apiUrl}/${key}`;
}

const fetcher = (url: string) => fetch(url, { method: "POST" })
  .then(res => res.text())
  .then(data => createEl(data));

const jsonFetcher = (url: string) => fetch(url).then(res => res.json());

function useGroups(department: string | string[] | undefined) {
  const { data, error, isLoading } = useSWR(url(`students/${department}`), fetcher);

  return {
    groups: data,
    isError: error,
    isLoading
  };
}

function useSchedule(department: string | string[] | undefined, group: string | string[] | undefined, week: number) {
  const { data, error, isLoading } = useSWR(url(`students/${department}/${group}/${week}`), fetcher);

  return {
    schedule: data,
    isError: error,
    isLoading
  };
}

function useTeachers() {
  const { data, error, isLoading } = useSWR(url("teachers"), fetcher);

  return {
    teachers: data,
    isError: error,
    isLoading
  };
}

function useTeachersSchedule(teacher: string | string[] | undefined, week: number) {
  const { data, error, isLoading } = useSWR(url(`teachers/${teacher}/${week}`), fetcher);

  return {
    schedule: data,
    isError: error,
    isLoading
  };
}

function useVersion(version: string) {
  const { data, error, isLoading } = useSWR(url(`checkVersion/${version}`), jsonFetcher);

  return {
    data,
    error,
    isLoading
  };
}

export { useGroups, useSchedule, useTeachers, useTeachersSchedule, useVersion };
