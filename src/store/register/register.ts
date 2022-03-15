import { defineStore } from 'pinia'
import { IRegisterUser, registerUser } from '@/api/register/register'

export const useRegisterStore = defineStore('register', {
  state: () => {
    return {
      msg: ''
    }
  },
  actions: {
    async registerUserAction(user: IRegisterUser) {
      const result = await registerUser(user)
      this.msg = result.msg
    }
  }
})
