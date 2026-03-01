<script setup>
// 1. 清理重复导入，只保留必要的依赖
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDishstore } from '../pinia/store'
import { ElMessage, ElMessageBox } from 'element-plus'

// 2. 初始化实例（只定义一次，避免冲突）
const dishStore = useDishstore()
const router = useRouter()

// 上架菜品的表单数据（响应式）
const addForm = ref({ name: '', price: '' })

// 2. 上架菜品（新增功能）
const handleAddDish = () => {
  // 简单校验：名称和价格不能为空，价格必须大于0
  if (!addForm.value.name || !addForm.value.price) {
    ElMessage.warning('菜品名称和价格不能为空')
    return
  }
  if (isNaN(Number(addForm.value.price)) || Number(addForm.value.price) <= 0) {
    ElMessage.warning('价格必须是大于0的数字')
    return
  }

  // 调用Pinia方法上架菜品
  const result = dishStore.addDish({
    name: addForm.value.name,
    price: Number(addForm.value.price)
  })
  
  // 反馈结果 + 清空表单
  if (result.success) {
    ElMessage.success('菜品上架成功')
    addForm.value = { name: '', price: '' } // 清空表单
  } else {
    ElMessage.error('菜品上架失败')
  }
}

// 3. 删除菜品（带二次确认，防止误删）
const handleDeleteDish = (dishId) => {
  ElMessageBox.confirm('确定删除该菜品？', '提示').then(() => {
    dishStore.deleteDish(dishId)
    ElMessage.success('菜品删除成功')
  }).catch(() => {
    ElMessage.info('已取消删除') // 新增取消提示，体验更好
  })
}

// 4. 返回点餐首页
const goBack = () => {
  router.push('/home')
}
</script>

<template>
  <div style="padding: 20px; max-width: 1000px; margin: 0 auto;">
    <!-- 页面标题 + 返回按钮 -->
    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <h2>菜品管理</h2>
      <el-button @click="goBack">返回点餐首页</el-button>
    </div>

    <!-- 1. 上架菜品区域（核心：新增功能） -->
    <el-card title="上架菜品" style="margin-bottom: 20px;">
      <el-form :model="addForm" inline style="margin-bottom: 10px;">
        <el-form-item label="菜品名称">
          <el-input v-model="addForm.name" placeholder="请输入菜品名称" style="width: 200px;" />
        </el-form-item>
        <el-form-item label="菜品价格（元）">
          <el-input v-model="addForm.price" type="number" min="0.01" step="0.01" placeholder="请输入价格" style="width: 150px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddDish">上架</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 2. 菜品列表区域（核心：查询功能） -->
    <el-card title="菜品列表">
      <!-- 空列表提示：直接绑定 Pinia 的 dishList，响应式更新 -->
      <div v-if="dishStore.dishList.length === 0" style="text-align: center; padding: 50px; color: #999;">
        暂无菜品，点击「上架菜品」添加
      </div>
      <!-- 菜品列表表格：直接用 dishStore.dishList，无需中间变量，实时更新 -->
      <el-table v-else :data="dishStore.dishList" border stripe style="width: 100%;">
        <el-table-column prop="id" label="菜品ID" width="100" />
        <el-table-column prop="name" label="菜品名称" min-width="200" />
        <el-table-column prop="price" label="价格（元）" width="120">
          <template #default="scope">¥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="danger" size="small" @click="handleDeleteDish(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>