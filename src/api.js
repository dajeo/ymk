import useSWR from "swr";

const API_URL = "https://ymk-api.vercel.app";

function createEl(html) {
  const buffer = document.createElement("div");
  buffer.innerHTML = html;
  return buffer;
}

const fetcher = url => fetch(url, { method: "POST" })
  .then(res => res.text())
  .then(data => createEl(data));

const config = {
  revalidateIfStale: false,
  revalidateOnReconnect: false,
  revalidateOnFocus: false,
  shouldRetryOnError: false
};

function useFetch(url) {
  return useSWR(`${API_URL}/${url}`, fetcher, config);
}

function useGroups(department) {
  return useFetch(`students/${department}`);
}

function useSchedule(department, group, week) {
  return useFetch(`students/${department}/${group}/${week}`);
}

function useTeachers() {
  return useFetch("teachers");
}

function useTeachersSchedule(teacher, week) {
  return useFetch(`teachers/${teacher}/${week}`);
}

export { useGroups, useSchedule, useTeachers, useTeachersSchedule };
