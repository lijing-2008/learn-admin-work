import { defineStore, GettersTree } from 'pinia'
import { ILoginAction, ILoginState } from '@/store/login/type'
import { IAccount } from '@/api/login/type'
import {
  accountLoginRequest,
  requestAllMenus,
  requestUserInfoById
} from '@/api/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'

export const useLoginStore = defineStore<
  string,
  ILoginState,
  GettersTree<ILoginState>,
  ILoginAction
>('login', {
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  actions: {
    async accountLoginAction(payload: IAccount) {
      // 1.登录
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      this.token = token
      localCache.setItem('token', token)

      // 2.获取用户信息
      const userInfo = await requestUserInfoById(id)
      this.userInfo = userInfo.data
      localCache.setItem('userInfo', userInfo.data)

      // 3.获取用户菜单
      const userMenusResult = await requestAllMenus()
      localCache.setItem('userMenus', userMenusResult.data)
      this.userMenus = userMenusResult.data
      // // 动态添加路由
      // addRoutesTo('main', mapMenusToRoutes(this.userMenus))
      //
      // // 获取所有字典数据
      // const dictStore = useDictStore()
      // dictStore.getAllDict()

      // 4.跳转到main页面
      await router.push('/index')
    },

    // 刷新页面时的逻辑都可以放到这里，store中的数据会被清空，需要重新给store赋值
    loadLocalLogin() {
      const token = localCache.getItem('token')
      if (token) {
        this.token = token
      }

      const userInfo = localCache.getItem('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }

      // const userMenus = localCache.getItem('userMenus')
      // if (userMenus) {
      //   this.userMenus = userMenus
      //   // 动态添加路由
      //   const routes: RouteRecordRaw[] = mapMenusToRoutes(userMenus)
      //   addRoutesTo('main', routes)
      // }
      //
      // // 获取部队信息
      // const systemStore = useSystemStore()
      // systemStore.getPageListAction({
      //   pageName: 'bd',
      //   queryInfo: {
      //     page: 1,
      //     pageSize: 10
      //   }
      // })
    }
  }
})
