<template>
  <span
    class="flex justify-center items-center ml-10px fold-wrapper"
    :class="[currentIsCollapse ? 'fold-close-status' : 'fold-open-status']"
    @click="handleToggleCollapse"
  >
    <n-icon size="22">
      <TextAlignDistributed24Regular />
    </n-icon>
  </span>
</template>

<script setup lang="ts">
import { TextAlignDistributed24Regular } from '@vicons/fluent'
import { useLayoutStore } from '@/store/layout/layout'
import { computed } from 'vue'
const layoutStore = useLayoutStore()
const currentIsCollapse = computed(() => layoutStore.isCollapse)
const handleToggleCollapse = () => {
  layoutStore.changeCollapseAction(!layoutStore.isCollapse)
}
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';

.fold-wrapper:hover {
  color: #999;
  cursor: pointer;
}
</style>
