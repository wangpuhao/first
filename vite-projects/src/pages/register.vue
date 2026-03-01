<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserstore } from '../pinia/store';
import { ElMessage } from 'element-plus'; 
const userstore=useUserstore();
const router=useRouter();
const formRef=ref()
const form=ref({username:'',password:''});
const onregister=async ()=>{
    if(!form.value.username||!form.value.password){
        ElMessage.warning('用户名和密码不能为空')
    }
    const result=userstore.register(form.value.username,form.value.password);
    if(result.success){
        ElMessage.success(result.success)
        router.push('/')
    }else{
        ElMessage.error(result.message)
    }
}
</script>
<template>
    <div class="register">
        <el-card style="width:400px;margin:100px auto">
            <template #header>
                <div class="title">注册</div>
            </template>
            <el-form :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" aria-placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password" show-password aria-placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onregister">注册</el-button>
                    <el-button @click="$router.push('/')">返回登录</el-button>
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