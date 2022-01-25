<template>
  <div class="logo-wrapper">
    <img v-if="showLogo" src="src/assets/img/vite-logo.png" class="logo-img" />
    <div
      v-if="showTitle"
      :class="[!currentIsCollapse || alwaysShow ? 'show-title' : 'close-title']"
    >
      <span class="logo-title">{{ projectName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLayoutStore } from '@/store/layout/layout'
import { projectName } from '@/setting/index'
const layoutStore = useLayoutStore()
const currentIsCollapse = computed(() => layoutStore.isCollapse)
const props = defineProps({
  showLogo: {
    type: Boolean,
    default: () => true
  },
  showTitle: {
    type: Boolean,
    default: () => true
  },
  alwaysShow: {
    type: Boolean,
    default: () => false
  }
})
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';
.logo-wrapper {
  height: @logoHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed var(--border-color);
  .logo-img {
    width: 30px;
  }
  .logo-title {
    font-weight: bold;
  }
  .show-title {
    transform: scale(1);
    width: auto;
    transition: transform 0.2s ease-in;
  }
  .close-title {
    transform: scale(0);
    width: 0;
  }
}
</style>
