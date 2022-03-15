interface Iface {
  name: string
  age: string
}
interface IFace1 {
  name?: string
}

const a: Iface[] = [{ name: 'li', age: 'kk' }]
const b: IFace1[] = [{ name: 'aa' }]
b.push(a[0])
console.log(b)
