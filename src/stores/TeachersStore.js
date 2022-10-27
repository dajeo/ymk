import { makeAutoObservable } from 'mobx'

class Teachers {
  teachers = null

  constructor () {
    makeAutoObservable(this)
  }

  setTeachers (teachers) {
    this.teachers = teachers
  }
}

const TeachersGroup = new Teachers()
export default TeachersGroup
