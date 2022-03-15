import { RouteMeta, RouteRecordRaw, RouterLink } from 'vue-router'
import { MenuOption } from 'naive-ui'
import { defineAsyncComponent, h } from 'vue'
import { renderMenuIcon } from '@/utils/icon'
import LoadingCpn from '../components/loading/LoadingCpn.vue'
import Layout from '../components/Layout.vue'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { requestUserMenus } from '@/api/login/login'

export interface RouteMetaType extends RouteMeta {
  icon?: string
  title?: string
  noCache?: boolean
  link?: string
}

export type CustomRouteRecordRaw = {
  name: string
  path: string
  hidden?: boolean
  alwaysShow?: boolean
  meta: RouteMetaType
  component?: string
  children: CustomRouteRecordRaw[]
}

export type RouteRecordRawWithHidden = RouteRecordRaw & {
  hidden?: boolean
}

// 判断是不是外链接
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 转换为主页菜单
export function transformMenu(
  originRoutes: Array<CustomRouteRecordRaw>
): Array<MenuOption> {
  // 如果路由为空，直接返回空数组
  if (!originRoutes) {
    return []
  }
  // 获取标签函数
  function getLabel(item: CustomRouteRecordRaw) {
    if (item.meta?.link) {
      return () =>
        h(
          'a',
          {
            href: item.meta.link,
            target: '_blank',
            rel: 'noopener noreferrer'
          },
          (item.meta as any).title
        )
    }
    // return () =>
    //   h(
    //     RouterLink,
    //     {
    //       to: {
    //         path: '/' + item.component
    //       }
    //     },
    //     { default: () => item.meta.title }
    //   )
    return item.meta?.title || ''
  }
  const tempMenus: Array<MenuOption> = []
  originRoutes
    .filter((item) => !item.hidden)
    .forEach((item) => {
      const tempMenu = {
        key: item.path,
        label: getLabel(item),
        icon: renderMenuIcon('iconfont', item.meta.icon)
      } as MenuOption
      if (item.children) {
        const parentPath = item.path
        item.children.forEach((it) => {
          it.path = parentPath + '/' + it.path
        })
        tempMenu.children = transformMenu(item.children)
      }
      tempMenus.push(tempMenu)
    })

  return tempMenus
}

function loadComponents() {
  return import.meta.glob('../views/**/*.vue')
}
const asyncComponents = loadComponents()
function getComponent(it: CustomRouteRecordRaw) {
  return defineAsyncComponent({
    loader: asyncComponents['../views/' + it.component + '.vue'],
    loadingComponent: LoadingCpn
  })
}

// 转换为路由
export function generatorRoutes(
  originRoutes: Array<CustomRouteRecordRaw>
): Array<RouteRecordRawWithHidden> {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  originRoutes.forEach((item) => {
    if (!isExternal(item.path)) {
      const route: RouteRecordRawWithHidden = {
        path: item.meta.link || item.path,
        name: item.name,
        hidden: item.hidden,
        component: item.component === 'Layout' ? Layout : getComponent(item),
        meta: {
          title: item.meta.title,
          noCache: item.meta.noCache,
          icon: item.meta.icon
        }
      }
      if (item.children) {
        route.children = generatorRoutes(item.children)
      }
      tempRoutes.push(route)
    }
  })
  return tempRoutes
}

/**
 * 将routes数组动态加载到对应的router中
 * @param moduleName
 * @param routes
 */
export function addRoutesTo(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    router.addRoute(route)
  })
  router.addRoute({
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  } as RouteRecordRaw)
}
// const whiteRoutes: string[] = ['/login', '/404', '/403', '/500']
// router.beforeEach(async (to, from, next) => {
//   if (whiteRoutes.includes(to.path)) {
//     return true
//   } else {
//     const accessRoutes: Array<RouteRecordRaw> = []
//     const tempMenus = await requestUserMenus()
//     const tempRoutes = tempMenus.data
//     const mapRoutes = generatorRoutes(tempRoutes)
//     mapRoutes.forEach((it: any) => {
//       router.addRoute(it)
//     })
//     console.log('routes', router.getRoutes())
//     console.log('router', router)
//     next({ ...to, replace: true })
//   }
// })
