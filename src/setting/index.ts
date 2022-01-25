import { localCache } from '@/utils/cache'
import { LayoutMode, PageAnim, SideTheme, Theme } from '@/store/layout/type'
import { SETTING_INFO } from '@/setting/constVar'
import { ref } from 'vue'

const settingInfo = localCache.getItem(SETTING_INFO) || {}

export const projectName = ref('Vite-Project')
export const DefaultSystemSettings = Object.assign({
  theme: Theme.LIGHT,
  sideTheme: SideTheme.DARK,
  themeColor: 'cyan@#18a058',
  layoutMode: LayoutMode.LTR,
  sideWidth: 210,
  pageAnim: PageAnim.OPACITY,
  isFixedNavBar: true,
  actionBar: {
    isShowSearch: true,
    isShowMessage: true,
    isShowRefresh: true,
    isShowFullScreen: true
  },
  settingInfo
})
