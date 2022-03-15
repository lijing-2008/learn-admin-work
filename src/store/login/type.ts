import { ICaptcha } from '@/api/login/type'

export interface ILoginState {
  captchaInfo: ICaptcha
  token: string
  userInfo: any
  userMenus: []
  avatar: string
}

export interface ILoginAction {
  accountLoginAction: (payload: any) => void
  loadLocalLogin: () => void
  captchaImageAction: () => void
  logoutAction: () => void
}
