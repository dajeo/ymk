import { makeAutoObservable } from 'mobx'

class Groups {
  groups = null

  constructor () {
    makeAutoObservable(this)
  }

  setGroups (groups) {
    this.groups = groups
  }
}

const GroupsStore = new Groups()
export default GroupsStore
