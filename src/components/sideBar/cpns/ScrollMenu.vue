<template>
  <div class="scrollbar">
    <n-scrollbar>
      <n-menu
        mode="vertical"
        accordion
        :options="menuOptions"
        :collapsed="currentIsCollapse"
        @update:value="handleMenuClick"
      />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NIcon } from 'naive-ui'
import { useLayoutStore } from '@/store/layout/layout'
import { useRoute } from 'vue-router'
import { renderMenuIcon } from '@/utils/icon'
import { transformMenu } from '@/utils/router'
import { localCache } from '@/utils/cache'
import router from '@/router'
const layoutStore = useLayoutStore()
const currentIsCollapse = computed(() => layoutStore.isCollapse)
const currentRoute = useRoute()

const menuOptions = computed(() => {
  return transformMenu(localCache.getItem('userMenus'))
})
const handleMenuClick = (key: string) => {
  console.log('key', key)
  router.push(key)
}
</script>

<style lang="less" scoped></style>
