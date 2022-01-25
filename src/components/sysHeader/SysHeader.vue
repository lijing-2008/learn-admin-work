<template>
  <div class="sys-header-layout">
    <div class="logo-wrapper">
      <SysLogo :always-show="true" />
    </div>
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
import SysLogo from '../sysLogo/SysLogo.vue'
import SysActions from '../sysActions/SysActions.vue'
import SysAvatar from '../sysAvatar/SysAvatar.vue'
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';
.sys-header-layout {
  height: @logoHeight;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-color);
  .logo-wrapper {
    width: @menuWidth;
  }
  .menu-wrapper {
    flex: 1;
    overflow: hidden;
  }
  .right-wrapper {
    height: 100%;
  }
  .avatar-wrapper {
    padding-right: 15px;
  }
}
</style>
