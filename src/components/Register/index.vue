<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户 <span class="go">我有账号，去 <router-link to="/login">登录</router-link></span>
      </h3>
       <div class="content">
        <label>用户名:</label>
        <input type="text"  v-model="username" placeholder="请输入你的用户名" />
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input placeholder="请输入你的密码" v-model="password" :type='codeType===0?"password":"text"'/>
         <span v-if="codeType == 1"><img @click="reveal" src="./images/view.png"></span>
         <span v-if="codeType == 0"><img @click="conceal" src="./images/hide.png"></span>
      </div>
      <div class="btn">
        <button @click="commit">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Register",
  data(){
    return {
      username:"",
      password:"",
      codeType:0
    }
  },
  computed:{
    ...mapState ({registerList:(state)=>state.register.registerList}),
   
  },
  methods:{
    async commit()
    {
      const {username,password}=this;
      await this.$store.dispatch('reqRegisterList',{username,password}).then((registerList)=>{
        console.log(registerList);
        if(registerList===1)
        {
          this.$router.push("/home")
        }
        else if(registerList===0)
        {
          alert("用户已注册")
        }
      })
    },
   
    //显示事件
    reveal() {
          this.codeType = 0
    },
    //隐藏事件
    conceal() {
      this.codeType = 1
     },
  },
  
};
</script>

<style lang="less" scoped>
.register-container {
  height: 650px;
  .register {
    width: 900px;
    height: 350px;
    border: 1px solid rgb(223, 223, 223) no-repeat;
    margin: 10px auto;
    background: url(./images/12.jpg)no-repeat;
     background-size: 100% 100%;
    background-position: center center;
    overflow: auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    .content {
      padding-left: 300px;
      margin-bottom: 18px;
      position: relative;
      margin-top: 30px;
      img{
        margin-left: 5px;
        width: 20px;
        height: 20px;
      }
     
      label {
        font-size: 14px;
        width: 60px;
        border: 1px solid pink;
        background-color: rgb(230, 237, 181);
        text-align: right;
        display: inline-block;
        border-radius: 15px;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
        border-radius: 15px;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 40px 0 0 110px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
       background-color: rgb(233, 228, 164);
       border: 1px solid orange;
       border-radius: 15px;
        display: inline-block;
        font-size: 16px;
      }
    }
  }
}
</style>
