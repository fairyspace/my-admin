export interface loginForm {
  username: string
  password: string
}

export interface responseData {
  code: number
  message: string
}

export interface loginResponseData extends responseData {
  data: string
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  roles: string[]
  buttons: string[]
  routes: string[]
}

export interface userResponseData extends responseData {
  data: userInfo
}

export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: string
}

export interface SetRoleData {
  userId: number
  roleIdList: number[]
}

export type AllRole = RoleData[]

export interface RoleResponseData extends responseData {
  data: {
    assignRoles: AllRole
    allRoleList: AllRole
  }
}
