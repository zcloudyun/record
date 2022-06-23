<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <div class="todo-header">
        <div class="todo-header">
        <h3>用户下单信息</h3>
      </div>
        <input type="text" placeholder="请输入用户名" v-model="username"/>
        <button class="btn btn-danger" @click="sel">查询下单信息</button>
      </div>
      <ul class="todo-main"  v-for="(r, index) in showPage" :key="index">
        <li ><label>username</label>{{ r.username }}</li>
        <li ><label>phone</label>{{ r.phone }}</li>
        <li ><label>name</label>{{ r.name }}</li>
        <li ><label>password</label>{{ r.password }}</li>
        <li ><label>record_No</label>{{ r.record_No }}</li>
        <li ><label>goods_No</label>{{ r.goods_No }}</li>
        <li ><label>goods_name</label>{{ r.goods_name }}</li>
        <li ><label>endAddress</label>{{ r.endAddress }}</li>
      </ul>
    </div>
      <Pagination :pageNo="pageNo" :pageSize="pageSize" :total="total" :continues="5" @getpageNo="getpageNo"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Order1",
  data(){
    return {
      username:'',
       // 当前页
        pageNo:1,
        // 每页的大小
        pageSize:1,
        // 总页数
        total:'',
        // 每页展示的数据
        showPage:[],
        // 后台接收到的数据
        tableDate:[]
    }
  },
  computed: {
    ...mapState({
       order1List: (state) => state.search.order1List,
    }),
  },

  methods: {
    async sel() {
      const {username}=this;
      await this.$store.dispatch("order",{username}).then((order1List)=>{
        this.tableDate=order1List
        if(!this.tableDate)
        {
          this.showPage=[]
        }
        else
        {
          this.total=order1List.length
          console.log(this.total);
        }
      })
    },
     // 自定义事件的回调函数---获取当前第几页
    getpageNo(pageNo){
        this.pageNo=pageNo;
        // 获取一组数组的第一个索引
       var list=(this.pageNo-1)*this.pageSize;
       // 取出每一页的数据
       this.showPage=this.tableDate.slice(list,list+this.pageSize)
        this.sel()
    },
  },
};
</script>
  
<style lang="less" scoped>
h3{
  font-size: 20px;
  color: indigo;
  margin: 10px 30px;
}
label {
        font-size: 16px;
        width: 100px;
        height: 30px;
        border: 1px solid pink;
        background-color: rgb(174, 243, 250);
        text-align: center;
        line-height: 30px;
        display: inline-block;
        border-radius: 50px;
        margin-right: 30px;
      }

.btn {
  margin-left: 20px;
  height: 32px;
  display: inline-block;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}

.btn-danger {
  color: #fff;
  background-color: #3485db;
  border: 1px solid #cad4a1;
}

.btn-danger:hover {
  color: #fff;
  background-color: #21d5bd;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 1000px;
  margin: 0 210px;
   background: url(./images/2.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;

}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}


.todo-header input {
  width: 800px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 4px 7px;
  margin-top: 20px;
  margin-left: 30px;

}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}

/*main*/
.todo-main {
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
  margin-bottom: 20px;
  color: black;
  margin: 10px 0 0 28px;
}


/*item*/
li {
  list-style: none;
  height: 36px;
  margin-left: 10px;
  line-height: 36px;
  font-size: 18px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
</style>