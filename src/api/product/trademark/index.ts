import request from '@/utils/request.ts'
import { pageFrom, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type.ts'
enum API {
  TRADEMARK = '/admin/product/baseTrademark?apipost_id=39832bf6bf1003',
  ADDTRADEMARK = '/admin/product/baseTrademark/save?apipost_id=3b37fb6ebf100d',
  UPDATETRADEMARK = '/admin/product/baseTrademark/update?apipost_id=3b3a5cd23f100e',
  DELETETRADEMARK = '/admin/product/baseTrademark/remove?apipost_id=548eb91bf1001'
}

export const requestTradeMark = (data: pageFrom) =>
  request.post<any, TradeMarkResponseData>(API.TRADEMARK, data)

export const addOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK, data)
  }
}

export const requestDeleteTradeMark = (id: number) => {
  const url = API.DELETETRADEMARK + '&id=' + id
  return request.delete<any, any>(url)
}
