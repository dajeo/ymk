import { makeAutoObservable } from 'mobx'

class Schedule {
  schedules = new Map()

  constructor () {
    makeAutoObservable(this)
  }

  addSchedule (group, schedule) {
    this.schedules.set(group, schedule)
  }
}

const ScheduleStore = new Schedule()
export default ScheduleStore
