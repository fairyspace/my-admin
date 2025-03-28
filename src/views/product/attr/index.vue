<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import useCateGoryStore from '@/store/modules/category.ts'
import { addOrUpdateAttr, requestAttrInfoList, requestDeleteAttr } from '@/api/product/attr'
import { AttrInfo, attrValue, responseData } from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'

let cateGoryStore = useCateGoryStore()

let attrList = ref<AttrInfo[]>([])
let inputAttr = ref<any>([])

let scene = ref<number>(0)

let attrParams = reactive<AttrInfo>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})

watch(
  () => cateGoryStore.attr3Id,
  async () => {
    //当监听到变化，需要清空数组
    attrList.value = []
    //当切换按钮，导致三级分类没有数据时候不需要发请求
    if (!cateGoryStore.attr3Id) return
    //仓库对象解构ID
    getAttrInfoList()
  }
)

const getAttrInfoList = async () => {
  let result = await requestAttrInfoList({ categoryId: cateGoryStore.attr3Id })
  if (result.code == 200) {
    attrList.value = result.data
  }
}

const addAttr = () => {
  /*添加时候重制表单数据*/
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
  })
  scene.value = 1
  attrParams.categoryId = cateGoryStore.attr3Id
}

const updateAttr = (row: AttrInfo) => {
  scene.value = 1
  /*将已经有的属性对象给收集对象*/
  /*此处需要注意，当赋值之后又取消，会发现list展示界面数据会变化，需要深度拷贝去除同一个地址*/
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })

  nextTick(() => {
    inputAttr.value[attrParams.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  let result = await addOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '新增成功'
    })
    getAttrInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '新增失败'
    })
  }
}

const toView = (row: attrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }

  let repeat = attrParams.attrValueList.find((item) => {
    //去除自我的查重
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
  }

  row.flag = false
}

const toEdit = (row: attrValue, $index: number) => {
  row.flag = true

  nextTick(() => {
    inputAttr.value[$index].focus()
  })
}

const deleteAttr = async (id: number) => {
  let result: responseData = await requestDeleteAttr(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getAttrInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
</script>

<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 1em auto">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="cateGoryStore.attr3Id ? false : true"
          @click="addAttr"
          >添加属性
        </el-button>
        <el-table border style="margin: 1em auto" :data="attrList">
          <el-table-column label="序号" type="index" align="center" width="80em"></el-table-column>
          <el-table-column
            label="属性名"
            align="center"
            width="100em"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row }">
              <el-tag style="margin: 0.5em" v-for="item in row.attrValueList" :key="item.id"
                >{{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200em">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)" />

              <el-popconfirm
                :title="`你确定删除${row.attrName}`"
                @confirm="deleteAttr(row.id)"
                width="10em"
              >
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性的名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
          >添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 1em auto" :data="attrParams.attrValueList">
          <el-table-column width="80em" type="index" align="center" label="序号"></el-table-column>
          <el-table-column label="属性值">
            <!--row是当前属性值对象-->
            <template #default="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputAttr[$index] = vc)"
                v-if="row.flag"
                @blur="toView(row, $index)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParams.attrValueList.length == 0"
          >保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
