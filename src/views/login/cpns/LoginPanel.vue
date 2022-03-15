<template>
  <div class="flex login-container">
    <div class="left">
      <div class="content-wrapper">
        <div class="logo-wrapper">
          <img src="@/assets/vue-logo.png" width="60" />
        </div>
        <div class="title">DIY ADMIN</div>
        <div class="sub-title">Vue3 + Vite2 + TS + Pinia + Naive UI</div>
        <div class="flex-1 flex justify-center items-center ttppii px-29">
          <p>
            有一种经历叫历尽沧桑,有一种远眺叫含泪微笑,有一种追求叫浅行静思,有一种美丽叫淡到极致.
          </p>
        </div>
        <div class="bottom-wrapper">DIY by coder-li</div>
      </div>
    </div>
    <div class="right flex-1 flex justify-center items-center">
      <div class="w-400px h-300px mb-100px">
        <h1 class="text-center">中后台数据维护系统</h1>
        <n-card content-style="padding: 20px 20px 0px 20px;">
          <n-tabs
            type="line"
            default-value="signIn"
            size="large"
            justify-content="space-evenly"
            pane-style="padding: 20px 20px 0px 20px;"
          >
            <n-tab-pane name="signIn">
              <template #tab>
                <span class="flex justify-between items-center">
                  <n-icon size="20" class="mr-2"> <Person32Regular /> </n-icon
                  >登录
                </span>
              </template>
              <LoginAccount ref="accountRef" />
            </n-tab-pane>
          </n-tabs>
        </n-card>

        <div class="flex justify-between mt-2">
          <n-checkbox v-model:checked="isKeepPassword">记住密码</n-checkbox>
          <n-button text color="#000000" @click="handleClickRegister">
            <template #icon>
              <n-icon>
                <PersonAdd28Regular />
              </n-icon>
            </template>
            注册
          </n-button>
        </div>
        <RegisterModal ref="registerModalRef" />

        <div class="mt-2">
          <n-button type="primary" class="w-full" @click="handleClickLogin"
            >立即登录
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Person32Regular, PersonAdd28Regular } from '@vicons/fluent'
import LoginAccount from './LoginAccount.vue'
import { ILoginAccountRef, IRegisterModalRef } from '@/views/login/cpns/type'
import PageModal from '@/components/pageModal/src/PageModal.vue'
import { modalConfigs, rules } from '@/views/login/config/modalConfigs'
import { IPageModalRef } from '@/components/pageModal'
import RegisterModal from '@/views/login/cpns/RegisterModal.vue'

const isKeepPassword = ref(true)
// 1.登录
const accountRef = ref<InstanceType<typeof LoginAccount> & ILoginAccountRef>()
const handleClickLogin = () => {
  accountRef.value?.loginAction(isKeepPassword.value)
}
// 2.注册
const pageModalRef = ref<InstanceType<typeof PageModal> & IPageModalRef>()
const registerModalRef = ref<
  InstanceType<typeof RegisterModal> & IRegisterModalRef
>()
const handleClickRegister = () => {
  console.log('hello')
  if (registerModalRef.value) {
    registerModalRef.value!.showModal = true
  }
}
</script>

<style lang="less" scoped>
@keyframes left-to-right {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.login-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
  @media screen and(max-width:960px) {
    .left {
      display: none !important;
    }
  }

  .left {
    display: block;
    position: relative;
    width: 450px;
    min-width: 450px;

    & > img {
      height: 100%;
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      background-color: rgb(0 0 0 / 60%);
      content: '';
    }

    .content-wrapper {
      display: flex;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .logo-wrapper {
        margin-top: 30%;
        width: 80px;
      }

      .title {
        margin-top: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
      }

      .sub-title {
        margin-top: 10px;
        font-size: 16px;
        color: #f5f5f5;
      }

      .ttppii {
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        text-shadow: 0 0 5px var(--primary-color), 0 0 15px var(--primary-color),
          0 0 50px var(--primary-color), 0 0 150px var(--primary-color);
        // text-shadow: 1px 1px 2px #f5f5f5;
        animation: left-to-right 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .bottom-wrapper {
        margin-bottom: 5%;
        font-size: 16px;
        color: #c0c0c0;
      }
    }
  }

  .right {
  }
}
</style>
