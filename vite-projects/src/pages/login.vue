<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserstore } from '../pinia/store'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserstore()
const formRef = ref()
const form = ref({ username: '', password: '' })

const onLogin = async () => {
  if(!form.value.username||!form.value.password){
    ElMessage.warning('用户名和密码不能为空')
    return
  }
  const result=userStore.login(form.value.username,form.value.password)
  if(result.success){
    ElMessage.success('登录成功')
    router.push('/home')
  }else{
    ElMessage.error(result.message)
  }
}
</script>
<template>
  <div class="login">
    <el-card style="width:400px;margin:50px auto">
        <template #header>
            <div class="title">登录</div>
        </template>
      <el-form :model="form" ref="formRef">
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.push('/resetpassword')">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style scoped>
.title{
    padding: 12px 20px;
    border-bottom: 1px solid #ebeef5;
    font-size: 25px;
    font-weight: bold;
    color: #303133;
}
</style>
