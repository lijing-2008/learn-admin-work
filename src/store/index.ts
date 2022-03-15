import { useLoginStore } from '@/store/login/login'

export function setupStore() {
  const loginStore = useLoginStore()
  loginStore.loadLocalLogin()
}
