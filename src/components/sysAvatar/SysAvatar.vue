<template>
  <div class="sys-avatar-container">
    <n-dropdown trigger="hover" :options="options" @select="handleSelectClick">
      <div class="action-wrapper">
        <div class="avatar">
          <n-avatar circle size="small" :src="currentAvatar" />
        </div>
        <span class="nick-name"> {{ currentUserName }} </span>
        <n-icon class="tip">
          <CaretDown24Filled />
        </n-icon>
      </div>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import {
  CaretDown24Filled,
  PersonSettings20Regular,
  PersonArrowRight20Regular
} from '@vicons/fluent'
import { useLoginStore } from '@/store/login/login'
import { computed, h } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { useGlobalStore } from '@/store/global/global'
const loginStore = useLoginStore()
const currentAvatar = computed(() => loginStore.avatar)
const currentUserName = computed(() => loginStore.userInfo.user.nickName)
const options = [
  {
    label: '个人中心',
    key: 'personal-center',
    icon: () =>
      h(NIcon, null, {
        default: () => h(PersonSettings20Regular)
      })
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () =>
      h(NIcon, null, {
        default: () => h(PersonArrowRight20Regular)
      })
  }
]
const message = useMessage()
const handleSelectClick = (key: string) => {
  switch (key) {
    case 'personal-center':
      message.info('个人中心')
      break
    case 'logout':
      loginStore.logoutAction()
      message.info('注销成功!')
      break
  }
}
</script>

<style lang="less" scoped>
@import 'src/assets/css/variables.less';

.sys-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;

    .avatar {
      display: flex;
      width: calc(@logoHeight - 15px);
      height: calc(@logoHeight - 15px);
      align-items: center;

      & > img {
        border: 1px solid #f6f6f6;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .nick-name {
      margin: 0 5px;

      .tip {
        margin-left: 2px;
        transition: transform @transitionTime;
        transform: rotate(0);
      }
    }
  }
}

.sys-avatar-container:hover {
  color: var(--primary-color);
  cursor: pointer;

  .nick-name .tip {
    transition: transform @transitionTime;
    transform: rotate(180deg);
  }
}
</style>
