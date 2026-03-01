import { defineStore } from "pinia";
//登录，注册，退出
export const useUserstore=defineStore('user',{
    state:()=>({
        username:'',
        password:'',
        registeredUsers:[]
    }),
    actions:{
        login(username,password){
            const findname=this.registeredUsers.find(user=>user.username===username&&user.password===password)
            if(findname){
                this.username=username
                this.password=password
                return{success:true,message:'登录成功'}
            }else{
                return{success:false,message:'用户名或者秘密错误'}
            }
        },
        logout(){
            this.username=''
            this.password=''
        },
        register(username,password){
            const isUserExist=this.registeredUsers.some(user=>user.username===username)
            if(isUserExist){
                return{ success:false,message:'用户名已经被注册'}
            }else{
                this.registeredUsers.push({username,password})
                this.username=username
                this.password=password
                return{success:true,message:'注册成功'}
            }
            },
            changepassword({oldpassword,newpassword}){
                if(this.password!==oldpassword){
                    return{success:false,message:'原密码错误'}
                }
                const userpassword=this.registeredUsers.findIndex(user=>user.username===this.username)
                if(userpassword){
                    userpassword.password=newpassword
                    this.password=newpassword
                    return{success:true,message:'密码修改成功'}
                }else{
                    return{success:false,message:'用户不存在'}
                }
            }
        }
})
//购物车
export const useCartstore=defineStore('cart',{
    state:()=>({
        list:[]
        // 包括id name price count
    }),
    actions:{
        add(food){
            const findFood=this.list.find(item=>item.id===food.id)
            if(findFood){
                findFood.count+=1
            }else{
                this.list.push({...food,count:1})
            }
        },
        delete(id){
            const rest=this.list.find(item=>item.id===id)
            if(rest&&rest.count>1){
                rest.count-=1
            }else{
                this.list=this.list.filter(item=>item.id!==id)
            }
        },
        clearcart(){
            this.list=[]
        },
        totalprice(){
            return this.list.reduce((sum,item)=>sum+item.price*item.count,0)
        }
    }
})

//订单
export const useOrderstore=defineStore('order',{
    state:()=>({
        orderList:[]
    }),
    actions:{
        //新建订单
        createOrder(orderdata){
            this.orderList.unshift(orderdata)
        },
        //删除订单
        deleteOrder(orderId){
            this.orderList=this.orderList.filter(order=>order.id!==orderId)
        },
        //清空所有订单
        clearAllOrder(){
            this.orderList=[]
        }
    },
    getters:{
        getAllorders:(state)=>state.orderList
    }
})

//菜品管理
// ========== 菜品管理仓库（简化版） ==========
export const useDishstore = defineStore('dish', {
  state: () => ({
    // 菜品列表（初始模拟数据，可删除）
    dishList: [
      { id: 1, name: '宫保鸡丁', price: 28 },
      { id: 2, name: '鱼香肉丝', price: 26 },
      { id: 3, name: '水煮鱼', price: 58 },
      { id: 4, name: '麻婆豆腐', price: 22 }      
    ]
  }),
  actions: {
    // 1. 查询所有菜品（供页面展示）
    getDishes() {
      return this.dishList
    },
    // 2. 上架菜品（新增）
    addDish(dish) {
      const newDish = { ...dish, id: Date.now() } // 时间戳生成唯一ID
      this.dishList.push(newDish)
      return { success: true }
    },
    // 3. 删除菜品
    deleteDish(dishId) {
      this.dishList = this.dishList.filter(d => d.id !== dishId)
    }
  }
})