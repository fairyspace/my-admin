export interface RequestInfoParams {
  pageNum: number
  pageSize: number
  category3Id: number
}

export interface responseData {
  code: number
  message: string
}

export interface SpuInfo {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleAttrList[]
  spuImageList: null | spuImage[]
}

export type SpuInfoList = SpuInfo[]

export interface ResponseSpuInfo extends responseData {
  data: {
    records: SpuInfoList
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface spuImage {
  id?: number
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

export interface spuImageList extends responseData {
  data: spuImage[]
}

export interface saleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

export interface SaleAttrList {
  id?: number
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: saleAttrValue[]
  flag?: boolean
  saleAttrValue?: string
}

export interface SaleAttrListResponseData extends responseData {
  data: SaleAttrList[]
}

export interface SaleAttr {
  id?: number,
  name?: string
}

export interface SaleAttrInfoResponseData extends responseData {
  data: SaleAttr[]
}

export interface SkuInfoData extends responseData {
  data: SkuData[]
}

export interface Attr {
  attrId: number | string
  valueId: number | string
}

export interface SaleAttr {
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  categoryId: string | number
  spuId: number | string
  tmId: string | number
  skuName: string
  price: string | number
  weight: number | string
  skuDesc: string
  skuAttrValueList: Attr[]
  skuSaleAttrValueList: SaleAttr[]
  skuDefaultImg: string
}
