<template>
  <svg :class="className" aria-hidden="true" :height="height" :width="width">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: () => 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: () => '#333'
  },
  width: {
    type: String,
    default: () => '1em'
  },
  height: {
    type: String,
    default: () => '1em'
  }
})
const className = computed(() => {
  if (props.prefix === 'icon') {
    return 'svg-icon'
  } else if (props.prefix === 'iconfont') {
    return 'icon'
  } else {
    return ''
  }
})
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="less" scoped>
.svg-icon {
  overflow: hidden;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentcolor;
}

.svg-icon:hover {
  fill: var(--primary-color-hover);
}

.svg-external-icon {
  display: inline-block;
  background-color: currentcolor;
  mask-size: cover !important;
}

.icon {
  overflow: hidden;
  //width: 1em;
  //height: 1em;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
