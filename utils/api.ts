import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import axios from "axios";

function createEl(html: string) {
  const buffer = document.createElement("div");
  buffer.innerHTML = html;
  return buffer;
}

const config: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  revalidateOnFocus: false,
  shouldRetryOnError: false
};

function fetcher(url: string) {
  return axios.post(url).then(res => res.data).then(data => createEl(data));
}

function useFetch(url: string): SWRResponse<HTMLDivElement, Error> {
  return useSWR(`/api/${url}`, fetcher, config);
}

function useGroups(department: string) {
  return useFetch(`students/${department}`);
}

function useSchedule(department: string | string[] | undefined, group: string | string[] | undefined, week: number) {
  return useFetch(`students/${department}/${group}/${week}`);
}

function useTeachers() {
  return useFetch("teachers");
}

function useTeachersSchedule(teacher: string, week: number) {
  return useFetch(`teachers/${teacher}/${week}`);
}

export { useGroups, useSchedule, useTeachers, useTeachersSchedule };
