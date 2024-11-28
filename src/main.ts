// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import globalComponents from '@/components'

const app = createApp(App)
app.use(globalComponents)
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
