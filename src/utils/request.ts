import axios from 'axios'
import { ElMessage } from 'element-plus'

import useUserStore from '@/store/modules/user.ts'

/*创建请求实例，并配置基础公共配置信息,本身就是axios实例*/
const requestEntity = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

/*请求拦截器，拿到请求信息，可以自定义修改*/
requestEntity.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.token
  if (token) {
    config.headers.set('token', token)
  }
  /*必须要返回，否则无法发送请求*/
  return config
})

requestEntity.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    //处理网络错误
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg
    })
    return Promise.reject(error)
  }
)

export default requestEntity
