export interface RequestData {
  pageNo: number
  pageSize: number
}

export interface ResponseData {
  code: number
  message: string
}

export interface Attr {
  id?: number
  valueName?: string
  attrId: number | string
  valueId: number | string
}

export interface SaleAttr {
  id?: number
  saleAttrValueName?: string
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  categoryId?: string | number
  spuId?: number | string
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: number | string
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: SaleAttr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number,
  skuImageList?:Image[]
}

export interface Image{
  id:number,
  imgUrl:string,
  imgName:string
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    pages: number
  }
}
