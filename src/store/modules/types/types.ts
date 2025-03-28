import type { RouteRecordRaw } from 'vue-router'
import type { CateGoryResponse } from '@/api/product/attr/type.ts'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

export interface CateGoryState {
  attrList1: CateGoryResponse[]
  attrList2: CateGoryResponse[]
  attrList3: CateGoryResponse[]
  attr1Id: '' | number
  attr2Id: '' | number
  attr3Id: '' | number
}
