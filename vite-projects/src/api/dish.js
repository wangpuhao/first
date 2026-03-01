import axios from "axios"

const request=axios.create({
    baseURL:'/api',
    timeout:5000
})

// 获取菜品列表
export const getDishes = () => {
  return request.get('/dishes')
}

// 提交订单
export const submitOrder = (orderData) => {
  return request.post('/order', orderData)
}