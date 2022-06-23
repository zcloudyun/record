<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <div class="todo-header">
        <h3>快递信息</h3>
      </div>
      <div id="demo">
        <table>
          <tr>
            <th>用户名</th>
            <th>快递单号</th>
            <th>货物号</th>
            <th>货物名</th>
            <th>途径地址</th>
            <th>收货地址</th>
          </tr>
          <tr v-for="(r, index) in recordList" :key="index">
            <td>{{ r.username }}</td>
            <td>{{ r.record_No }}</td>
            <td>{{ r.goods_No}}</td>
            <td>{{ r.goods_name }}</td>
            <td>{{ r.startAddress }}</td>
            <td>{{ r.endAddress }}</td>
          </tr>
        </table>
      </div>
      <span class="total">全部{{ recordList.length }} </span>
      <button @click="ord">查看下单信息</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'Order',
   computed:{
    ...mapState ({recordList:(state)=>state.search.recordList}),
   
  },
  mounted(){
    this.se()
  },
  methods:{
    se(){
      this.$store.dispatch('reqorder').then((recordList)=>{
         console.log(recordList);
      })
    },
     ord()
    {
      this.$router.push('/home/information')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.total{
  color: rgb(255, 153, 0);
  font-size: 16px;
  margin-left: 905px;
  margin-right: 40px;
}
th{
  background-color: rgb(231, 167, 236);
  border: 1px solid #cccccc;
}
table,
td {
  border: 1px solid #cccccc;
  border-collapse: collapse;
}
table {
  width: 1000px;
  margin: 20px auto;
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
  margin: 0 210px;

}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>