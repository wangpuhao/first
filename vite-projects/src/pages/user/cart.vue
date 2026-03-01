<script setup>
import { useCartstore } from '../../pinia/store';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { getDishes, submitOrder as apiSubmitOrder } from '../../api/dish'
import { useOrderstore } from '../../pinia/store';
const cartStore=useCartstore()
const router=useRouter()
const orderStore=useOrderstore()
//提交订单
const submitOrder = async () => {
  if (cartStore.list.length === 0) {
    ElMessage.warning('购物车为空，无法下单')
    return
  }
  //生成订单
  const orderData = {
    id: Date.now(), // 正确：用时间戳生成唯一订单ID
    items: cartStore.list.map(item => ({
        dishId: item.id,
        name: item.name,
        price: item.price,
        count: item.count
    })),
    totalPrice: cartStore.totalprice(),
    createTime: new Date().toLocaleString()
  }
  try {
    console.log('1. 开始执行 try 块')
    
    orderStore.createOrder(orderData)
    console.log('2. orderStore.createOrder 执行完成')

    ElMessage.success(`下单成功，订单号：${orderData.id}`)
    console.log('3. 成功提示已弹出')

    cartStore.clearcart()
    console.log('4. 购物车已清空')

    await router.push('/user/orders') // 加 await，确保跳转完成
    console.log('5. 已跳转到订单页面')
  } catch (err) {
    ElMessage.error('下单失败')
  }
}
//清空购物车
const handleClearCart=()=>{
    cartStore.clearcart()
}
//返回首页
const goBack=()=>{
    router.back()
}
</script>
<template>
      <el-aside width="300px" style="background:#f5f5f5;padding:20px">
        <h3>购物车</h3>
        <el-button @click="goBack">返回首页</el-button>
        <div v-if="cartStore.list.length === 0">购物车为空</div>
        <div v-else>
          <div v-for="item in cartStore.list" :key="item.id" style="margin-bottom:10px">
            <span>{{ item.name }} * {{ item.count }}</span>
            <span style="float:right">¥{{ item.price * item.count }}</span>
            <div>
              <el-button size="small" @click="cartStore.delete(item.id)">-</el-button>
              <el-button size="small" @click="cartStore.add(item)">+</el-button>
            </div>
          </div>
          <el-divider />
          <div>
            <strong>总价：¥{{ cartStore.totalprice() }}</strong>
            <el-button type="primary" style="width:100%;margin-top:10px" @click="submitOrder">提交订单</el-button>
            <el-button  style="width:100%;margin-top:10px" @click="handleClearCart">清空购物车</el-button>
           
          </div>
        </div>
      </el-aside>

</template>