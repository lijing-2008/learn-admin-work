<template>
  <n-drawer v-model:show="opened" placement="right" width="280px">
    <n-drawer-content title="系统设置" closable class="wrapper">
      <n-divider dashed>主题设置</n-divider>
      <n-grid>
        <n-grid-item
          v-for="item of themeExampleConfig"
          :key="item.themeId"
          :span="12"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            :tip-text="item.tipText"
            @click="handleThemeClick(item)"
          />
        </n-grid-item>
      </n-grid>
      <n-divider dashed>布局模式</n-divider>
      <n-grid>
        <n-grid-item
          v-for="item of layoutExampleConfig"
          :key="item.layoutId"
          :span="8"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            :class="[item?.class || '']"
            :tip-text="item.tipText"
            @click="handleLayoutModeClick(item)"
          />
        </n-grid-item>
      </n-grid>
      <n-divider dashed>侧边栏样式</n-divider>
      <n-grid>
        <n-grid-item
          v-for="item of sideExampleConfig"
          :key="item.themeId"
          :span="12"
          class="example-wrapper"
        >
          <StyleExample
            :checked="item.checked"
            :left-bg="item.leftBg"
            :right-top-bg="item.rightTopBg"
            :right-bottom-bg="item.rightBottomBg"
            :tip-text="item.tipText"
            @click="handleSideThemeClick(item)"
          />
        </n-grid-item>
      </n-grid>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StyleExample from '@/components/sysSetting/cpns/StyleExample.vue'
import { useLayoutStore } from '@/store/layout/layout'
import {
  themeExampleConfig,
  layoutExampleConfig,
  sideExampleConfig
} from '@/components/sysSetting/config'

const layoutStore = useLayoutStore()
// todo 修改布局时相当于重新挂载组件，选择后opened默认为false，所以会消失
const opened = ref(false)
const openDrawer = () => {
  opened.value = true
}
defineExpose({
  openDrawer
})
const handleThemeClick = (item: any) => {
  themeExampleConfig.forEach((it) => {
    it.checked = it === item
  })
  layoutStore.changeThemeAction(item.themeId)
}
const handleLayoutModeClick = (item: any) => {
  layoutExampleConfig.forEach((it) => {
    it.checked = it === item
  })
  layoutStore.changeLayoutModeAction(item.layoutId)
}
const handleSideThemeClick = (item: any) => {
  sideExampleConfig.forEach((it) => {
    it.checked = it === item
  })
  layoutStore.changeSideBarBgColor(item.themeId)
}
</script>

<style lang="less" scoped>
@width: 60px;

.set-container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  margin-top: calc(50vh - 100px);
  max-width: calc(@width + 20px);
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
  flex-direction: column;
  justify-content: center;

  .tip-wrapper {
    display: flex;
    border-radius: 4px;
    width: @width;
    height: @width;
    font-size: 10px;
    transition: color 0.15s ease, background-color 0.15s ease;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > i {
      margin-bottom: 8px;
      font-size: 20px;
    }
  }

  .tip-wrapper + .tip-wrapper {
    margin-top: 10px;
  }

  .bg1 {
    color: #1bc3bb;
  }

  .bg1:hover {
    color: #fff;
    background-color: #1bc3bb;
  }

  .bg2 {
    color: #3698fd;
  }

  .bg2:hover {
    color: #fff;
    background-color: #3698fd;
  }
}

.wrapper {
  .close-wrapper {
    font-size: 20px;
    text-align: right;
  }

  .colors-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .color-wrapper {
      margin-bottom: 20px;
      border: 1px solid #c1c1c1;
      border-radius: 5px;
      width: 20px;
      height: 20px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    }

    .circle::after {
      display: block;
      margin: 0 auto;
      margin-top: 25px;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      text-align: center;
      background-color: rgb(3 190 50);
      content: '';
    }
  }

  .setting-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
  }
}

.example-wrapper + .example-wrapper {
  margin-bottom: 30px;
}

.info-key {
  width: 40%;
}
</style>
