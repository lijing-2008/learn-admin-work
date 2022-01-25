<template>
  <n-drawer v-model:show="opened" placement="right" width="280px">
    <n-drawer-content title="系统设置" closable class="wrapper">
      <n-divider dashed>主题设置</n-divider>
      <n-grid>
        <n-grid-item
          v-for="item of themeList"
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
          v-for="item in layoutExampleList"
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
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LayoutMode } from '@/store/layout/type'
import StyleExample from '@/components/sysSetting/cpns/StyleExample.vue'
import { useLayoutStore } from '@/store/layout/layout'
const layoutStore = useLayoutStore()
const opened = ref(true)
const openDrawer = () => {
  opened.value = true
}
defineExpose({
  openDrawer
})
const handleThemeClick = (item) => {
  themeList.forEach((it) => {
    it.checked = it === item
  })
  layoutStore.changeThemeAction(item.themeId)
}
const handleLayoutModeClick = (item) => {
  layoutExampleList.forEach((it) => {
    it.checked = it === item
  })
  layoutStore.changeLayoutModeAction(item.layoutId)
}
const themeList = reactive([
  {
    leftBg: '#ffffff',
    rightTopBg: '#ffffff',
    rightBottomBg: '#f5f5f5',
    checked: false,
    themeId: 'light',
    tipText: '明亮'
  },
  {
    leftBg: '#000000',
    rightTopBg: '#000000',
    rightBottomBg: '#333333',
    checked: false,
    themeId: 'dark',
    tipText: '暗黑'
  }
])
const layoutExampleList = reactive([
  {
    leftBg: '#000000',
    rightTopBg: '#d4d4d4',
    rightBottomBg: '#d4d4d4',
    checked: true,
    layoutId: LayoutMode.LTR,
    tipText: '左右'
  },
  {
    leftBg: '#d4d4d4',
    rightTopBg: '#ffffff',
    rightBottomBg: '#d4d4d4',
    checked: false,
    layoutId: LayoutMode.TTB,
    class: 'extra-class',
    tipText: '上下'
  },
  {
    leftBg: '#000000',
    rightTopBg: '#d4d4d4',
    rightBottomBg: '#d4d4d4',
    checked: false,
    layoutId: LayoutMode.LCR,
    class: 'extra-class-1',
    tipText: '分栏'
  }
])
</script>

<style lang="less" scoped>
@width: 60px;
.set-container {
  position: fixed;
  right: 0;
  top: 0;
  margin-top: calc(50vh - 100px);
  z-index: 999;
  max-width: calc(@width + 20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .tip-wrapper {
    width: @width;
    height: @width;
    border-radius: 4px;
    font-size: 10px;
    transition: color 0.15s ease, background-color 0.15s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > i {
      font-size: 20px;
      margin-bottom: 8px;
    }
  }
  .tip-wrapper + .tip-wrapper {
    margin-top: 10px;
  }
  .bg1 {
    color: #1bc3bb;
  }
  .bg1:hover {
    background-color: #1bc3bb;
    color: #ffffff;
  }
  .bg2 {
    color: #3698fd;
  }
  .bg2:hover {
    background-color: #3698fd;
    color: #ffffff;
  }
}
.wrapper {
  .close-wrapper {
    text-align: right;
    font-size: 20px;
  }
  .colors-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .color-wrapper {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #c1c1c1;
      margin-bottom: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .circle::after {
      content: '';
      display: block;
      margin: 0 auto;
      margin-top: 25px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgb(3, 190, 50);
      text-align: center;
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
