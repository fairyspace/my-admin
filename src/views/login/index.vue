<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/times.ts'

let loginForm = reactive({ username: '', password: '' })
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loading = ref(false)

let loginFormEntity = ref()

const login = async () => {
  let result = await loginFormEntity.value.validate()
  loading.value = true
  try {
    /*保证登陆成功，跳转到首页*/
    await userStore.userLogin(loginForm)
    let redirect = ($route.query.redirect as string) || '/'
    await $router.push({ path: redirect })
    ElNotification({
      type: 'success',
      message: '登陆成功',
      title: `HI,${getTime()}好`
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  } finally {
    loading.value = false
  }
}

let validatorUserName = (rule: any, value: any, callback: any) => {
  //value是表单元素文本内容
  //calback符合条件就放行，不符合条件就注入error
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度至少为5位'))
  }
}
let validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('密码长度至少为5位'))
  }
}
const rules = {
  username: [
    {
      required: true,
      trigger: 'change',
      validator: validatorUserName
    }
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatorPassword
    }
  ]
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginFormEntity">
          <h1>Hello</h1>
          <h2>My-Admin</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
      position: relative;
      width: 80%;
      max-width: 25rem;
      top: 30vh;
      background: url('@/assets/images/login_form.png') no-repeat;
      background-size: cover;
      padding: 3em;
    }

    h1 {
      color: white;
      font-size: 2em;
    }

    h2 {
      color: white;
      font-size: 1em;
      margin: 1em 0;
    }

    .login_btn {
      width: 100%;
      background: rgba(78, 162, 243, 0.85);
    }
  }
</style>
