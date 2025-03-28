<script setup lang="ts">
  import { onMounted, reactive, ref, nextTick } from 'vue'
  import {
    MenuList,
    MenuResponseData,
    Records,
    RequestData,
    RoleData,
    RoleResponseData
  } from '@/api/acl/role/type.ts'
  import {
    requestAddOrUpdateRole,
    requestAllPermissions,
    requestAllRole,
    requestDeleteRole,
    requestSetPermission
  } from '@/api/acl/role'
  import useLayoutSettingStore from '@/store/modules/setting.ts'

  import { ElMessage } from 'element-plus'

  let roleRequest: RequestData = reactive({
    pageNo: 1,
    pageSize: 10,
    roleName: ''
  })

  let allRole = ref<Records>([])
  let total = ref<number>(0)

  let dialog = ref<boolean>(false)

  onMounted(() => {
    getHasRoleList()
  })
  const getHasRoleList = async (pager = 1) => {
    roleRequest.pageNo = pager || 1
    let result: RoleResponseData = await requestAllRole(roleRequest)
    if (result.code == 200) {
      allRole.value = result.data.records
      roleRequest.pageNo = result.data.current
      roleRequest.pageSize = result.data.size
      total.value = result.data.total
    }
  }

  let sizeChange = () => {
    getHasRoleList()
  }

  let search = () => {
    getHasRoleList()
  }

  let layoutSettingStore = useLayoutSettingStore()
  let reset = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
  }

  let updateRole = async (row: RoleData) => {
    dialog.value = true
    Object.assign(roleParams, row)
  }

  let roleParams = reactive<RoleData>({
    roleName: ''
  })

  let validateRoleName = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
      callback()
    } else {
      callback(new Error('职位名称至少2位'))
    }
  }
  let rules = {
    roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }]
  }

  let roleForm = ref<any>()
  let save = async () => {
    await roleForm.value.validate()
    //添加或者更新职位
    let result = await requestAddOrUpdateRole(roleParams)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: roleParams.id ? '更新成功' : '添加成功'
      })
      dialog.value = false
      getHasRoleList(roleParams.id ? roleRequest.pageNo : 1)
    }
  }

  let addRole = () => {
    dialog.value = true
    Object.assign(roleParams, { roleName: '' })
    nextTick(() => {
      roleForm.value.clearValidate()
    })
  }

  let drawer = ref<boolean>(false)
  let tree = ref<any>()
  let menuAttr = ref<MenuList>([])
  let selectAttr = ref<number[]>([])
  let setPermission = async (row: RoleData) => {
    drawer.value = true
    Object.assign(roleParams, row)
    let result: MenuResponseData = await requestAllPermissions(roleParams.id as number)

    if (result.code == 200) {
      menuAttr.value = result.data
      selectAttr.value = filterSelectAttr(menuAttr.value, [])
    }
  }

  const defaultProps = {
    children: 'children',
    label: 'name'
  }

  const filterSelectAttr = (allData: MenuList, initAttr: any) => {
    allData.forEach((item) => {
      if (item.select && item.level == 4) {
        initAttr.push(item.id)
      }

      if (item.children && item.children.length > 0) {
        filterSelectAttr(item.children, initAttr)
      }
    })

    return initAttr
  }

  const handler = async () => {
    let roleId = roleParams.id
    let arr = tree.value.getCheckedKeys()
    let halfAttr = tree.value.getHalfCheckedKeys()
    let permissionIds = arr.concat(halfAttr)
    let permissions = {
      roleId: roleId as number,
      permissionIds: permissionIds
    }
    let result = await requestSetPermission(permissions)
    if (result.code == 200) {
      drawer.value = false
      ElMessage({
        type: 'success',
        message: '分配权限成功'
      })
      //自己修改自己需要刷新自己权限
      window.location.reload()
    }
  }

  let removeRole = async (id: number) => {
    let result = await requestDeleteRole(id)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getHasRoleList(allRole.value.length > 1 ? roleRequest.pageNo : roleRequest.pageNo - 1)
    }
  }
</script>

<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="角色名称">
          <el-input placeholder="请输入角色名称" v-model="roleRequest.roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 1em auto">
      <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table border style="margin: 1em auto" :data="allRole">
        <el-table-column type="index" align="center" label="#"></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="职位名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="350em" align="center">
          <template #default="{ row, $index }">
            <el-button type="primary" icon="User" @click="setPermission(row)">分配权限</el-button>
            <el-button type="primary" icon="Edit" @click="updateRole(row)">编辑</el-button>
            <el-popconfirm :title="`确定要删除${row.roleName}吗?`" @confirm="removeRole(row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :background="true"
        v-model:current-page="roleRequest.pageNo"
        v-model:page-size="roleRequest.pageSize"
        layout="prev,pager,next,jumper,->,total,sizes"
        :page-sizes="[5, 10, 15, 20]"
        :total="100"
        @current-change="getHasRoleList"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>

    <el-dialog v-model="dialog" :title="roleParams.id ? '更新职位' : '添加职位'">
      <el-form :model="roleParams" :rules="rules" ref="roleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入职位名称" v-model="roleParams.roleName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-drawer v-model="drawer" title="分配权限">
      <el-tree
        :data="menuAttr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectAttr"
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="handler">确定</el-button>
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
