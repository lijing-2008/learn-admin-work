import { FormRules } from 'naive-ui'

export const accountRules: FormRules = {
  username: [
    {
      required: true,
      message: '身份证号必传',
      trigger: 'blur'
      // TODO 这里的validator类型还没弄懂
      // validator: (rule, value) => {
      //   console.log(rule, value)
      //   return false
      // }
    },
    {
      pattern:
        /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
      message: '身份证校验失败',
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
  ]
}
