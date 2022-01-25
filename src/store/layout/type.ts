//布局模式
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
  BLUE = 'blue',
  IMAGE = 'image'
}
export enum PageAnim {
  FADE = 'fade',
  OPACITY = 'opacity',
  DOWN = 'down',
  SCALE = 'scale'
}
export interface ILayoutState {
  isShowHeader: boolean
  layoutMode: LayoutMode
  isCollapse: boolean
  isFixedNavBar: boolean
  theme: Theme
  sideBarBgColor: string
  pageAnim: string
  themeOverrides: any
  sideThemeOverrides: any
  actionItem: {
    showSearch: boolean
    showMessage: boolean
    showFullScreen: boolean
    showRefresh: boolean
  }
}
export interface ILayoutAction {
  isShowHeaderAction: () => Boolean
  changeLayoutModeAction: (mode: LayoutMode) => void
  changeCollapseAction: (isCollapse: boolean) => void
  changeFixedNavBar: (isFixed: boolean) => void
  changeThemeAction: (theme: Theme) => void
}
