import { FormRules } from 'naive-ui'

export const accountRules: FormRules = {
  username: [
    {
      required: true,
      message: '用户名必填',
      trigger: 'blur'
      // TODO 这里的validator类型还没弄懂
      // validator: (rule, value) => {
      //   console.log(rule, value)
      //   return false
      // }
    },
    {
      pattern: /[a-zA-Z0-9]{1,}/,
      message: '用户名由3位以上字符和数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码必传',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码需使用3个以上字符',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}
