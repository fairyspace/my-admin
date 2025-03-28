<script setup lang="ts">
import { SpuInfo } from '@/api/product/spu/type.ts'
import { ref, reactive } from 'vue'
import { requestAttrInfoList } from '@/api/product/attr'
import { RequestAddSku, RequestImageList, RequestSaleAttrList } from '@/api/product/spu'
import type { SkuData } from '@/api/product/spu/type.ts'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])

let tableVc = ref<any>()

let attrAttr = ref<any>([])
let saleAttr = ref<any>([])
let ImageAttr = ref<any>([])

let skuParams = reactive<SkuData>({
  categoryId: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [
    {
      attrId: '',
      valueId: ''
    }
  ],
  skuSaleAttrValueList: [
    {
      saleAttrId: '',
      saleAttrValueId: ''
    }
  ],
  skuDefaultImg: ''
})

let initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuInfo) => {
  skuParams.categoryId = spu.category3Id
  skuParams.spuId = spu.id as number
  skuParams.tmId = spu.tmId

  //平台属性
  let resultAttr: any = await requestAttrInfoList({ categoryId: spu.category3Id })
  //销售属性
  let resultSale: any = await RequestSaleAttrList(spu.id as number)
  //图片属性
  let resultImage: any = await RequestImageList(spu.id as number)

  attrAttr.value = resultAttr.data
  saleAttr.value = resultSale.data
  ImageAttr.value = resultImage.data
}

let cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}

let handler = (row: any) => {
  ImageAttr.value.forEach((item:any) => {
    tableVc.value.toggleRowSelection(item, false)
  })
  tableVc.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

let save = async () => {
  skuParams.skuAttrValueList = attrAttr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId
      })
    }
    return prev
  }, [])

  skuParams.skuSaleAttrValueList = saleAttr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return prev
  }, [])

  let result: any = await RequestAddSku(skuParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功'
    })
    //通知父组件切换
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }
}

defineExpose({
  initSkuData
})
</script>
<template>
  <el-form label-width="7em">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input placeholder="sku描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="item in attrAttr" :key="item.id" :label="item.attrName">
          <el-select style="width: 10em" v-model="item.attrIdAndValueId">
            <el-option
              :value="`${item.id}:${attrValue.id}`"
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="item in saleAttr" :key="item.id" :label="item.saleAttrName">
          <el-select style="width: 10em" v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${saleAttrValue.id}`"
              v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称">
      <el-table ref="tableVc" border :data="ImageAttr">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row, $index }">
            <img :src="row.imgUrl" style="width: 5em; height: 5em" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
