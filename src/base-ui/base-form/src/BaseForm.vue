<template>
  <div>
    <slot name="header" />
  </div>
  <n-form v-bind="formStyle" ref="formRef" :model="formData" :rules="rules">
    <n-grid v-bind="columnStyle">
      <template v-for="item in formOptions" :key="item.label">
        <n-grid-item>
          <n-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rule="item.rules"
            :path="item.field"
          >
            <template v-if="item.itemType === 'input'">
              <n-input
                :placeholder="item.placeholder"
                v-model:value="formData[item.field]"
                v-bind="item.otherOptions"
              />
            </template>

            <template v-else-if="item.itemType === 'treeSelect'">
              <n-tree-select
                :placeholder="item.placeholder"
                :options="item.treeOptions"
                :label-field="item.labelField"
                :key-field="item.keyField"
                v-model:value="formData[item.field]"
                clearable
                v-bind="item.otherOptions"
              />
            </template>
            <template v-else-if="item.itemType === 'select'">
              <n-select
                :placeholder="item.placeholder"
                :options="item.options"
                v-model:value="formData[item.field]"
                clearable
                v-bind="item.otherOptions"
              />
            </template>

            <template v-else-if="item.itemType === 'datepicker'">
              <n-date-picker
                class="w-full"
                type="date"
                v-model:value="formData[item.field]"
                clearable
                v-bind="item.otherOptions"
              />
            </template>

            <template v-else-if="item.itemType === 'dateRangePicker'">
              <n-date-picker
                class="w-full"
                type="daterange"
                v-model:value="formData[item.field]"
                :default-value="item.defaultValue"
                clearable
                v-bind="item.otherOptions"
              />
            </template>
          </n-form-item>
        </n-grid-item>
      </template>
    </n-grid>
  </n-form>
  <div>
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue'
import { FormRules, NForm } from 'naive-ui'
import { IFormOptions } from '@/base-ui/base-form'

const formRef = ref<InstanceType<typeof NForm>>()

const props = defineProps({
  formOptions: {
    type: Array as PropType<IFormOptions[]>,
    required: true
  },
  formStyle: {
    type: Object,
    default: () => ({
      'label-placement': 'left',
      'label-width': '100px'
    })
  },
  columnStyle: {
    type: Object,
    default: () => ({
      'x-gap': '10',
      'y-gap': '10',
      cols: 's:1 m:2 l:3 xl:4',
      responsive: 'screen'
    })
  },
  modelValue: {
    type: Object,
    required: true
  },
  rules: {
    type: Object as PropType<FormRules>,
    required: false
  }
})

// 将该组件中的form数据绑定到外部,其实是一个浅拷贝
const emits = defineEmits(['update:modelValue'])
const formData = ref({ ...props.modelValue })
// 针对传入的modelValue会变的情况，需要同步修改formData的值
const newFormData = computed(() => props.modelValue)
watch(
  newFormData,
  (newValue) => {
    formData.value = newValue
  },
  {
    deep: true
  }
)

// 表单校验函数，校验通过返回true，校验失败返回false
const validator = () => {
  if (!formData.value) return false
  formRef.value?.validate((valid) => {
    if (!valid) {
      // 校验成功
      emits('update:modelValue', newValue)
      return true
    } else {
      // 校验失败
      return false
    }
  })
}

// 校验结果，false为校验成功，true为校验失败
const isFormDataChanged = ref(false)
// watch(
//   formData,
//   (newValue) => {
//     // 数据发生变化
//     isFormDataChanged.value = true
//     //先进行表单校验
//     // TODO 表单验证的时机还需要进行优化
//     formRef.value?.validate((valid) => {
//       if (!valid) {
//         checkRules.value = false
//         emits('update:modelValue', newValue)
//       } else {
//         checkRules.value = true
//         console.log('check============', valid)
//       }
//     })
//   },
//   { deep: true }
// )

defineExpose({
  isFormDataChanged,
  validator
})
</script>

<style scoped></style>
