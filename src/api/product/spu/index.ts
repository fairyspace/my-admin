import request from '@/utils/request.ts'
import {
  RequestInfoParams,
  ResponseSpuInfo,
  SaleAttrInfoResponseData,
  SaleAttrListResponseData,
  SkuData,
  SkuInfoData,
  spuImageList,
  SpuInfo
} from '@/api/product/spu/type.ts'
import { AllTradeMarkList } from '@/api/product/trademark/type.ts'

enum API {
  INFO_LIST = '/admin/product/spuInfo?apipost_id=f6b06697f1004',
  ALL_TRADEMARK = '/admin/product/baseTrademark/getTrademarkList?apipost_id=14e41b14ff1003',
  SPU_IMAGE_LIST = '/admin/product/spuImageList?apipost_id=14eae5db3f100b',
  SPU_SALEATTR_LIST = '/admin/product/spuSaleAttrList?apipost_id=14f6869e3f1012',
  ALL_SALEATTR = '/admin/product/baseSaleAttrList?apipost_id=14fd91f0bf1019',
  ADD_SPU = '/admin/product/saveSpuInfo?apipost_id=2933ecf53f1004',
  UPDATE_SPU = '/admin/product/updateSpuInfo?apipost_id=2935add7bf1007',
  SAVE_SKUINFO = '/admin/product/saveSkuInfo?apipost_id=1e16359b7c003',
  SKUINFO = '/admin/product/findBySpuId?apipost_id=3392e1d77c007',
  REMOVEURL = '/admin/product/deleteSpu?apipost_id=473081d77c00e'
}

export const RequestSpuInfoList = (data: RequestInfoParams) =>
  request.post<any, ResponseSpuInfo>(API.INFO_LIST, data)

export const RequestAllTrademarkList = () => request.get<any, AllTradeMarkList>(API.ALL_TRADEMARK)

export const RequestImageList = (spuId: number) =>
  request.get<any, spuImageList>(API.SPU_IMAGE_LIST + '&spuId=' + spuId)

export const RequestSaleAttrList = (spuId: number) =>
  request.get<any, SaleAttrListResponseData>(API.SPU_SALEATTR_LIST + '&spuId=' + spuId)

export const RequestAllSaleAttr = () => request.get<any, SaleAttrInfoResponseData>(API.ALL_SALEATTR)

export const addOrUpdateSpu = (data: SpuInfo) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU, data)
  } else {
    return request.post<any, any>(API.ADD_SPU, data)
  }
}

export const RequestAddSku = (data: SkuData) => request.post<any, any>(API.SAVE_SKUINFO, data)

export const RequestSkuInfo = (spuId: number) =>
  request.get<any, SkuInfoData>(API.SKUINFO + '&spuId=' + spuId)

export const RequestRemoveSpu = (spuId: number) =>
  request.delete<any, any>(API.REMOVEURL + '&spuId=' + spuId)
