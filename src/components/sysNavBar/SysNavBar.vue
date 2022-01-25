<template>
  <div class="sys-nav-bar-wrapper space-x-4">
    <div>hamburger</div>
    <div>breadcrumb</div>
    <div class="flex-1"></div>
    <div class="right-wrapper">
      <SysActions />
    </div>
    <div class="avatar-wrapper">
      <SysAvatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import SysActions from '@/components/sysActions/SysActions.vue'
import SysAvatar from '@/components/sysAvatar/SysAvatar.vue'
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';
.sys-nav-bar-wrapper {
  height: @logoHeight;
  max-height: @logoHeight;
  min-height: @logoHeight;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  .avatar-wrapper {
    padding-right: 15px;
  }
  .right-wrapper {
    height: 100%;
  }
}
</style>
