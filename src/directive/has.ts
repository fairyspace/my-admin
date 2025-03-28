import pinia from '@/store'
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
  app.directive('has', {
    //代表使用全局自定义指令组件挂在完毕会执行
    mounted(el: any, options: any) {
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
