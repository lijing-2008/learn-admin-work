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
            <MainLayout :showNavBar="!isShowHeader" />
          </template>
          <template v-else-if="currentLayoutMode === LayoutMode.LCR">
            <SideBar />
            <MainLayout />
          </template>
          <template v-else>
            <SideBar />
            <MainLayout :showNavBar="!isShowHeader" />
          </template>
          <SysSetting ref="sysSettingRef" />
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
import { computed, ref } from 'vue'
import MainLayout from '@/components/MainLayout.vue'
import SysSetting from '@/components/sysSetting/SysSetting.vue'
import { ISysSettingRef } from '@/components/sysSetting/type'
import emitter from '@/bus'
// pinia状态管理
const layoutStore = useLayoutStore()
const isShowHeader = computed(() => layoutStore.isShowHeaderAction())
const currentLayoutMode = computed(() => layoutStore.layoutMode)
const currentTheme = computed(() => layoutStore.theme)
const themeOverrides = computed(() => layoutStore.themeOverrides)

// 开启系统设置页面(一个抽屉封装的组件)
const sysSettingRef = ref<InstanceType<typeof SysSetting> & ISysSettingRef>()
emitter.on('open-drawer', () => {
  sysSettingRef.value?.openDrawer()
})
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';

.sys-layout-container {
  overflow-x: hidden;
  max-width: 100%;
  height: 100%;

  .mobile-shadow {
    display: none;
  }

  .layout-mode-ttb {
    margin-top: @logoHeight;
    transition: all @transitionTime;
  }
}
</style>
