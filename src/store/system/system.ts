import { defineStore } from 'pinia'
import { getUserList } from '@/api/system/user/user'

export const useSystemStore = defineStore('system', {
  state: () => {
    return {}
  },
  actions: {
    async getUserTableListAction(payload: any) {
      const userListResult = await getUserList(payload)
      console.log(userListResult.data)
    }
  }
})
