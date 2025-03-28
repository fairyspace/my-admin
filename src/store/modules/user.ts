import router from '@/router'
import { defineStore } from 'pinia'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import { requestLogin, requestLogout, requestUserInfo } from '@/api/user'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts'
import type { UserState } from '@/store/modules/types/types.ts'
import {constantRoute,asyncRoute,anyRoute} from '@/router/routes.ts'
import { userResponseData } from '@/api/user/type.ts'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'



function filterAsyncRoute(asyncRoute:any,routes:any){
  return  asyncRoute.filter((item:any)=>{
    if (routes.includes(item.name)){
      if(item.children &&item.children.length>0){
        item.children=filterAsyncRoute(item.children,routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  /*小仓库存储数据地方*/
  state: (): UserState => {
    return {
      /*一刷新就没有了需要持久化到本地*/
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons:[]
    }
  },
  /*异步逻辑处理地方*/
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await requestLogin(data)
      if (result.code == 200) {
        this.token = result.data
        /*持久化存储*/
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async userInfo() {
      //获取用户信息存储到仓库当中
      const responseData: userResponseData = await requestUserInfo()
      if (responseData.code == 200) {
        this.username = responseData.data.username
        this.avatar = responseData.data.avatar

        const userAsyncRoute=filterAsyncRoute(cloneDeep(asyncRoute) ,responseData.data.routes)
        this.menuRoutes = [...constantRoute,...userAsyncRoute,...anyRoute];



        [...anyRoute,...userAsyncRoute].forEach((route:any)=>{
          router.addRoute(route)
        })

        this.buttons=responseData.data.buttons
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    async userLogout() {
      const response: any = await requestLogout()
      if (response.code == 200) {
        this.token = ''
        this.avatar = ''
        this.username = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error('退出失败'))
      }
    }
  },
  getters: {}
})

export default useUserStore
