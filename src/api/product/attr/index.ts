import request from '@/utils/request.ts'
import {
  AttrInfo,
  AttrRequest,
  AttrResponseData,
  CateGoryRequest,
  responseCateGoryData,
  responseData
} from '@/api/product/attr/type.ts'

enum API {
  URL = '/admin/product/getCateGory?apipost_id=6731ef37f1007',
  INFO_URL = '/admin/product/attrInfoList?apipost_id=80773457f100e',
  SAVE_URL = '/admin/product/saveAttrInfo?apipost_id=bf0c874bf1005',
  DELETE_URL = '/admin/product/deleteAttr?apipost_id=e55e5727f1003'
}

export const requestCategory = (data: CateGoryRequest) =>
  request.post<any, responseCateGoryData>(API.URL, data)

export const requestAttrInfoList = (data: AttrRequest) =>
  request.post<any, AttrResponseData>(API.INFO_URL, data)
export const addOrUpdateAttr = (data: AttrInfo) => request.post<any, any>(API.SAVE_URL, data)

export const requestDeleteAttr = (id: number) =>
  request.delete<any, responseData>(API.DELETE_URL + '&id=' + id)
