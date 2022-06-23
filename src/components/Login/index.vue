<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>
          <div class="content">
            <div class="re">
              <div class="input-text clearFix">
                <input type="text" placeholder="用户名" v-model="username"/>
              </div>
              <div class="input-text clearFix">
                <input placeholder="请输入你的密码" v-model="password" :type='codeType===0?"password":"text"'/>
                <span v-if="codeType == 1"><img @click="reveal" src="./images/view.png"></span>
                <span v-if="codeType == 0"><img @click="conceal" src="./images/hide.png"></span>
              </div>
              <button class="btn" @click="commit"> 登&nbsp;&nbsp;录</button>
            </div>
            <div class="call clearFix">
                <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Login',
   data(){
    return {
      username:"",
      password:"",    
      codeType:0 
    }
   },
   computed:{
     ...mapState ({loginList:(state)=>state.login.loginList}),
  },
  methods:{
  async commit()
    {
      const {username,password}=this;
       await this.$store.dispatch('reqloginList',{username,password}).then((loginList)=>{
        console.log(loginList);
        if(loginList===3)
        {
          this.$router.push("/home")
        }
        else if(loginList===1)
        {
          alert("用户未注册")
        }
        else if(loginList===2)
        {
          alert("密码错误")
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
  
}
</script>

<style lang="less" scoped>
.login-container {
  height: 600px;
  background: url(./images/7.jpg)no-repeat;
  background-size: 100% 100%;
  .login-wrap {
    .login {
      width: 1200px;
      height: 487px;
      margin: 0 0 0 200px;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 5px;
      position: relative;
      padding: 20px;
      background: url(./images/8.jpg) no-repeat;
      background-size: 100% 100%;


      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #0a1753;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;
        img{
          width: 100%;
          height: 100%;
        }
       
        .re {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;
          

          .input-text {
            margin-bottom: 16px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 300px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;
              border-radius:15px;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #4ab3f0;
            padding: 6px;
            border-radius: 15px;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e3e1e1;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            margin-left: 4px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: left;
            font-size: 15px;
            line-height: 38px;
            color: #10031d;
            text-decoration: none;
          }

          
        }
      }
    }
  }

}
</style>