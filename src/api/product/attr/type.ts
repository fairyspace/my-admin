export interface CateGoryRequest {
  level: number
  parentId: number | string
}

export interface responseData {
  code: number
  message: string
}

export interface CateGoryResponse {
  level: number
  id: number
  name: string
  parentId: number
}

export interface responseCateGoryData extends responseData {
  data: CateGoryResponse[]
}

export interface attrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export type attrValueList = attrValue[]

export interface AttrInfo {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: attrValueList
}

export interface AttrResponseData extends responseData {
  data: AttrInfo[]
}

export interface AttrRequest {
  categoryId: number | string
}
