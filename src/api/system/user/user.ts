import ddRequest from '@/api'
import { IDataType } from '@/api/types'

enum userAPI {
  listInfo = '/system/user/list'
}

export function getUserList(payload: any) {
  return ddRequest.post<IDataType>({
    url: userAPI.listInfo,
    data: payload
  })
}
