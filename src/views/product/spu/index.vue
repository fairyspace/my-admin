<template>
  <div>
    <category :scene></category>
    <el-card style="margin: 1em auto">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          @click="addSpu"
          size="default"
          icon="Plus"
          :disabled="cateGoryStore.attr3Id ? false : true"
          >添加
        </el-button>
        <el-table style="margin: 1em auto" border :data="records">
          <el-table-column label="序号" type="index" align="center" width="80rem"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <!--overflow超出值省略-->
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
                @click="findSku(row)"
              ></el-button>

              <el-popconfirm
                :title="`确定要删除${row.spuName}么`"
                width="15em"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getSpuList"
          @size-change="getSpuList"
          layout="prev,pager,next,jumper,->,sizes,total"
          :total="total"
          :background="true"
          v-model:current-page="requestSpuListParams.pageNum"
          v-model:page-size="requestSpuListParams.pageSize"
          :page-sizes="[3, 5, 7, 9]"
        >
        </el-pagination>
      </div>
      <spu-form v-show="scene == 1" @changeScene="changeScene" ref="spuVc"></spu-form>
      <sku-form v-show="scene == 2" @changeScene="changeScene" ref="skuVc"></sku-form>

      <el-dialog title="SKU列表" v-model="show" width="50em">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{ row, $index }">
              <img :src="row.skuDefaultImg" style="width: 10em; height: 10em" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, watch, onBeforeUnmount } from 'vue'
  import useCateGoryStore from '@/store/modules/category.ts'
  import { RequestRemoveSpu, RequestSkuInfo, RequestSpuInfoList } from '@/api/product/spu'
  import {
    RequestInfoParams,
    ResponseSpuInfo,
    SkuData,
    SkuInfoData,
    SpuInfo
  } from '@/api/product/spu/type.ts'
  import SpuForm from '@/views/product/spu/spuForm.vue'
  import SkuForm from '@/views/product/spu/skuForm.vue'
  import { ElMessage } from 'element-plus'

  let scene = ref<number>(0)

  let records = ref<SpuInfo[]>([])

  let requestSpuListParams: RequestInfoParams = reactive({
    pageNum: 1,
    pageSize: 3,
    category3Id: 1
  })

  let total = ref<number>(0)
  let spuVc = ref<any>()
  let skuVc = ref<any>()

  let skuArr = ref<SkuData[]>()
  let show = ref<boolean>(false)

  const findSku = async (row: SpuInfo) => {
    let result: SkuInfoData = await RequestSkuInfo(row.id as number)
    skuArr.value = result.data
    show.value = true
  }

  let cateGoryStore = useCateGoryStore()

  watch(
    () => cateGoryStore.attr3Id,
    () => {
      if (!cateGoryStore.attr3Id) return
      getSpuList()
    }
  )

  const getSpuList = async (pager = 1) => {
    requestSpuListParams.pageNum = pager == 0 ? 1 : pager
    let response: ResponseSpuInfo = await RequestSpuInfoList(requestSpuListParams)
    if (response.code == 200) {
      records.value = response.data.records
      total.value = response.data.total
    }
  }

  const addSpu = () => {
    scene.value = 1
    spuVc.value.initAddSpuData(cateGoryStore.attr3Id)
  }

  const changeScene = (obj: any) => {
    scene.value = obj.flag
    if (obj.params == 'update') {
      getSpuList(requestSpuListParams.pageNum)
    } else {
      getSpuList()
    }
  }

  const updateSpu = (row: SpuInfo) => {
    scene.value = 1
    spuVc.value.initSpuData(row)
  }

  let addSku = (row: SpuInfo) => {
    scene.value = 2
    skuVc.value.initSkuData(cateGoryStore.attr1Id, cateGoryStore.attr2Id, row)
  }

  let deleteSpu = async (row: SpuInfo) => {
    let result = await RequestRemoveSpu(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })

      getSpuList(
        records.value.length > 1 ? requestSpuListParams.pageNum : requestSpuListParams.pageNum - 1
      )
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
  }

  onBeforeUnmount(() => {
    cateGoryStore.$reset()
  })
</script>
<style scoped lang="scss"></style>
