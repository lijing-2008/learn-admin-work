//布局模式
import { GlobalThemeOverrides } from 'naive-ui'
import { RouteMeta, RouteRecordRaw } from 'vue-router'

export enum LayoutMode {
  LTR = 'ltr', //左右 left to right
  LCR = 'lcr', //左右分栏 left column right
  TTB = 'ttb' //上下 top to bottom
}
export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}
export enum SideTheme {
  DARK = 'dark',
  WHITE = 'white',
  IMAGE = 'image'
}
export enum PageAnim {
  FADE = 'fade',
  OPACITY = 'opacity',
  DOWN = 'down',
  SCALE = 'scale'
}
export interface OriginRoute {
  menuUrl: string
  menuName?: string
  hidden?: boolean
  outLink?: string
  affix?: boolean
  cacheable?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  children: Array<OriginRoute>
}
export type RouteRecordRawWithHidden = RouteRecordRaw & {
  fullPath?: string
  icon?: string
  hidden?: boolean
  params?: Record<string, any>
  query?: Record<string, any>
}
export interface RouteMetaType extends RouteMeta {
  icon?: string
  title?: string
  cacheable?: boolean
  affix?: boolean
}
export interface ILayoutState {
  isShowHeader: boolean
  layoutMode: LayoutMode
  isCollapse: boolean
  isFixedNavBar: boolean
  theme: Theme
  sideBarBgColor: SideTheme
  pageAnim: string
  themeOverrides: GlobalThemeOverrides
  sideThemeOverrides: any
  actionItem: {
    showSearch: boolean
    showMessage: boolean
    showFullScreen: boolean
    showRefresh: boolean
  }
  permissionRoutes: Array<RouteRecordRawWithHidden>
}
export interface ILayoutAction {
  isShowHeaderAction: () => Boolean
  changeLayoutModeAction: (mode: LayoutMode) => void
  changeCollapseAction: (isCollapse: boolean) => void
  changeFixedNavBar: (isFixed: boolean) => void
  changeThemeAction: (theme: Theme) => void
  changeSideBarBgColor: (sideTheme: SideTheme) => void
}
