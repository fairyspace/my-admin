export interface UserRequest {
  pageNo: number
  pageSize: number
  username: string
}

export interface ResponseData {
  code: number
  message: string
}

export interface User {
  id?: 1
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: number
  roaleName?: string
}

export type Records = User[]

export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
