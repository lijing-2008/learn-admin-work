<template>
  <n-config-provider :date-locale="dateZhCN" :locale="zhCN" class="h-full">
    <n-notification-provider>
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, dateZhCN, zhCN } from 'naive-ui'
</script>

<style></style>
