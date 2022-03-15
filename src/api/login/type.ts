export interface ICaptcha {
  captchaOnOff: boolean
  uuid?: string
  img?: string
}

export interface IAccount {
  username: string
  password: string
  code?: string
  uuid?: string
}

export interface ILoginResult {
  id: number
  username: string
  token: string
}
