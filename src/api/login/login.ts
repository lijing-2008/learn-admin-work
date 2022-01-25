import { IAccount, ILoginResult } from './type'
import ddRequest from '..'
import { IDataType } from '../types'

enum loginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  LoginAllMenus = '/menus',
  LoginUserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return ddRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return ddRequest.get<IDataType>({
    url: loginAPI.LoginUserInfo + `${id}`
  })
}

export function requestAllMenus() {
  return ddRequest.get<IDataType>({
    url: loginAPI.LoginAllMenus
  })
}

export function requestUserMenusByRoleId(id: number) {
  return ddRequest.get<IDataType>({
    url: loginAPI.LoginUserMenus + id + '/menu'
  })
}
