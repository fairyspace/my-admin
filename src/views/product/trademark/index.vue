<template>
  <div>
    <el-card>
      <el-button type="primary" size="default" icon="Plus" @click="addTradeMark" v-has="`user:add`"
        >添加品牌
      </el-button>

      <!--borad增加竖的边框-->
      <el-table border style="margin: 1em 0" :data="tradeMarkAttr">
        <!--label是显示列的标题    -->
        <el-table-column label="序号" width="60em" align="center" type="index"></el-table-column>
        <el-table-column
          label="品牌名称"
          prop="tmName"
          align="center"
          width="120em"
        ></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #default="{ row }">
            <img :src="row.logoUrl" style="width: 3em; height: 3em; margin: auto" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.tmName}`"
              width="10em"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="changePageNum"
        @size-change="changePageSize"
        v-model:current-page="data.pageNum"
        v-model:page-size="data.pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="dataParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="8em" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="dataParams.tmName"></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          label-width="8em"
          prop="logoUrl"
          v-model="dataParams.logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload?apipost_id=3b3a8e757f100f"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="dataParams.logoUrl" :src="dataParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import {
  addOrUpdateTradeMark,
  requestDeleteTradeMark,
  requestTradeMark
} from '@/api/product/trademark'
import {
  pageFrom,
  Records,
  TradeMark,
  TradeMarkResponseData
} from '@/api/product/trademark/type.ts'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let total = ref<number>(3)
let tradeMarkAttr = ref<Records>([])
let dialogVisible = ref<boolean>(false)

let dialogTitle = ref<string>('')

let formRef = ref()

const dataParams: TradeMark = reactive({
  tmName: '',
  logoUrl: ''
})

const data: pageFrom = reactive({
  pageNum: 1,
  pageSize: 3
})

const getTrademarks = async () => {
  let result: TradeMarkResponseData = await requestTradeMark(data)
  if (result.code == 200) {
    total.value = result.data.total
    tradeMarkAttr.value = result.data.records
  }
}

const changePageNum = () => {
  //当前页码发生变化时候再次请求，但是不需要主动赋值，因为变化就绑定了值，传那个值的地址就行
  getTrademarks()
}

const changePageSize = () => {
  //当前页码发生变化时候再次请求，但是不需要主动赋值，因为变化就绑定了值，传那个值的地址就行
  data.pageNum = 1
  getTrademarks()
}

const addTradeMark = () => {
  dialogTitle.value = '添加数据'
  dataParams.logoUrl = ''
  dataParams.tmName = ''
  dataParams.id = undefined
  dialogVisible.value = true

  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

const updateTradeMark = (row: TradeMark) => {
  dataParams.logoUrl = row.logoUrl
  dataParams.tmName = row.tmName
  dataParams.id = row.id
  dialogTitle.value = '修改数据'
  dialogVisible.value = true
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}

const cancel = () => {
  dialogVisible.value = false
}
const confirm = async () => {
  await formRef.value.validate()

  let result = await addOrUpdateTradeMark(dataParams)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: dataParams.id ? '修改成功' : '添加成功'
    })

    /*再次发送请求,新增时候刷新数据列表，修改不用刷新*/
    if (!dataParams.id) getTrademarks()
  } else {
    dialogVisible.value = false
    ElMessage({
      type: 'error',
      message: dataParams.id ? '修改失败' : '添加失败'
    })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  dataParams.logoUrl = response.data
  formRef.value.clearValidate()
}

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length > 2) {
    callBack()
  } else {
    callBack(new Error('输入的值过短'))
  }
}

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (!value) {
    callBack(new Error('图片需要上传'))
  } else {
    callBack()
  }
}

const rules = {
  tmName: [
    {
      //required必须要校验，
      //校验触发的时机是blur
      //校验规则是什么
      validator: validatorTmName,
      trigger: 'blur',
      required: true
    }
  ],
  logoUrl: [
    {
      //required必须要校验，
      //校验触发的时机是blur
      //校验规则是什么
      validator: validatorLogoUrl,
      trigger: 'change',
      required: true
    }
  ]
}

const removeTradeMark = async (id: number) => {
  let result = await requestDeleteTradeMark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    /*删除后刷新页面*/
    if (tradeMarkAttr.value.length == 1) {
      data.pageNum = data.pageNum - 1 ? data.pageNum - 1 : 1
    }

    getTrademarks()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

/*页面加载时候加载数据*/
onMounted(() => {
  getTrademarks()
})
</script>

<style scoped lang="scss">
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>
