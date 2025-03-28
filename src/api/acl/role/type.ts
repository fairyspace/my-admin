export interface ResponseData {
  code: number
  message: string
}

export interface RequestData {
  pageNo: number
  pageSize: number
  roleName: string
}

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName?: string
  remark?: null
}

export type Records = RoleData[]

export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface MemuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  level: number
  children?: MenuList
  select: boolean
}

export type MenuList = MemuData[]

export interface MenuResponseData extends ResponseData {
  data: MenuList
}

export interface Permissions {
  roleId: number
  permissionIds: number[]
}
