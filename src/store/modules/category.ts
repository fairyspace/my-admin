import { defineStore } from 'pinia'
import { requestCategory } from '@/api/product/attr'
import { CateGoryRequest, responseCateGoryData } from '@/api/product/attr/type.ts'
import { CateGoryState } from '@/store/modules/types/types.ts'

const useCateGoryStore = defineStore('CateGoryStore', {
  state: (): CateGoryState => {
    return {
      attrList1: [],
      attrList2: [],
      attrList3: [],
      attr1Id: '',
      attr2Id: '',
      attr3Id: ''
    }
  },
  actions: {
    async getCateGory(data: CateGoryRequest) {
      /*获取一级分类的数组*/
      //挂载完毕加载数据
      const result: responseCateGoryData = await requestCategory(data)
      if (result.code == 200) {
        if (data.level == 1) this.attrList1 = result.data
        if (data.level == 2) this.attrList2 = result.data
        if (data.level == 3) this.attrList3 = result.data
      }
    }
  },
  getters: {}
})

export default useCateGoryStore
