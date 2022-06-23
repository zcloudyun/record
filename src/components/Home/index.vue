<template>
<div class="b">
   <div class="top">
    <div class="container">
      <div class="loginList">
        <p>收件人欢迎你</p>
        <p class="loginhead">
          <router-link to="/login">登录</router-link>
          <router-link class="register" to="/register">免费注册</router-link>
        </p>
      </div>
    </div>
  </div>
  <div id="demo">
		<ul class="nav" >
			<li class="home" @click="user">所有用户信息</li>
			<li class="news" @click="allorder">所有下单信息</li>
			<li class="projects" @click="allrecord">所有快递信息</li>
      <li class="receive" @click="allreceive">所有签收信息</li>
			<li class="services" @click="order">用户下单信息</li>
			<li class="contact" @click="record">用户快递信息</li>
		</ul>
		<!-- <div>当前页面：{{current}}</div> -->
    <router-view></router-view>
	</div>
</div>
</template>
<script>
import Information from '@/components/Information'
import Order from '@/components/Order'
import Order1 from '@/components/Order1'
import Record from '@/components/Record'
import User from '@/components/User'
import Receive from '@/components/Receive'
export default {
  name: "",
  components:{
    Information,Order,Order1,Record,User,Receive
  },

  methods: {
    user()
    {
      this.$router.push('/home/user')
    },
    order()
    {
      this.$router.push('/home/order1')
    },
    record()
    {
      this.$router.push('/home/record')
    },
    allorder()
    {
      this.$router.push('/home/information')
    },
    allrecord(){
      this.$router.push('/home/order')
    },
    allreceive()
    {
      this.$router.push('/home/receive')
    }
  },
};
</script>

<style scoped lang="less">
		*{margin:0;padding:0}
		.nav{
			width: 200px;
			overflow:hidden;
      float: left;
		}
		.nav li{
			background-color: #0f2f48;
			padding:10px 30px;
			list-style-type:none;
			color:white;
			font-weight: bold;
			font-size: 20px;
			text-transform:uppercase;
			cursor:pointer;
		}
	 .nav li:hover{
     background-color: #eaeaea;
     color: black;
   }
.top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}

.container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.loginList {
  float: left;
}
.loginList p {
  float: left;
  margin-right: 10px;
  color: red;
  font-size: 20px;
}
.register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
</style>
