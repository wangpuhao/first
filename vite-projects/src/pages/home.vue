<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserstore } from '../pinia/store.js'
import { useCartstore } from '../pinia/store.js'
import { ElMessage } from 'element-plus'
import { useDishstore } from '../pinia/store.js'
// import { getDishes, submitOrder as apiSubmitOrder } from '../api/dish'

const router = useRouter()
const userStore = useUserstore()
const cartStore = useCartstore()

const dishStore=useDishstore()
const dishList = ref(dishStore.dishList)

// 页面加载时获取菜品列表
// onMounted(async () => {
//   try {
//     // 调用后端接口getDishes，获取菜品列表数据
//     const res = await getDishes()
//     // 赋值
//     dishList.value = res.data.data
//   } catch (err) {
//     ElMessage.error('获取菜品失败')
//   }
// })

// 加入购物车
const addToCart = (dish) => {
  // 调用购物车仓库的add方法，将当前点击的菜品添加到购物车
  cartStore.add(dish)
  ElMessage.success(`已添加 ${dish.name} 到购物车`)
}
//跳转到购物车
const gotoCart=()=>{
  router.push('/user/cart')
}

// 退出登录
const handleLogout = () => {
  // 调用用户仓库的logout方法，清空用户登录状
  userStore.logout()
  router.push('/')
}

</script>
<template>
  <el-container style="height: 100vh">
    <el-header>
      <span>欢迎，{{ userStore.username }}</span>
      <el-button @click="handleLogout" style="float:right">退出登录</el-button>
        <el-button @click="router.push('/dish')" style="float:right; margin-right: 10px;">
    菜品管理
  </el-button>      
      <el-button @click="gotoCart">购物车</el-button>
    </el-header>
    <el-container>
      <el-main>
        <h2>今日菜单</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="dish in dishList" :key="dish.id">
            <el-card style="margin-bottom:20px ">
              <h3>{{ dish.name }}</h3>
              <p>价格：¥{{ dish.price }}</p>
              <el-button type="primary" @click="addToCart(dish)">加入购物车</el-button>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
:ddep(.el-card_body){
  padding: 0 !important;
}
</style>

