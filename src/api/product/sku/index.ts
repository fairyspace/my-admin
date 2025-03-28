import request from '@/utils/request.ts'
import { RequestData, SkuData, SkuResponseData } from '@/api/product/sku/type.ts'

enum API {
  SKU_URL = '/admin/product/skuList?apipost_id=6f3e15df7c007',
  SAVE_URL = '/admin/product/onSale?apipost_id=7331666f7c00c',
  INFO_URL = '/admin/product/getSkuById?apipost_id=bf5e0b237c003',
  DELETESKU_URL = '/admin/product/deleteSku?apipost_id=bf5e0b237c003'
}

export const requestSkuList = (data: RequestData) =>
  request.post<string, SkuResponseData>(API.SKU_URL, data)

export const requestSaleSku = (skuId: number, state: number) =>
  request.get<any, any>(API.SAVE_URL + '&skuId=' + skuId + '&state=' + state)

export const requestSkuInfo = (Id: number) =>
  request.get<string, any>(API.INFO_URL + '&Id=' + Id)

export const requestDeleteSku = (Id: number) =>
  request.delete<string, any>(API.DELETESKU_URL + '&Id=' + Id)
