<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <div class="todo-header">
        <div class="todo-header">
        <h3>用户快递信息</h3>
      </div>
        <input type="text" placeholder="请输入快递单号" v-model="record_No"/>
        <button class="btn btn-danger" @click="sel">查询快递信息</button>
      </div>
      <ul class="todo-main" v-for="(r, index) in record1List" :key="index">
        <li><label>username</label>{{ r.username }}</li>
        <li><label>record_No</label>{{r.record_No}}</li>
        <li><label>goods_No</label>{{ r.goods_No }}</li> 
        <li><label>goods_name</label>{{ r.goods_name }}</li> 
        <li><label>startAddress</label>{{ r.startAddress }}</li>
        <li><label>endAddress</label>{{ r.endAddress }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Record",
  data(){
    return{
      record_No:''
     }
    },
  computed: {
    ...mapState({
     record1List: (state) => state.search.record1List,
    }),
  },

  methods: {
    async sel() {
      const {record_No}=this;
      await this.$store.dispatch("record",{record_No})
    },
  },
};
</script>
  
<style scoped>
h3{
  font-size: 20px;
  color: indigo;
  margin-left: 30px;
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
        color: #012b25;
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
  background-color: #72cdec;
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
  background: url(./images/6.jpg) no-repeat;
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
  color: #fff;
  font-weight: 500;
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