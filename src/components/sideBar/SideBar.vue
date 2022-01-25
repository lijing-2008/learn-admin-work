<template>
  <div>
    <n-config-provider>
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
          ScrollMenu
          <br />
          动态路由
        </div>
      </n-card>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import SysLogo from '@/components/sysLogo/SysLogo.vue'
import { useLayoutStore } from '@/store/layout/layout'
import { LayoutMode } from '@/store/layout/type'
import { computed } from 'vue'
const props = defineProps({
  showLogo: {
    type: Boolean,
    default: () => true
  }
})
const layoutStore = useLayoutStore()
const currentIsCollapse = computed(() => layoutStore.isCollapse)
const currentLayoutMode = computed(() => layoutStore.layoutMode)
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';

.open-status {
  width: @menuWidth;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
  transition: all @transitionTime;
}
.close-status {
  width: @minMenuWidth;
  box-shadow: none;
  transition: all @transitionTime;
}
.sys-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  z-index: 999;
}
</style>
