export interface ResponseData {
  code: number
  message: string
}

export interface Menu {
  id?: number
  createTime?: string
  updateTime?: string
  pid: number
  name: string
  code: string
  children: MenuList
  level: number
  select: boolean
}

export type MenuList = Menu[]

export interface MenuResponseData extends ResponseData {
  data: MenuList
}

export interface MenuParams {
  id?: number|string
  code: string
  level: number
  name: string
  pid: number
}
