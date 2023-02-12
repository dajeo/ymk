import useSWR from "swr";

const API_URL = "https://ymk-api.vercel.app";

function createEl(html: string) {
  const buffer = document.createElement("div");
  buffer.innerHTML = html;
  return buffer;
}

const fetcher = (url: string) => fetch(url, { method: "POST" })
  .then(res => res.text())
  .then(data => createEl(data));

const config = {
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  revalidateOnFocus: false,
  shouldRetryOnError: false
};

function useFetch(url: string) {
  return useSWR(`${API_URL}/${url}`, fetcher, config);
}

function useGroups(department: string | undefined) {
  return useFetch(`students/${department}`);
}

function useSchedule(department: string | undefined, group: string | undefined, week: number) {
  return useFetch(`students/${department}/${group}/${week}`);
}

function useTeachers() {
  return useFetch("teachers");
}

function useTeachersSchedule(teacher: string | undefined, week: number) {
  return useFetch(`teachers/${teacher}/${week}`);
}

export { useGroups, useSchedule, useTeachers, useTeachersSchedule };
