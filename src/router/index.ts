import { createRouter, createWebHashHistory } from 'vue-router'
import {constantRoute} from './routes.ts'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user.ts'
import pinia from '@/store'

import setting from '@/setting.ts'
/*移除旋转小球特效*/
nprogress.configure({ showSpinner: false })



const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    /*界面切换直接滚动到顶部*/
    return { top: 0, left: 0 }
  }
})


/*用户未登录时候，可以访问login,其他不能访问*/
/*用户登陆成功，不能访问login，否则转向home*/

//前置路由
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(pinia)
  console.log(from)
  document.title = setting.title + '-' + to.meta.title
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    //登陆成功不能再去登陆页面了
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //其余页面是需要用户信息展示
      if (username) {
        next()
      } else {
        //没有用户信息，重新拉取
        try {

          await userStore.userInfo()
          //刷新时候异步路由，获取到了用户信息，异步路由还没加载完毕，出现空白，而不是使用next()
          next({...to})
        } catch (error) {
          //token过期了导致没有用户信息
          //或者用户自己修改了本地cache,
          //调用推出接口，清除数据
          await userStore.userLogout()
          //接着回到首页，带上想去页面，却没有去成的路由
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    /*没登陆想去登陆则直接放行*/
    if (to.path == '/login') {
      next()
    } else {
      /*其余指向login*/
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

  //放行函数
})

//后置路由
router.afterEach((to, from, failure) => {
  console.log(to, from, failure)
  nprogress.done()
})

export default router
