import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { requestUserMenus } from '@/api/login/login'
import { addRoutesTo, generatorRoutes } from '@/utils/router'
import { useLoginStore } from '@/store/login/login'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/index' },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/index',
    name: 'Layout',
    component: () => import('@/components/Layout.vue'),
    meta: {
      title: 'index'
    }
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'not-found',
  //   component: () => import('@/views/exception/404.vue')
  // },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 配置全局导航守卫
const whiteRoutes: string[] = ['/login', '/404', '/403', '/500']
console.log('user-loginStore..')
router.beforeEach(async (to, from) => {
  if (whiteRoutes.includes(to.path)) {
    // 1.白名单中的路由，直接跳转
    return true
    console.log('white-excludes...')
  } else {
    // 查看token，如果没有说明没有登录，返回登录界面
    const token = localCache.getItem('token')
    if (!token) {
      // return '/login'
      console.log(token)
      console.log('localCache中没有token')
      return '/login'
    } else {
      // 已经登录
      if (router.getRoutes().length > 6) {
        // ①路由表中有动态路由，静态路由注册了8条,大于8直接导航
        console.log('已经有动态路由直接跳转')
        return true
      } else {
        // ②路由表中没有动态路由，先从localStorage中拿，没有再进行请求
        const userMenusInfo = localCache.getItem('userMenus')
        if (userMenusInfo.length > 0) {
          console.log('缓存中有动态路由，从缓存加载')
          addRoutesTo(generatorRoutes(userMenusInfo))

          return { ...to, replace: true }
        } else {
          console.log('缓存中没有动态路由，重新发送请求获取')
          const loginStore = useLoginStore()
          const userMenusResult = await requestUserMenus()
          // 更新store和localStorage中的数据
          loginStore.userMenus = userMenusResult.data
          localCache.setItem('userMenus', userMenusResult.data)
          // 重新生成获取路由
          const tempRoutes = userMenusResult.data
          const mapRoutes: Array<RouteRecordRaw> = generatorRoutes(tempRoutes)
          addRoutesTo(mapRoutes)
          console.log('重新获取路由', router.getRoutes())
          return { ...to, replace: true }
        }
      }
    }
  }
})
export default router
