import { IAccount, ICaptcha, ILoginResult } from './type'
import ddRequest from '..'
import { IDataType } from '../types'

enum loginAPI {
  CaptchaImage = '/captchaImage',
  AccountLogin = '/login',
  LoginUserInfo = '/getUserInfo',
  LoginRouters = '/getRouters',
  Logout = '/logout'
}

/**
 * 获取验证码
 */
export function captchaImageRequest() {
  return ddRequest.get<IDataType<ICaptcha>>({
    url: loginAPI.CaptchaImage
  })
}

/**
 * 登录请求
 * @param account 用户信息，包含用户名、密码、验证码和uuid
 */
export function accountLoginRequest(account: IAccount) {
  return ddRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

/**
 * 获取已经登录的用户的用户信息，如果还未登录后端会进行拦截，获取不到
 */
export function requestUserInfo() {
  return ddRequest.get<IDataType>({
    url: loginAPI.LoginUserInfo
  })
}

/**
 * 获取用户菜单，也就是动态页面路由信息
 */
export function requestUserMenus() {
  return ddRequest.get<IDataType>({
    url: loginAPI.LoginRouters
  })
}

export function requestLogout() {
  return ddRequest.post<IDataType>({
    url: loginAPI.Logout
  })
}
