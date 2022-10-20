import { makeAutoObservable } from 'mobx'

class Groups {
  groups = new Map()

  constructor () {
    makeAutoObservable(this)
  }

  addGroups (department, groups) {
    this.groups.set(department, groups)
  }
}

const GroupsStore = new Groups()
export default GroupsStore
