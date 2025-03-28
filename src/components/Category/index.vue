<script setup lang="ts">
  import useCateGoryStore from '@/store/modules/category.ts'
  import { onMounted, onBeforeUnmount } from 'vue'
  let cateGoryStore = useCateGoryStore()

  defineProps(['scene'])

  let choose = (data: number, id: number | string) => {
    /*通知仓库获取二级仓库地址*/
    /*当切换时候，需要把历史数据清理了,请求点击一级分类会导致二级分类加载，此时清空二级三级数据*/
    if (data == 2) {
      cateGoryStore.attr2Id = ''
      cateGoryStore.attr3Id = ''
    }
    if (data == 3) {
      cateGoryStore.attr3Id = ''
    }
    cateGoryStore.getCateGory({ level: data, parentId: id })
  }

  onMounted(async () => {
    getCateGory()
  })

  const getCateGory = () => {
    cateGoryStore.getCateGory({ level: 1, parentId: '' })
  }

  onBeforeUnmount(() => {
    cateGoryStore.$reset()
  })
</script>

<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form-inline">
        <el-form-item label="一级分类">
          <el-select
            :disabled="scene == 0 ? false : true"
            v-model="cateGoryStore.attr1Id"
            placeholder="请选择"
            @change="choose(2, cateGoryStore.attr1Id)"
          >
            <el-option
              v-for="item in cateGoryStore.attrList1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select
            :disabled="scene == 0 ? false : true"
            placeholder="请选择"
            @change="choose(3, cateGoryStore.attr2Id)"
            v-model="cateGoryStore.attr2Id"
          >
            <el-option
              v-for="item in cateGoryStore.attrList2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="三级分类">
          <el-select
            :disabled="scene == 0 ? false : true"
            placeholder="请选择"
            v-model="cateGoryStore.attr3Id"
          >
            <el-option
              v-for="item in cateGoryStore.attrList3"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
  .form-inline .el-input {
    --el-input-width: 220px;
  }

  .form-inline .el-select {
    --el-select-width: 220px;
  }
</style>
