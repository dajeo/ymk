import { makeAutoObservable } from 'mobx'

class TeacherSchedule {
  schedules = new Map()

  constructor () {
    makeAutoObservable(this)
  }

  addSchedule (teacher, schedule) {
    this.schedules.set(teacher, schedule)
  }
}

const TeacherScheduleStore = new TeacherSchedule()
export default TeacherScheduleStore
