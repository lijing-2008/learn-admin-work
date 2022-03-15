interface IDataType<T = any> {
  status: number
  msg: string
  data: T
}
interface ITableType<T = any> {
  status: number
  msg: string
  total: number
  list: Array<T>
}

export { IDataType, ITableType }
