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

function fetchGroups (department) {
  return fetch(`${config.apiUrl}/students/${department}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => createEl(data))
}

function fetchSchedule (department, group, page) {
  return fetch(`${config.apiUrl}/students/${department}/${group}/${page}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => createEl(data))
}

export { fetchTeachers, fetchGroups, fetchSchedule }
