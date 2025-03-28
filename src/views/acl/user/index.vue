<script setup lang="ts">
  import { nextTick, onMounted, reactive, ref } from 'vue'
  import { Records, User, UserRequest, UserResponseData } from '@/api/acl/user/type.ts'
  import {
    requestAddOrUpdateUser,
    requestDeleteUser,
    requestSetRole,
    requestUserList,
    requestUserRole
  } from '@/api/acl/user'
  import { ElMessage } from 'element-plus'
  import { AllRole, RoleResponseData, SetRoleData } from '@/api/user/type.ts'
  import useLayoutSettingStore from '@/store/modules/setting.ts'

  let formVc = ref<any>()
  let userRequest: UserRequest = reactive({
    pageNo: 1,
    pageSize: 10,
    username: ''
  })

  let total = ref<number>(0)
  let userAttr = ref<Records>([])
  let drawer = ref<boolean>(false)
  let drawer1 = ref<boolean>(false)
  let allRole = ref<AllRole>([])
  let userRole = ref<AllRole>([])

  let userParams = reactive<User>({
    username: '',
    name: '',
    password: ''
  })

  let getHasUserList = async (pager = 1) => {
    pager = pager || 1
    userRequest.pageNo = pager
    let result: UserResponseData = await requestUserList(userRequest)
    if (result.code == 200) {
      total.value = result.data.total
      userAttr.value = result.data.records
    }
  }

  let sizeChange = async () => {
    getHasUserList()
  }

  let addUser = () => {
    Object.assign(userParams, {
      id: '',
      username: '',
      name: '',
      password: ''
    })
    drawer.value = true

    nextTick(() => {
      formVc.value.clearValidate()
    })
  }

  let updateUser = (row: User) => {
    drawer.value = true
    Object.assign(userParams, row)
    //formVc.value.clearValidate()
  }

  onMounted(() => {
    getHasUserList()
  })

  let save = async () => {
    await formVc.value.validate()
    let result = await requestAddOrUpdateUser(userParams)
    if (result.code == 200) {
      drawer.value = false
      ElMessage({
        type: 'success',
        message: userParams.id ? '更新成功' : '添加成功'
      })

      getHasUserList(userParams.id ? userRequest.pageNo : 1)
      window.location.reload()
    } else {
      drawer.value = false
      ElMessage({
        type: 'error',
        message: userParams.id ? '更新失败' : '添加失败'
      })
    }
  }

  let cancel = () => {
    drawer.value = false
  }

  let checkUserName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length > 5) {
      callBack()
    } else {
      callBack(new Error('用户名字需要5位数'))
    }
  }

  let checkName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length > 5) {
      callBack()
    } else {
      callBack(new Error('用户昵称需要5位数'))
    }
  }

  let checkPassword = (rule: any, value: any, callBack: any) => {
    if (value.trim().length > 5) {
      callBack()
    } else {
      callBack(new Error('密码需要5位数'))
    }
  }

  let rules = {
    username: [{ required: true, trigger: 'blur', validator: checkUserName }],
    name: [{ required: true, trigger: 'blur', validator: checkName }],
    password: [{ required: true, trigger: 'blur', validator: checkPassword }]
  }

  let setRole = async (row: User) => {
    Object.assign(userParams, row)
    let result: RoleResponseData = await requestUserRole(row.id as number)
    if (result.code == 200) {
      allRole.value = result.data.allRoleList
      userRole.value = result.data.assignRoles
      drawer1.value = true
    }
  }

  let checkAll = ref<boolean>(false)
  let indeterminate = ref<boolean>(true)

  let allChange = (val: boolean) => {
    indeterminate.value = false
    userRole.value = val ? allRole.value : []
  }

  let singleChange = (val: string[]) => {
    checkAll.value = val.length === allRole.value.length
    indeterminate.value = !checkAll.value
  }

  let confirmSetRole = async () => {
    let data: SetRoleData = {
      userId: userParams.id as number,
      roleIdList: userRole.value.map((item) => {
        return item.id as number
      })
    }

    let result = await requestSetRole(data)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: result.message
      })
      getHasUserList()
    } else {
      ElMessage({
        type: 'error',
        message: result.message
      })
    }
    drawer1.value = false
  }
  let cancelSetRole = () => {
    drawer1.value = false
  }

  let deleteUser = async (userIds: number[]) => {
    let result = await requestDeleteUser(userIds)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getHasUserList(userAttr.value.length > 1 ? userRequest.pageNo : userRequest.pageNo - 1)
    }
  }

  let selectIdAttr = ref<number[]>([])
  let selectChange = (changeData: any) => {
    selectIdAttr.value = changeData.map((item: any) => {
      return item.id
    })
  }

  let search = () => {
    getHasUserList()
  }

  let layoutSettingStore = useLayoutSettingStore()

  let reset = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
  }
</script>
<template>
  <div>
    <el-card>
      <el-form :inline="true" class="user_form">
        <el-form-item label="用户名:">
          <el-input placeholder="输入搜索用户名" v-model="userRequest.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="search">搜索</el-button>
          <el-button type="primary" size="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 1em auto">
      <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
      <el-button
        type="primary"
        size="default"
        :disabled="selectIdAttr.length ? false : true"
        @click="deleteUser(selectIdAttr)"
        >批量删除</el-button
      >
      <el-table @selection-change="selectChange" border style="margin: 1em auto" :data="userAttr">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
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
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300em" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="User" size="small" @click="setRole(row)"
              >分配角色</el-button
            >
            <el-button type="primary" icon="Edit" size="small" @click="updateUser(row)"
              >编辑</el-button
            >

            <el-popconfirm :title="`确定删除${row.username}吗`" @confirm="deleteUser([row.id])">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :background="true"
        v-model:current-page="userRequest.pageNo"
        v-model:page-size="userRequest.pageSize"
        layout="prev,pager,next,jumper,->,total,sizes"
        :page-sizes="[5, 10, 15, 20]"
        :total="100"
        @current-change="getHasUserList"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>

    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formVc">
          <el-form-item label="用户名字" prop="username">
            <el-input placeholder="请输入名字" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="userParams.id ? false : true">
            <el-input placeholder="请输入用户密码" v-model="userParams.password"> </el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </template>
    </el-drawer>

    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="allChange"
              >全选</el-checkbox
            >
            <el-checkbox-group @change="singleChange" v-model="userRole">
              <el-checkbox v-for="(item, index) in allRole" :key="index" :label="item">{{
                item.roleName
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelSetRole" type="primary">取消</el-button>
          <el-button @click="confirmSetRole" type="primary">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
  .user_form {
    display: flex;
    justify-content: space-between;
  }
</style>
