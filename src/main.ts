import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import 'normalize.css'
import '@/assets/css/index.less'
import { createPinia } from 'pinia'
import router from '@/router'
import { naive } from '@/global'
import 'virtual:svg-icons-register'
import './icons/iconfont/iconfont.js'
import { setupStore } from '@/store'
// import './test'

const app = createApp(App)
app.use(createPinia())
setupStore()
//动态路由的添加放在这里
app.use(router)
app.use(naive)
app.mount('#app')
