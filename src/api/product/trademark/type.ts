export interface pageFrom {
  pageSize: number
  pageNum: number
}

export interface ResponseData {
  code: number
  message: string
}

export interface TradeMark {
  //已经有数据是有ID的，但是新增时候是没有的，这时候使用?:
  id?: number
  tmName: string
  logoUrl: string
}

export type Records = TradeMark[]

export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface AllTradeMarkList extends ResponseData {
  data: TradeMark[]
}
