import request from '@/utils/request'
import { loginForm, loginResponseData, userResponseData } from '@/api/user/type.ts'

/*定义接口路径*/
enum API {
  LOGIN_URL = '/admin/acl/index/login?apipost_id=11fbd9533f1007',
  USER_INFO = '/admin/acl/index/info?apipost_id=2a59292aff1032',
  LOGOUT_URL = '/admin/acl/index/logout?apipost_id=2a80e48bff1008'
}

/*再一次封装接口方法，到具体的枚举方法内*/

export const requestLogin = (data: loginForm) =>
  request.post<string, loginResponseData>(API.LOGIN_URL, data)

export const requestUserInfo = () => request.get<string, userResponseData>(API.USER_INFO)

export const requestLogout = () => request.post<string, any>(API.LOGOUT_URL)
