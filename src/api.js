import config from '../config.json'

function createEl (html) {
  const buffer = document.createElement('div')
  buffer.innerHTML = html
  return buffer
}

function fetchGroups (department) {
  return fetch(`${config.apiUrl}/groups/${department}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => {
      return createEl(data)
    })
}

function fetchSchedule (department, group, page) {
  return fetch(`${config.apiUrl}/schedule/${department}/${group}/${page}`,
    { method: 'post' })
    .then((res) => res.text())
    .then((data) => {
      return createEl(data)
    })
}

export { fetchGroups, fetchSchedule }
