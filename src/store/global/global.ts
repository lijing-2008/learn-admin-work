import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      message: 'globalMsg'
    }
  },
  actions: {
    setMsg(msg: string) {
      this.message = msg
    }
  }
})
