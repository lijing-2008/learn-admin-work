<template>
  <div>
    <div
      ref="echartsDivRef"
      :style="{
        width: width,
        height: height
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  defineProps,
  withDefaults,
  watchEffect,
  PropType
} from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '@/base-ui/echart/hooks/useEchart'

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: EChartsOption
  }>(),
  {
    width: '100%',
    height: '100%'
  }
)
// const props = defineProps({
//   width: String,
//   height: String,
//   option: { type: Object as PropType<EChartsOption>, required: true }
// })

const echartsDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(<HTMLElement>echartsDivRef.value)
  //options发生改变就更新界面，重新设置数据
  watchEffect(() => {
    setOptions(props.option)
  })
})
</script>

<style scoped></style>
