import ddRequest from '@/api'
import { IDataType } from '@/api/types'

export interface IRegisterUser {
  username: string
  password: string
}

export function registerUser(payload: IRegisterUser) {
  return ddRequest.post<IDataType>({
    url: '/register',
    data: payload
  })
}
