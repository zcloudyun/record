import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false


// 引入路由
import router from "./router";
// 引入仓库
import store from '@/store'
// 引入分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

new Vue({
  render: (h) => h(App),

  // 配置全局事件总线$bus
  beforeCreate() { 
    Vue.prototype.$bus=this
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实列的身上会多一个属性$store属性
   store
}).$mount("#app");
