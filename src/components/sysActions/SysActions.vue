<template>
  <div class="action-items-wrapper">
    <span class="action-item" @click="handleShowSystemSettingClick">
      <n-icon size="18">
        <Settings28Regular />
      </n-icon>
    </span>
    <SysSetting ref="sysSettingRef" />
  </div>
</template>

<script setup lang="ts">
import { Settings28Regular } from '@vicons/fluent'
import SysSetting from '@/components/sysSetting/SysSetting.vue'
import { ref } from 'vue'
import { ISysSettingRef } from '@/components/sysSetting/type'
const sysSettingRef = ref<InstanceType<typeof SysSetting> & ISysSettingRef>()
const handleShowSystemSettingClick = () => {
  sysSettingRef.value?.openDrawer()
}
</script>
<style lang="less" scoped>
.action-items-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
  .action-item {
    min-width: 40px;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      color: var(--primary-color-hover);
    }
  }
  .badge-action-item {
    cursor: pointer;
    margin-right: 30px;
  }
}

:deep(.n-input .n-input__border, .n-input .n-input__state-border) {
  border: none;
  border-bottom: 1px solid currentColor;
}
:deep(.el-input__inner) {
  border: none !important;
  height: 35px;
  line-height: 35px;
  color: currentColor !important;
  background-color: transparent !important;
}
</style>
