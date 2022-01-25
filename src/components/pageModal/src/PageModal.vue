<template>
  <div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 900px"
        :title="modalTitle"
        :bordered="false"
        size="huge"
      >
        <BaseForm
          v-bind="modalConfigs"
          v-model="formData"
          ref="baseFormRef"
          :rules="rules"
        />
        <template #footer>
          <div class="flex justify-center space-x-4">
            <n-button type="primary" @click="handleConfirmClick">
              确定
            </n-button>
            <n-button secondary type="primary" @click="handleCancelClick">
              取消
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue'
import type { IBaseFormRef } from '@/base-ui/base-form'
import BaseForm, { IFormConfig } from '@/base-ui/base-form'
import { FormRules, useMessage } from 'naive-ui'

const props = defineProps({
  modalConfigs: {
    type: Object as PropType<IFormConfig>,
    required: true
  },

  rules: {
    type: Object as PropType<FormRules>,
    required: false
  }
})
// 模态框显示与消失
const showModal = ref(false)
// 模态框标题
const modalTitle = ref('新增')
defineExpose({ showModal, modalTitle })

// formData属性动态设置
const formItems = props.modalConfigs?.formOptions ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

//点击确定的回调
const baseFormRef = ref<InstanceType<typeof BaseForm> & IBaseFormRef>()
const message = useMessage()
const handleConfirmClick = () => {
  showModal.value = false
  console.log('click confirm')
}

const handleCancelClick = () => {
  showModal.value = false
}
</script>
<style scoped></style>
