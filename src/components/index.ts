import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
import { App, Component } from 'vue'
import * as ElementPLusIcons from '@element-plus/icons-vue'

const globalCom: Record<string, Component> = { SvgIcon, Pagination, Category }

export default {
  install(Vue: App) {
    Object.keys(globalCom).forEach((key) => {
      Vue.component(key, globalCom[key])
    })

    Object.entries(ElementPLusIcons).forEach(([key, component]) => {
      Vue.component(key, component)
    })
  }
}
