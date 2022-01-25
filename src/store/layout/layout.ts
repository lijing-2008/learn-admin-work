import { defineStore, GettersTree } from 'pinia'
import { ILayoutAction, ILayoutState, LayoutMode } from '@/store/layout/type'
import { DefaultSystemSettings } from '@/setting'
import { localCache } from '@/utils/cache'
import { SETTING_INFO } from '@/setting/constVar'
const primaryColor = DefaultSystemSettings.themeColor.split('@')[1]
const persistSettingInfo = (obj: any) => {
  localCache.setItem(SETTING_INFO, obj)
}
export const useLayoutStore = defineStore<
  string,
  ILayoutState,
  GettersTree<ILayoutState>,
  ILayoutAction
>('layout', {
  state: () => ({
    isShowHeader: true,
    layoutMode: DefaultSystemSettings.layoutMode,
    isCollapse: DefaultSystemSettings.isCollapse,
    isFixedNavBar: DefaultSystemSettings.isFixedNavBar,
    theme: DefaultSystemSettings.theme,
    sideBarBgColor: DefaultSystemSettings.sideBarBgColor,
    pageAnim: DefaultSystemSettings.pageAnim,
    themeOverrides: {
      common: {
        primaryColor: primaryColor,
        primaryColorHover: primaryColor
      }
    },
    sideThemeOverrides: {
      common: {
        cardColor: ''
      }
    },
    actionItem: {
      showSearch: DefaultSystemSettings.actionBar.isShowSearch,
      showMessage: DefaultSystemSettings.actionBar.isShowMessage,
      showFullScreen: DefaultSystemSettings.actionBar.isShowFullScreen,
      showRefresh: DefaultSystemSettings.actionBar.isShowRefresh
    }
  }),
  actions: {
    isShowHeaderAction() {
      return this.layoutMode === LayoutMode.TTB
    },
    changeLayoutModeAction(mode) {
      this.layoutMode = mode
      persistSettingInfo(
        Object.assign(DefaultSystemSettings, {
          layoutMode: mode
        })
      )
    },
    changeCollapseAction(isCollapse: boolean) {
      this.isCollapse = isCollapse
    },
    changeFixedNavBar(isFixed: boolean) {
      this.isFixedNavBar = !this.isFixedNavBar
    },
    changeThemeAction(theme) {
      this.theme = theme
      persistSettingInfo(Object.assign(DefaultSystemSettings, { theme: theme }))
    }
  }
})
