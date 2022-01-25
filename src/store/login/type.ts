export interface ILoginState {
  token: string
  userInfo: any
  userMenus: []
}

export interface ILoginAction {
  accountLoginAction: (payload: any) => void
  loadLocalLogin: () => void
}
