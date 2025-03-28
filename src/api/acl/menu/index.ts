import request from '@/utils/request.ts'
import { MenuParams, MenuResponseData, ResponseData } from '@/api/acl/menu/type.ts'

enum API {
  ALL_MENU_URL = '/admin/acl/menu?apipost_id=1e24d0193cb008',
  ADD_MENU_URL = '/admin/acl/menu/add?apipost_id=1f73392d7cb00e',
  UPDATE_MENU_URL = '/admin/acl/menu/update?apipost_id=1f78a28c3cb011',
  DELETE_MENU_URL = '/admin/acl/menu/remove?apipost_id=1f7e476c7cb013'
}

export const requestAllMenu = () => request.get<string, MenuResponseData>(API.ALL_MENU_URL)

export const requestAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<string, ResponseData>(API.UPDATE_MENU_URL, data)
  } else {
    return request.post<string, ResponseData>(API.ADD_MENU_URL, data)
  }
}
export const requestDeleteMenu = (id: number) =>
  request.delete<string, ResponseData>(API.DELETE_MENU_URL + '&id=' + id)
