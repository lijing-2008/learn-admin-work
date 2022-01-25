<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="currentTheme === Theme.DARK ? darkTheme : null"
    :locale="zhCN"
    style="height: 100%"
  >
    <n-global-style />
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-el class="sys-layout-container" :class="currentTheme">
          <transition name="header">
            <SysHeader v-if="isShowHeader" />
          </transition>
          <template v-if="isShowHeader">
            <SideBar :show-logo="!isShowHeader" />
            <MainLayout :show-nav-bar="!isShowHeader" />
          </template>
          <template v-else-if="currentLayoutMode === LayoutMode.LCR">
            <SideBar />
            <MainLayout />
          </template>
          <template v-else>
            <SideBar />
            <MainLayout />
          </template>
        </n-el>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, darkTheme } from 'naive-ui'
import SysHeader from './sysHeader/SysHeader.vue'
import SideBar from '@/components/sideBar/SideBar.vue'
import { useLayoutStore } from '@/store/layout/layout'
import { LayoutMode, Theme } from '@/store/layout/type'
import { computed } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
const layoutStore = useLayoutStore()
const isShowHeader = computed(() => layoutStore.isShowHeaderAction())
const currentLayoutMode = computed(() => layoutStore.layoutMode)
const currentTheme = computed(() => layoutStore.theme)
const themeOverrides = computed(() => layoutStore.themeOverrides)
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';
.sys-layout-container {
  height: 100%;
  max-width: 100%;
  overflow-x: hidden;
  .mobile-shadow {
    display: none;
  }
  .layout-mode-ttb {
    margin-top: @logoHeight;
    transition: all @transitionTime;
  }
}
</style>
