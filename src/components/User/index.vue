<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <div class="todo-header">
        <h3>用户信息</h3>
      </div>
      <div id="demo">
        <table>
          <tr>
            <th>用户名</th>
            <th>电话号码</th>
            <th>名字</th>
            <th>密码</th>
            <th>操作</th>
          </tr>
          <tr v-for="(r, index) in userList" :key="index">
            <td>{{ r.username }}</td>
            <td>{{ r.phone }}</td>
            <td>{{ r.name }}</td>
            <td>{{ r.password }}</td>
            <td><button @click="del(r.username)">删除</button></td>
          </tr>
        </table>
      </div>
      <span class="total">全部{{ userList.length }} </span>
      <button @click="ord">查看下单信息</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  mounted() {
    this.sel();
  },
  computed: {
    ...mapState({userList: (state) => state.search.userList}),
    ...mapState({deleteuser:(state)=>state.search.deleteuser})
  },

  methods: {
    async sel() {
      await this.$store.dispatch("user");
    },
    ord() {
      this.$router.push("/home/order");
    },
    del(username){
      this.$store.dispatch("deleteuser",{username}).then((deleteuser)=>{
        if(deleteuser===true)
        {
          alert('删除成功')
        }
        else{
          alert("删除失败")
        }
        this.sel();
      });
    }
  },
};
</script>
  
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.total{
  color: rgb(255, 153, 0);
  font-size: 20px;
  margin-left: 880px;
  margin-right: 40px;
  font-weight: 900;
}
th{
  background-color: blanchedalmond;
  border: 1px solid #cccccc;
}
table,
td {
  border: 1px solid #cccccc;
  border-collapse: collapse;
}
table {
  width: 900px;
  margin: 10px 80px;
}
tr {
  line-height: 30px;
}
td {
  text-align: center;
}
button {
  width: 100px;
  height: 25px;
  font-size: 16px;
  color: black;
  background-color: rgb(211, 103, 14);
  border: 1px solid orange;
  border-radius: 15px;
}
h3 {
  font-size: 20px;
  color: indigo;
  margin: 10px 30px;
}
.todo-container {
  width: 1200px;
  margin: 10px 210px;
  /* background: url(./images/2.png) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto; */
}

.todo-container .todo-wrap {
  /* padding: 10px 10px; */
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>