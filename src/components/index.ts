import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import { App, Component } from 'vue'

const globalCom: Record<string, Component> = { SvgIcon, Pagination }

export default {
  install(Vue: App) {
    Object.keys(globalCom).forEach((key) => {
      Vue.component(key, globalCom[key])
    })
  }
}
