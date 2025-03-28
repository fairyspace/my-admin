import request from '@/utils/request.ts'
import {
  MenuResponseData,
  Permissions,
  RequestData,
  ResponseData,
  RoleData,
  RoleResponseData
} from '@/api/acl/role/type.ts'
enum API {
  ALL_ROLE_URL = '/admin/acl/role?apipost_id=17d84bd57cb004',
  ADD_ROLE_URL = '/admin/acl/role/add?apipost_id=1ce150197cb003',
  UPDATE_ROLE_URL = '/admin/acl/role/update?apipost_id=1ce16d113cb006',
  ALL_PERMISSIONS_URL = '/admin/acl/role/permissions?apipost_id=1d02e9e7fcb00b',
  SET_PERMISSIONS_URL = '/admin/acl/role/setPermissions?apipost_id=1d15242fbcb01a',
  REMOVE_ROLE_URL = '/admin/acl/role/remove?apipost_id=1df7ef52fcb003'
}

export const requestAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<string, ResponseData>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<string, ResponseData>(API.ADD_ROLE_URL, data)
  }
}

export const requestDeleteRole = (roleId: number) =>
  request.delete<string, ResponseData>(API.REMOVE_ROLE_URL + '&roleId=' + roleId)

export const requestAllPermissions = (roleId: number) =>
  request.get<string, MenuResponseData>(API.ALL_PERMISSIONS_URL + '&roleId=' + roleId)

export const requestAllRole = (data: RequestData) =>
  request.post<string, RoleResponseData>(API.ALL_ROLE_URL, data)

export const requestSetPermission = (data: Permissions) =>
  request.post<string, ResponseData>(API.SET_PERMISSIONS_URL, data)
