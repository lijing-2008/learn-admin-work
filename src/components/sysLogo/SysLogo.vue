<template>
  <div class="logo-wrapper">
    <img v-if="showLogo" src="/src/assets/img/vite-logo.png" class="logo-img" />
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
  display: flex;
  border-bottom: 1px dashed var(--border-color);
  height: @logoHeight;
  justify-content: center;
  align-items: center;

  .logo-img {
    width: 30px;
  }

  .logo-title {
    font-weight: bold;
  }

  .show-title {
    width: auto;
    transition: transform 0.2s ease-in;
    transform: scale(1);
  }

  .close-title {
    width: 0;
    transform: scale(0);
  }
}
</style>
