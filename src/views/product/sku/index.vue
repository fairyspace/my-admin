<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue'
  import {
    requestDeleteSku,
    requestSaleSku,
    requestSkuInfo,
    requestSkuList
  } from '@/api/product/sku'
  import { RequestData, SkuResponseData } from '@/api/product/sku/type.ts'
  import { SkuData } from '@/api/product/sku/type.ts'
  import { ElMessage } from 'element-plus'

  let comRequest: RequestData = reactive({
    pageNo: 1,
    pageSize: 3
  })

  let skuAttr = ref<SkuData[]>([])
  let total = ref<number>(0)
  let skuInfo = ref<SkuData>({})

  let updateSale = async (row: SkuData) => {
    if (row.isSale == 1) {
      let result = await requestSaleSku(row.id as number, 0)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '下架成功'
        })
        row.isSale = 0
      }
    } else {
      let result = await requestSaleSku(row.id as number, 1)
      if (result.code == 200) {
        ElMessage({
          type: 'success',
          message: '上架成功'
        })
        row.isSale = 1
      }
    }
  }

  onMounted(() => {
    getHasSkuList()
  })

  const getHasSkuList = async (pager = 1) => {
    comRequest.pageNo = pager
    let result = await requestSkuList(comRequest)
    if (result.code == 200) {
      total.value = result.data.total
      skuAttr.value = result.data.records
    }
  }

  const sizeChange = async (size: number) => {
    comRequest.pageSize = size
    let result = await requestSkuList(comRequest)
    if (result.code == 200) {
      total.value = result.data.total
      skuAttr.value = result.data.records
    }
  }

  let drawer = ref<boolean>(false)

  let findSku = async (row: SkuData) => {
    drawer.value = true
    let result = await requestSkuInfo(row.id as number)
    skuInfo.value = result.data
  }

  let removeSku = async (id: number) => {
    let result: any = await requestDeleteSku(id)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })

      getHasSkuList(skuAttr.value.length > 1 ? comRequest.pageNo : comRequest.pageNo - 1)
    } else {
      ElMessage({
        type: 'error',
        message: 'sku删除失败'
      })
    }
  }
</script>

<template>
  <el-card>
    <el-table border :data="skuAttr">
      <el-table-column label="序号" type="index" align="center" width="80em"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        align="center"
        width="160em"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        align="center"
        width="160em"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" align="center" width="160em">
        <template #default="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 10em; height: 10em" />
        </template>
      </el-table-column>
      <el-table-column label="重量" align="center" width="160em" prop="weight"></el-table-column>
      <el-table-column label="价格" align="center" width="160em" prop="price"></el-table-column>
      <el-table-column label="操作" align="center" width="250em" fixed="right">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}么?`"
            width="15em"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin: 1em auto"
      v-model:current-page="comRequest.pageNo"
      v-model:page-size="comRequest.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev,pager,next,jumper,->,total,sizes"
      :total="total"
      @current-change="getHasSkuList"
      @size-change="sizeChange"
    ></el-pagination>

    <el-drawer v-model="drawer">
      <template #header>
        <div>查看商品的详情</div>
      </template>
      <template #default>
        <el-row style="margin: 0.5em auto">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 0.5em auto">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 0.5em auto">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 0.5em auto">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: auto 0.5em"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>

        <el-row style="margin: 0.5em auto">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: auto 0.5em"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrValueName }}</el-tag
            >
          </el-col>
        </el-row>

        <el-row style="margin: 0.5em auto">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<style scoped lang="scss">
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>
