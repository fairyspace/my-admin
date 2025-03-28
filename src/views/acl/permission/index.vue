<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { requestAddOrUpdateMenu, requestAllMenu, requestDeleteMenu } from '@/api/acl/menu'
  import {
    Menu,
    MenuList,
    MenuParams,
    MenuResponseData,
    ResponseData
  } from '@/api/acl/menu/type.ts'
  import { ElMessage } from 'element-plus'

  const menuArr = ref<MenuList>([])

  const getHasRoleList = async () => {
    let result: MenuResponseData = await requestAllMenu()
    if (result.code == 200) {
      menuArr.value = result.data
    }
  }

  onMounted(() => {
    getHasRoleList()
  })

  let dialog = ref<boolean>(false)
  let addMenu = (row: Menu) => {
    dialog.value = true
    menuParams.level = row.level + 1
    menuParams.pid = row.id as number
    menuParams.name = ''
    menuParams.code = ''
    menuParams.id = ''
  }

  let updateMenu = (row: Menu) => {
    dialog.value = true
    Object.assign(menuParams, row)
  }

  let save = async () => {
    let result: ResponseData = await requestAddOrUpdateMenu(menuParams)
    if (result.code == 200) {
      dialog.value = false
      ElMessage({
        type: 'success',
        message: menuParams.id ? '修改成功' : '添加成功'
      })
      getHasRoleList()
    }
  }

  let menuParams = reactive<MenuParams>({
    code: '',
    level: 0,
    name: '',
    pid: 0
  })

  let removeMenu = async (id: number) => {
    let result: ResponseData = await requestDeleteMenu(id)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: 'success'
      })

      getHasRoleList()
    }
  }
</script>

<template>
  <div>
    <el-table style="width: 100%; bottom: 1em" row-key="id" border :data="menuArr">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="addMenu(row)"
            :disabled="row.level == 4 ? true : false"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click="updateMenu(row)"
            :disabled="row.level == 1 ? true : false"
            >编辑
          </el-button>
          <el-popconfirm
            :title="`确定要删除${row.name}?`"
            width="15%"
            @confirm="removeMenu(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" :disabled="row.level == 1 ? true : false"
                >删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialog" :title="menuParams.id ? '修改数据' : '添加数据'" width="30%">
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请输出名称" v-model="menuParams.name"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input placeholder="请输出权限" v-model="menuParams.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
