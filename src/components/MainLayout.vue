<template>
  <div
    class="sys-main-layout-container"
    :class="[
      !currentIsCollapse
        ? 'main-layout-open-status'
        : 'main-layout-close-status',
      currentIsFixedNavBar ? 'main-layout-fixed-nav-bar' : 'main-layout'
    ]"
  >
    <section
      :class="[
        !currentIsCollapse ? 'nav-bar-open-status' : 'nav-bar-close-status',
        currentIsFixedNavBar ? 'fixed-nav-bar' : '',
        !showNavBar ? 'tab-bar-top' : ''
      ]"
    >
      <SysNavBar v-if="showNavBar" />
      <SysTabBar />
    </section>
    <div
      class="main-base-style scrollbar"
      :class="[
        currentTheme === Theme.LIGHT
          ? 'main-base-light-theme'
          : 'main-base-dark-theme'
      ]"
    >
      <section class="main-section">
        <Main />
      </section>
      <section class="footer-wrapper">footer section</section>
      <!--      <n-back-top :listen-to="listenTo1" />-->
    </div>
    <!--    <n-back-top :listen-to="listenTo2" />-->
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/layout/layout'
import { computed, onMounted, ref } from 'vue'
import SysNavBar from '@/components/sysNavBar/SysNavBar.vue'
import SysTabBar from '@/components/sysTabBar/SysTabBar.vue'
import { Theme } from '@/store/layout/type'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'
import router from '@/router'
import Main from '@/components/Main.vue'
const props = defineProps({
  showNavBar: {
    type: Boolean,
    default: () => true
  }
})
const layoutStore = useLayoutStore()
// 菜单栏折叠和导航栏固定
const currentIsCollapse = computed(() => layoutStore.isCollapse)
const currentIsFixedNavBar = computed(() => layoutStore.isFixedNavBar)
const currentTheme = computed(() => layoutStore.theme)
const isShowHeader = computed(() => layoutStore.isShowHeader)
const handleTest = () => {
  console.log('test', router.getRoutes())
  router.push('/system')
}

const handleTest1 = () => {
  router.push('/system/user')
}
// const listenTo1 = ref<HTMLElement | null>()
// const listenTo2 = ref<HTMLElement | null>()
// onMounted(() => {
//   listenTo1.value = document.querySelector('.main-base-style')
//   listenTo2.value = document.querySelector('.sys-main-layout-container')
// })
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';

.scrollbar::-webkit-scrollbar {
  width: 0;
}

.main-layout-open-status {
  margin-left: @menuWidth;
}

.main-layout-close-status {
  margin-left: @minMenuWidth;
}

.nav-bar-open-status.fixed-nav-bar {
  width: calc(100% - @menuWidth);
}

.nav-bar-close-status.fixed-nav-bar {
  width: calc(100% - @minMenuWidth);
}

.main-layout {
  overflow-y: auto;
  padding-top: 0;
}

.main-layout-fixed-nav-bar {
  overflow-y: hidden;
  padding-top: @logoHeight + @tabHeight;

  .main-base-style {
    overflow-y: auto;
  }
}

.sys-main-layout-container {
  box-sizing: border-box;
  height: 100%;
  transition: margin-left @transitionTime;

  .main-base-style {
    box-sizing: border-box;
    padding: 5px;
    height: 100%;
  }

  .main-base-light-theme {
    background-color: #f0f2f5;
  }

  .main-base-dark-theme {
    background-color: #333;
  }

  .main-section {
    overflow-x: hidden;
    min-height: calc(100% - @footerHeight - 10px);
  }

  .fixed-nav-bar {
    position: fixed;
    top: 0;
    z-index: 99;
    transition: width @transitionTime;
  }

  .tab-bar-top {
    padding-top: @logoHeight;
  }
}
</style>
