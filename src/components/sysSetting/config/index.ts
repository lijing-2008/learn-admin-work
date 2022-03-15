import { reactive } from 'vue'
import { LayoutMode, SideTheme, Theme } from '@/store/layout/type'
import { useLayoutStore } from '@/store/layout/layout'

// const layoutStore = useLayoutStore()
export const themeExampleConfig = reactive([
  {
    leftBg: '#ffffff',
    rightTopBg: '#ffffff',
    rightBottomBg: '#f5f5f5',
    // checked: layoutStore.theme === Theme.LIGHT,
    checked: false,
    themeId: Theme.LIGHT,
    tipText: '明亮'
  },
  {
    leftBg: '#000000',
    rightTopBg: '#000000',
    rightBottomBg: '#333333',
    // checked: layoutStore.theme === Theme.DARK,

    checked: false,
    themeId: Theme.DARK,
    tipText: '暗黑'
  }
])
export const layoutExampleConfig = reactive([
  {
    leftBg: '#000000',
    rightTopBg: '#d4d4d4',
    rightBottomBg: '#d4d4d4',
    // checked: layoutStore.layoutMode === LayoutMode.LTR,

    checked: false,
    layoutId: LayoutMode.LTR,
    tipText: '左右'
  },
  {
    leftBg: '#d4d4d4',
    rightTopBg: '#ffffff',
    rightBottomBg: '#d4d4d4',
    // checked: layoutStore.layoutMode === LayoutMode.TTB,

    checked: false,
    layoutId: LayoutMode.TTB,
    class: 'extra-class',
    tipText: '上下'
  },
  {
    leftBg: '#000000',
    rightTopBg: '#d4d4d4',
    rightBottomBg: '#d4d4d4',
    // checked: layoutStore.layoutMode === LayoutMode.LCR,

    checked: false,
    layoutId: LayoutMode.LCR,
    class: 'extra-class-1',
    tipText: '分栏'
  }
])
export const sideExampleConfig = reactive([
  {
    leftBg: '#000000',
    rightTopBg: '#ffffff',
    rightBottomBg: '#f5f5f5',
    // checked: layoutStore.sideBarBgColor === SideTheme.DARK,

    checked: false,
    themeId: SideTheme.DARK,
    tipText: '暗黑'
  },
  {
    leftBg: '#ffffff',
    rightTopBg: '#ffffff',
    rightBottomBg: '#f5f5f5',
    // checked: layoutStore.sideBarBgColor === SideTheme.WHITE,

    checked: false,
    themeId: SideTheme.WHITE,
    tipText: '明亮'
  }
])
