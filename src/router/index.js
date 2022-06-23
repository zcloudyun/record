// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import  Home from '../components/Home'
import Login from '../components/Login'
import Infromation from '../components/Information'
import Register from '@/components/Register'
import Order from '@/components/Order'
import Order1 from '@/components/Order1'
import User from '@/components/User'
import Record from '@/components/Record'
import Receive from '@/components/Receive'


// 先把VueRouter原型对象的push，先保存一份,备份
let originpush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;

// 重写push|replace方法
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location,resolve,reject) { 
    if (resolve && reject) {
        // call||apply相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数，call传递的参数用逗号隔开，apply方法执行，传递数组
        originpush.call(this, location, resolve, reject)
    }
    else { 
        originpush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location,resolve,reject) { 
    if (resolve && reject) {
        // call||apply相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数，call传递的参数用逗号隔开，apply方法执行，传递数组
        originreplace.call(this, location, resolve, reject)
    }
    else { 
        originreplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'order',
                    component: Order,
                },
                {
                    path: 'receive',
                    component: Receive,
                },
                {
                    path: 'information',
                    component: Infromation,
                },
                {
                    path: 'user',
                    component: User,
                },
                {
                    path: 'order1',
                    component: Order1,
                    
                },
                {
                    path: 'record',
                    component: Record,
                },
                {
                    path: '/home',
                    redirect:'/home/user'
                }
            ]
            
        },
        {
            path: '/register',
            component: Register,
            meta: {show:false}
            
        },
        {
            // 字符串传参，进行占位
            path: '/login',
            component: Login,
            meta: {show:false}
            
        },
        // 重定向，子项目跑起来的时候，访问/,立马定向到首页
        {
            path: '*',
            redirect:'/login'
        }
     
    ] 
})