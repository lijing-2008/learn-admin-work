<template>
  <div class="style-example-container" :class="{ 'circle-tip': checked }">
    <div
      class="left"
      :style="{ background: leftBg, backgroundSize: 'cover' }"
    ></div>
    <div class="right">
      <div class="right-top" :style="{ backgroundColor: rightTopBg }"></div>
      <div
        class="right-bottom"
        :style="{ backgroundColor: rightBottomBg }"
      ></div>
    </div>
    <div v-if="tipText" style="font-size: 12px; text-align: center">
      {{ tipText }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  leftBg: {
    type: String,
    default: '#000000'
  },
  rightTopBg: {
    type: String,
    default: '#ff0000'
  },
  rightBottomBg: {
    type: String,
    default: '#f5f5f5'
  },
  checked: {
    type: Boolean,
    default: false
  },
  tipText: {
    type: String,
    default: null
  }
})
</script>

<style lang="less" scoped>
@border-radius: 4px;

.style-example-container {
  margin: 0 auto;
  border-radius: @border-radius;
  width: 50px;
  height: 40px;
  background-color: transparent;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);

  .left {
    display: inline-block;
    border-top-left-radius: @border-radius;
    border-bottom-left-radius: @border-radius;
    width: 30%;
    height: 100%;
  }

  .right {
    display: inline-block;
    border-top-right-radius: @border-radius;
    border-bottom-right-radius: @border-radius;
    width: 70%;
    height: 100%;

    .right-top {
      border-top-right-radius: @border-radius;
      height: 20%;
    }

    .right-bottom {
      border-bottom-right-radius: @border-radius;
      height: 80%;
    }
  }
}

.circle-tip::after {
  display: block;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  text-align: center;
  background-color: rgb(3 190 50);
  content: '';
}

.extra-class {
  .right {
    width: 100%;

    .right-top {
      border-top-left-radius: @border-radius;
      border-top-right-radius: @border-radius;
    }

    .right-bottom {
      border-bottom-right-radius: @border-radius;
      border-bottom-left-radius: @border-radius;
    }
  }

  .left {
    width: 0;
  }
}

.extra-class-1 {
  .left {
    width: 30%;
  }

  .left::after {
    display: inline-block;
    position: relative;
    top: 0;
    left: 5px;
    width: 10px;
    height: 100%;
    background-color: #828282;
    content: '';
  }
}
</style>
