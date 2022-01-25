<template>
  <div>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 500px"
        title="注册新用户"
        :bordered="false"
        size="huge"
      >
        <n-form :model="modelRef" ref="formRef" :rules="rules">
          <n-form-item path="username" label="身份证号">
            <n-input
              v-model:value="modelRef.username"
              @keydown.enter.prevent
              placeholder="请输入身份证号"
            />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="modelRef.password"
              @input="handlePasswordInput"
              type="password"
              placeholder="请输入密码"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item
            first
            path="reenteredPassword"
            label="确认密码"
            ref="rPasswordFormItemRef"
          >
            <n-input
              :disabled="!modelRef.password"
              v-model:value="modelRef.reenteredPassword"
              type="password"
              placeholder="请再次输入密码"
              @keydown.enter.prevent
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="flex justify-center space-x-20">
            <n-button type="primary" @click="handleConfirmClick">
              注册
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
import { ref } from 'vue'
import { FormItemRule, FormRules, NForm, NFormItem, useMessage } from 'naive-ui'

const formRef = ref<InstanceType<typeof NForm>>()
const rPasswordFormItemRef = ref<InstanceType<typeof NFormItem>>()
const message = useMessage()

const showModal = ref(false)
defineExpose({ showModal })

const modelRef = ref({
  username: '',
  password: '',
  reenteredPassword: ''
})

function validatePasswordSame(rule: FormItemRule, value: any) {
  return value === modelRef.value.password
}

// 身份证号校验，支持1/2代身份证
const idCardReg =
  /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/

const rules: FormRules = {
  username: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请填写身份证号')
        } else if (!idCardReg.test(value)) {
          return new Error('身份证号校验失败')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('请再次输入密码')
        } else if (value !== modelRef.value.password) {
          return new Error('两次密码输入不一致')
        }
      },
      trigger: ['input', 'blur', 'password-input']
    }
  ]
}
const handlePasswordInput = () => {
  if (modelRef.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}

const handleConfirmClick = () => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      message.info('校验成功')
      showModal.value = false
    } else {
      message.error('表单校验失败，请重新输入...')
    }
  })
}
const handleCancelClick = () => {
  showModal.value = false
}
</script>

<style scoped></style>
