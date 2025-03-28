import request from '@/utils/request.ts'
import { User, UserRequest, UserResponseData } from '@/api/acl/user/type.ts'
import { SetRoleData } from '@/api/user/type.ts'

enum API {
  ALL_USERS = '/admin/acl/user?apipost_id=d696315f7c013',
  ADD_USER_URL = '/admin/acl/user/add?apipost_id=d985177f7c019',
  UPDATE_USER_URL = '/admin/acl/user/update??apipost_id=d98624237c01b',
  USER_ROLE_URL = '/admin/acl/user/assignRole?apipost_id=fce25f877c003',
  USER_SET_ROLE_URL = '/admin/acl/user/setRole?apipost_id=101b962337c00f',
  DELETE_USER_URL = '/admin/acl/user/remove?apipost_id=16953459fcb003'
}

export const requestUserList = (data: UserRequest) =>
  request.post<string, UserResponseData>(API.ALL_USERS, data)

export const requestAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<string, any>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<string, any>(API.ADD_USER_URL, data)
  }
}

export const requestUserRole = (userId: number) =>
  request.get<string, any>(API.USER_ROLE_URL + '&userId=' + userId)

export const requestSetRole = (data: SetRoleData) =>
  request.post<string, any>(API.USER_SET_ROLE_URL, data)

export const requestDeleteUser = (userIds: number[]) =>
  request.delete<string, any>(API.DELETE_USER_URL, { data: userIds })
