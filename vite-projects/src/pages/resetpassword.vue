<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserstore } from '../pinia/store'
import { ElMessage } from 'element-plus'

const router=useRouter()
const userStore = useUserstore()
const form = ref({ oldpwd: '',newpwd:'' })

const save = () => {
  if(!form.value.oldpwd||!form.value.newpwd){
    ElMessage.warning('请填写完整信息')
    return
  }
  const result=userStore.changepassword(form.value.oldpwd,form.value.newpwd)
  if(result.success){
    ElMessage.success(result.message)
    form.value={oldpwd:'',newpwd:''}
  }else{
    ElMessage.error(result.message)
  }
}
</script>
<template>
  <el-container style="height:100vh">
    <el-header>
      <el-button @click="$router.push('/')">重新登录</el-button>
    </el-header>
    <el-main>
      <el-card title="修改密码" style="width:400px;margin:100px auto">
        <el-form :model="form">
          <el-form-item label="原密码"><el-input v-model="form.oldpwd" type="password" show-password/></el-form-item>
          <el-form-item label="新密码"><el-input v-model="form.newpwd" type="password" show-password/></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

