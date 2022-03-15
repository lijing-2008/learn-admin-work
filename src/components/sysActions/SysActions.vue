<template>
  <div class="action-items-wrapper">
    <span class="p-6"> this section set many icons</span>
    <span class="action-item" @click="handleShowSystemSettingClick">
      <!--      <n-icon size="18">-->
      <!--        <Settings28Regular />-->
      <!--      </n-icon>-->
      <SvgIcon prefix="iconfont" name="setting-01" height="20" width="20" />
    </span>
    <!--    <SysSetting ref="sysSettingRef" />-->
  </div>
</template>

<script setup lang="ts">
import SysSetting from '@/components/sysSetting/SysSetting.vue'
import { ref } from 'vue'
import { ISysSettingRef } from '@/components/sysSetting/type'
import emitter from '@/bus'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
const sysSettingRef = ref<InstanceType<typeof SysSetting> & ISysSettingRef>()

const handleShowSystemSettingClick = () => {
  emitter.emit('open-drawer')
  // sysSettingRef.value?.openDrawer()
}
</script>
<style lang="less" scoped>
.action-items-wrapper {
  display: flex;
  position: relative;
  z-index: 1;
  height: 100%;
  align-items: center;

  .action-item {
    display: flex;
    min-width: 40px;
    align-items: center;

    &:hover {
      color: var(--primary-color-hover);
      cursor: pointer;
    }
  }

  .badge-action-item {
    margin-right: 30px;
    cursor: pointer;
  }
}

:deep(.n-input .n-input__border, .n-input .n-input__state-border) {
  border: none;
  border-bottom: 1px solid currentcolor;
}

:deep(.el-input__inner) {
  border: none !important;
  height: 35px;
  line-height: 35px;
  color: currentcolor !important;
  background-color: transparent !important;
}
</style>
