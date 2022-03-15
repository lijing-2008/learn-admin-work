import { defineStore, GettersTree } from 'pinia'
import { ILoginAction, ILoginState } from '@/store/login/type'
import { IAccount } from '@/api/login/type'
import {
  accountLoginRequest,
  captchaImageRequest,
  requestLogout,
  requestUserInfo,
  requestUserMenus
} from '@/api/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import Avatar from '@/assets/img/coder.gif'
import { addRoutesTo, generatorRoutes } from '@/utils/router'
import { RouteRecordRaw } from 'vue-router'
import { useGlobalStore } from '@/store/global/global'
import { useMessage } from 'naive-ui'
const defaultAvatar = Avatar

const userInfo = localCache.getItem('userInfo') || {}
export const useLoginStore = defineStore<
  string,
  ILoginState,
  GettersTree<ILoginState>,
  ILoginAction
>('login', {
  state: () => {
    return {
      captchaInfo: { captchaOnOff: true },
      token: '',
      userInfo: userInfo || {},
      userMenus: [],
      avatar: userInfo.avatar || defaultAvatar
    }
  },
  getters: {
    captchaUrl: (state) => {
      return 'data:image/gif;base64,' + state.captchaInfo.img
    }
  },
  actions: {
    async captchaImageAction() {
      const captchaResult = await captchaImageRequest()
      this.captchaInfo = captchaResult.data
    },

    /**
     * 登录流程
     * @param payload
     */
    async accountLoginAction(payload: IAccount) {
      // 1.登录
      const loginResult = await accountLoginRequest(payload)
      const { token } = loginResult.data
      this.token = token
      localCache.setItem('token', token)

      // 2.获取用户信息
      const userInfo = await requestUserInfo()
      this.userInfo = userInfo.data
      localCache.setItem('userInfo', userInfo.data)

      // 3.获取用户菜单
      const userMenusResult = await requestUserMenus()
      localCache.setItem('userMenus', userMenusResult.data)
      this.userMenus = userMenusResult.data
      // 动态添加路由
      console.log(generatorRoutes(this.userMenus))
      addRoutesTo(generatorRoutes(this.userMenus))
      console.log(router)
      console.log(router.getRoutes())
      //
      // // 获取所有字典数据
      // const dictStore = useDictStore()
      // dictStore.getAllDict()

      // 4.跳转到main页面
      await router.push('/index')
    },

    /**
     * 刷新页面时的逻辑都可以放到这里，store中的数据会被清空，需要重新给store赋值
     */
    loadLocalLogin() {
      const token = localCache.getItem('token')
      if (token) {
        this.token = token
      }

      const userInfo = localCache.getItem('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }

      const userMenus = localCache.getItem('userMenus')
      if (userMenus) {
        this.userMenus = userMenus
        // 动态添加路由
        addRoutesTo(generatorRoutes(this.userMenus))
      }
    },
    /**
     * 注销登录流程
     */
    async logoutAction() {
      const globalStore = useGlobalStore()
      // 1.接收后端返回注销登录成功的消息
      const result = await requestLogout()
      // 2.判断是否成功注销
      if (result.status === 200) {
        globalStore.setMsg(result.data)
        // 2.清空localstorage缓存
        localCache.clear()
        // 3.返回登录页面
        await router.push('/login')
      } else {
        globalStore.setMsg('注销失败')
      }
    }
  }
})
