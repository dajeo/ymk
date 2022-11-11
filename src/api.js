import config from '../config.json'

function createEl (html) {
  const buffer = document.createElement('div')
  buffer.innerHTML = html
  return buffer
}

function fetchTeachers () {
  return fetch(`${config.apiUrl}/teachers`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => createEl(data))
}

function fetchTeacherSchedule (teacher, week) {
  return fetch(`${config.apiUrl}/teachers/${teacher}/${week}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => createEl(data))
}

function fetchGroups (department) {
  return fetch(`${config.apiUrl}/students/${department}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => createEl(data))
}

function fetchSchedule (department, group, week) {
  return fetch(`${config.apiUrl}/students/${department}/${group}/${week}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => createEl(data))
}

export { fetchTeachers, fetchTeacherSchedule, fetchGroups, fetchSchedule }
