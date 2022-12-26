import config from "../config.json";
import useSWR from "swr";

function createEl(html) {
  const buffer = document.createElement("div");
  buffer.innerHTML = html;
  return buffer;
}

function url(key) {
  return `${config.apiUrl}/${key}`;
}

const fetcher = url => fetch(url, { method: "POST" })
  .then(res => res.text())
  .then(data => createEl(data));

const jsonFetcher = url => fetch(url).then(res => res.json());

function useGroups(department) {
  const { data, error, isLoading } = useSWR(url(`students/${department}`), fetcher);

  return {
    groups: data,
    isError: error,
    isLoading
  };
}

function useSchedule(department, group, week) {
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

function useTeachersSchedule(teacher, week) {
  const { data, error, isLoading } = useSWR(url(`teachers/${teacher}/${week}`), fetcher);

  return {
    schedule: data,
    isError: error,
    isLoading
  };
}

function useVersion(version) {
  const { data, error, isLoading } = useSWR(url(`checkVersion/${version}`), jsonFetcher);

  return {
    data,
    error,
    isLoading
  };
}

export { useGroups, useSchedule, useTeachers, useTeachersSchedule, useVersion };
