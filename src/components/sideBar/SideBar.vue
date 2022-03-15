<template>
  <div>
    <n-config-provider :theme-overrides="themeOverrides">
      <n-card
        class="sys-side-bar-wrapper"
        :bordered="false"
        :style="{
          borderRadius: '0px',
          marginTop: currentLayoutMode === LayoutMode.TTB ? '48px' : 0
        }"
        :content-style="{ padding: 0 }"
        :class="[!currentIsCollapse ? 'open-status' : 'close-status']"
      >
        <transition name="logo">
          <SysLogo v-if="showLogo" />
        </transition>
        <div>
          <ScrollMenu />
        </div>
      </n-card>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import SysLogo from '@/components/sysLogo/SysLogo.vue'
import { useLayoutStore } from '@/store/layout/layout'
import { LayoutMode, SideTheme, Theme } from '@/store/layout/type'
import { computed } from 'vue'
import { GlobalThemeOverrides } from 'naive-ui'
import ScrollMenu from '@/components/sideBar/cpns/ScrollMenu.vue'
const props = defineProps({
  showLogo: {
    type: Boolean,
    default: () => true
  }
})

const layoutStore = useLayoutStore()
const currentIsCollapse = computed(() => layoutStore.isCollapse)
const currentLayoutMode = computed(() => layoutStore.layoutMode)
const themeOverrides = computed(() => {
  if (layoutStore.theme === Theme.DARK) {
    return {}
  }
  if (layoutStore.sideBarBgColor === SideTheme.DARK) {
    return {
      common: {
        cardColor: '#001428',
        textColor1: '#bbbbbb',
        textColor2: '#bbbbbb',
        popoverColor: 'rgb(72, 72, 78)',
        hoverColor: 'rgba(255, 255, 255, 0.09)',
        itemColorActive: 'rgba(24, 160, 88, 0.4)'
      }
    }
  }
  if (layoutStore.sideBarBgColor === SideTheme.WHITE) {
    return {
      common: {
        cardColor: '#ffffff'
      }
    }
  }
  return {}
})
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';

.open-status {
  width: @menuWidth;
  box-shadow: 2px 5px 10px rgb(0 0 0 / 12%);
  transition: all @transitionTime;
}

.close-status {
  width: @minMenuWidth;
  box-shadow: none;
  transition: all @transitionTime;
}

.sys-side-bar-wrapper {
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
  height: 100%;
}
</style>
