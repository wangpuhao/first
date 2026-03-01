import Mock from 'mockjs'

// 拦截 /api/dishes 请求，返回固定菜品（避免随机数导致你困惑）
Mock.mock('/api/dishes', 'get', () => {
  return {
    code: 200,
    data: [
      { id: 1, name: '宫保鸡丁', price: 38 },
      { id: 2, name: '鱼香肉丝', price: 32 },
      { id: 3, name: '水煮鱼', price: 58 },
      { id: 4, name: '麻婆豆腐', price: 22 }
    ],
    message: '获取成功'
  }
})

// 拦截下单请求
Mock.mock('/api/order', 'post', () => {
  return {
    code: 200,
    message: '下单成功'
  }
})