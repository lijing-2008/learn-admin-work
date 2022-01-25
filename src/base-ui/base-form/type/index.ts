import {
  FormItemRule,
  SelectGroupOption,
  SelectOption,
  TreeSelectOption
} from 'naive-ui'

type IFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'datepicker'
  | 'dateRangePicker'
  | 'treeSelect'

export interface IFormOptions {
  field: string
  itemType: IFormType
  label: string
  placeholder?: string
  rules?: FormItemRule[] | FormItemRule
  options?: Array<SelectOption | SelectGroupOption>
  labelField?: string
  keyField?: string
  treeOptions?: TreeSelectOption[]
  isHidden?: boolean
  defaultValue?: number | [number, number]
  otherOptions?: any
}

export interface IFormConfig {
  formOptions: IFormOptions[]
  formStyle: Object
  columnStyle: Object
}

export interface IBaseFormRef {
  checkRules: boolean
  isFormDataChanged: boolean
}

type FormRules = {
  [itemValidatePath: string]: FormItemRule | Array<FormItemRule> | FormRules
}
