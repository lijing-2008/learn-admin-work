<template>
  <div class="pr-6">
    <n-form
      :model="account"
      label-align="center"
      label-width="80"
      require-mark-placement="left"
      :rules="accountRules"
      ref="formRef"
    >
      <n-form-item label-placement="left" label="身份证号" path="username">
        <n-input
          placeholder="请输入身份证号"
          v-model:value="account.username"
        ></n-input>
      </n-form-item>
      <n-form-item label-placement="left" label="密码" path="password">
        <n-input
          type="password"
          placeholder="请输入密码"
          v-model:value="account.password"
          show-password-on="mousedown"
        ></n-input>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { reactive, ref } from 'vue'
import { accountRules } from '../config/account-config'
import { NForm, useMessage } from 'naive-ui'
import { useLoginStore } from '@/store/login/login'

// 1.从localStorage获取用户名密码，如果有则赋值，没有为空字符
const account = reactive({
  username: localCache.getItem('username') ?? '',
  password: localCache.getItem('password') ?? ''
})

const formRef = ref<InstanceType<typeof NForm>>()
const loginStore = useLoginStore()
const message = useMessage()
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      // 1.判断是否需要记住密码
      if (isKeepPassword) {
        // 本地缓存
        localCache.setItem('username', account.username)
        localCache.setItem('password', account.password)
      } else {
        // 不需要记住密码则清除缓存
        localCache.removeItem('username')
        localCache.removeItem('password')
      }
      // 2.真正登录逻辑
      loginStore.accountLoginAction(account)
    } else {
      message.error('表单校验失败,请重新输入!')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped></style>
