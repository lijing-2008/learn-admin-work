import { IFormConfig, IFormOptions } from '@/base-ui/base-form'
import { FormRules } from 'naive-ui'

const formItemOptions: IFormOptions[] = [
  {
    field: 'username',
    itemType: 'input',
    label: '身份证号',
    placeholder: '请输入身份证号'
  },
  {
    field: 'password',
    itemType: 'input',
    label: '密码',
    placeholder: '请输入密码'
  },
  {
    field: 'password1',
    itemType: 'input',
    label: '确认密码',
    placeholder: '请再次输入密码'
  }
]
//配置form的基本prop，可以参考naive-ui的form配置
const formStyle = {
  'label-placement': 'left',
  'label-width': '100px'
}
//配置grid布局
const columnStyle = {
  'x-gap': '10',
  'y-gap': '10',
  cols: 's:1',
  responsive: 'screen'
}
export const modalConfigs: IFormConfig = {
  formOptions: formItemOptions,
  formStyle: formStyle,
  columnStyle: columnStyle
}

// 身份证号校验，支持1/2代身份证
const idCardReg =
  /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
export const rules: FormRules = {
  username: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('身份证号必填...')
        } else if (!idCardReg.test(value)) {
          return new Error('身份证校验失败...')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'input'
    },
    {
      pattern: /[0-9a-zA-Z]{3,}/,
      message: '密码需3个字符以上',
      trigger: ['input', 'blur']
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    }
  ]
}
