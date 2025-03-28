// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

import 'element-plus/dist/index.css'

import globalComponents from '@/components'

import pinia from '@/store'
import router from '@/router'
import { isHasButton } from '@/directive/has.ts'
const app = createApp(App)
isHasButton(app)
app.use(router)
app.use(pinia)
app.use(globalComponents)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
