<template>
  <div>
    <h2>{{ message }}</h2>
    <n-button type="primary" @click="handleClick">ceshi</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemStore } from '@/store/system/system'

const message = ref('Hello user')
const systemStore = useSystemStore()
const handleClick = () => {
  systemStore.getUserTableListAction({
    user: {
      userName: ''
    },
    page: {
      pageNum: 1,
      pageSize: 3
    }
  })
}
</script>

<style scoped></style>
