<template>
<div class="bac">
   <Home  v-show="$route.meta.show"/>
  <!-- 路由组件出口的地方 -->
  <router-view></router-view>
</div>
</template>

<script>
import Home from './components/Home'
// import Information from './components/Information'
import Login from './components/Login'
import Register from './components/Register'
// import Order from './components/Order'
// import Order1 from './components/Order1'
// import Record from './components/Record'
// import User from './components/User'
export default {
   name:'App',
   components:{
      Login,
      Register,
      Home,
      // Information,
      // Order,
      // Order1,
      // Record,
      // User
   },  
}
</script>

<style>

</style>
