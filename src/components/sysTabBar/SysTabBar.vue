<template>
  <div>tabbar</div>
  <div class="vaw-tab-bar-container">
    <div v-if="showHamburger" class="hamburger-wrapper">
      <SysHamburger />
    </div>
  </div>
</template>

<script setup lang="ts">
import SysHamburger from '@/components/sysHamburger/SysHamburger.vue'

const props = defineProps({
  showHamburger: {
    type: Boolean,
    default: () => false
  }
})
</script>

<style lang="less" scoped>
@import '../../assets/css/variables.less';

.vaw-tab-bar-container {
  position: relative;
  box-sizing: border-box;
  height: @tabHeight;
  line-height: calc(@tabHeight - 3px);
  white-space: nowrap;
  box-shadow: 10px 5px 10px rgb(0 0 0 / 10%);

  .contex-menu-wrapper {
    list-style: none;
    position: absolute;
    z-index: 999;
    padding-left: 0;
    width: 130px;
    background-color: var(--base-color);
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);

    & > li {
      display: flex;
      box-sizing: border-box;
      padding: 5px 0;
      width: 100%;
      align-items: center;
    }

    & > li:hover {
      color: var(--primary-color);
    }
  }

  .hamburger-wrapper {
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .tab-hamburger-wrapper {
    margin-left: 40px;
    transition: margin-left @transitionTime;
  }

  .tab-no-hamburger-wrapper {
    margin-left: 0;
    transition: margin-left @transitionTime;
  }

  .tab-item {
    display: inline-flex;
    padding: 7px 10px;
    cursor: pointer;

    .icon-item {
      overflow: hidden;
      margin-left: 0;
      width: 0;
      height: 0;
      transition: all 0.2s ease-in-out;
    }

    &:hover {
      .icon-item {
        display: inline;
        margin-left: 5px;
        border-radius: 50%;
        padding: 1px;
        width: 14px;
        height: 14px;
        font-size: 12px;
        background-color: rgb(0 0 0 / 12%);
        transition: all 0.2s ease-in-out;
      }
    }
  }

  .arrow-wrapper {
    margin: 0 8px;
    font-size: 20px;
    cursor: pointer;
  }

  .arrow-wrapper__disabled {
    color: #b9b9b9;
    cursor: not-allowed;
  }
}
</style>
