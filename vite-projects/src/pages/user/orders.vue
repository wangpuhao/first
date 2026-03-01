<script setup>
import { useOrderstore } from '../../pinia/store'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

const orderStore = useOrderstore()
const router = useRouter()

// 删除订单
const handleDelete = (orderId) => {
  ElMessageBox.confirm('确定删除该订单？').then(() => {
    orderStore.deleteOrder(orderId)
    ElMessage.success('删除成功')
  })
}
</script>

<template>
  <div style="padding:20px">
    <h2>我的订单（查询/删除）</h2>
    <el-button @click="router.go(-1)">返回</el-button>

    <div v-for="order in orderStore.getAllorders" :key="order.id" style="margin-top:20px">
      <el-card>
        <div>订单号：{{ order.id }}</div>
        <div>时间：{{ order.createTime }}</div>
        <div>总价：¥{{ order.totalPrice }}</div>
        <div v-for="item in order.items" :key="item.dishid">
          {{ item.name }} * {{ item.count }}
        </div>
        <el-button type="danger" style="margin-top:10px" @click="handleDelete(order.id)">
          删除订单
        </el-button>
      </el-card>
    </div>

    <div v-if="orderStore.getAllorders.length === 0" style="margin-top:20px">
      暂无订单
    </div>
  </div>
</template>