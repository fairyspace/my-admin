<script setup lang="ts">
import {
  SaleAttr,
  SaleAttrInfoResponseData,
  SaleAttrList,
  SaleAttrListResponseData,
  saleAttrValue,
  spuImage,
  spuImageList,
  SpuInfo
} from '@/api/product/spu/type.ts'
import {
  addOrUpdateSpu,
  RequestAllSaleAttr,
  RequestAllTrademarkList,
  RequestImageList,
  RequestSaleAttrList
} from '@/api/product/spu'
import { AllTradeMarkList, TradeMark } from '@/api/product/trademark/type.ts'
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])

/*子组件点击取消按钮时候出发父组件事件*/
let cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

let allTradeMark = ref<TradeMark[]>([])
let imageList = ref<spuImage[]>([])
let saleAttrs = ref<SaleAttrList[]>([])
let allSaleAttrs = ref<SaleAttr[]>([])
let spuParams = ref<SpuInfo>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: []
})

let initAddSpuData = async (category3Id: number | string) => {
  /*先把数据清空，因为有时候没保存取消，点进来会有数据污染*/
  Object.assign(spuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: []
  })

  /*清空销售属性，清空照片墙，这两个不是存在spuParams，因为他是保存才搞的*/
  imageList.value = []
  saleAttrs.value = []

  /*清除临时选择框数据*/
  saleAttrIdAndValueName.value = ''

  let tradeMarkRes: AllTradeMarkList = await RequestAllTrademarkList()
  let allSaleAttrRes: SaleAttrInfoResponseData = await RequestAllSaleAttr()
  allTradeMark.value = tradeMarkRes.data
  allSaleAttrs.value = allSaleAttrRes.data
  spuParams.value.category3Id = category3Id
}

let initSpuData = async (row: SpuInfo) => {
  spuParams.value = row
  /*接收到父组件数据，再发请求*/
  let tradeMarkRes: AllTradeMarkList = await RequestAllTrademarkList()
  let imageListRes: spuImageList = await RequestImageList(row.id as number)
  let saleAttrListRes: SaleAttrListResponseData = await RequestSaleAttrList(row.id as number)
  let allSaleAttrRes: SaleAttrInfoResponseData = await RequestAllSaleAttr()

  allTradeMark.value = tradeMarkRes.data
  imageList.value = imageListRes.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  saleAttrs.value = saleAttrListRes.data
  allSaleAttrs.value = allSaleAttrRes.data
}

let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')

/*点击预览按钮时候需要弹出对话框*/
let handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}

let handleRemove = () => {}

let unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttrs.value.filter((item) => {
    return saleAttrs.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectAttr
})

let saleAttrIdAndValueName = ref<string>('')

let addSaleAttr = () => {
  let [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttrList = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  /*追加到销售属性*/
  saleAttrs.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

let toEdit = (row: SaleAttrList) => {
  row.saleAttrValue = ''
  row.flag = true
}

let toLook = (row: SaleAttrList) => {
  //收集
  let { baseSaleAttrId, saleAttrValue } = row

  if (saleAttrValue?.trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }

  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复'
    })
    return
  }

  let newSaleAttrValue: saleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string
  }

  row.spuSaleAttrValueList.push(newSaleAttrValue)

  row.flag = false
}

let toClose = (row: SaleAttrList, index:number) => {
  row.spuSaleAttrValueList.splice(index, 1)
}

let save = async () => {
  //整理照片墙数据
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      //新增图片取自接口返回｜｜之前就存在的图片
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  //整理销售属性字段
  spuParams.value.spuSaleAttrList = saleAttrs.value

  let result = await addOrUpdateSpu(spuParams.value)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '保存成功'
    })
    /*更新成功需要通知父组件*/
    $emit('changeScene', { flag: 0, params: 'update' })
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '保存失败'
    })
  }
}

defineExpose({ initSpuData, initAddSpuData })
</script>

<template>
  <el-form label-width="10em">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU仓库">
      <el-select style="width: 15em" v-model="spuParams.tmId">
        <el-option
          :label="item.tmName"
          v-for="(item, index) in allTradeMark"
          :key="item.id"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imageList"
        action="/api/admin/product/fileUpload?apipost_id=3b3a8e757f100f"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        style="width: 15em"
        :placeholder="unSelectSaleAttr.length > 0 ? `还未选择有${unSelectSaleAttr.length}个` : `无`"
      >
        <el-option
          :value="`${item.id}:${item.name}`"
          v-for="(item, index) in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        @click="addSaleAttr"
        :disabled="saleAttrIdAndValueName ? false : true"
        style="margin-left: 1em"
        type="primary"
        size="default"
        icon="Plus"
        >添加属性值
      </el-button>
      <el-table border style="margin: 1em auto" :data="saleAttrs">
        <el-table-column label="序号" type="index" align="center" width="80em"></el-table-column>
        <el-table-column label="销售属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template #default="{ row, $index }">
            <el-tag
              @close="toClose(row, index)"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              class="mx-1"
              closable
              style="margin: 0 0.5em"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              @blur="toLook(row)"
              v-if="row.flag == true"
              placeholder="请输入属性"
              v-model="row.saleAttrValue"
              style="width: 10em"
            ></el-input>
            <el-button
              v-else
              @click="toEdit(row)"
              style="margin: 0 1em"
              type="primary"
              size="small"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ $index }">
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="saleAttrs.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="saleAttrs && saleAttrs.length > 0 ? false : true"
        @click="save"
        >保存</el-button
      >
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
