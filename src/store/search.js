// search模块的小仓库
import {reqUser,reqOreder, reqUserList, reqOrederList,reqRecord,reqDeleteuser,reqReceive} from "@/api";
const state = {
    orderList: {},
    recordList: {},
    userList: {},
    order1List: {},
    record1List: {},
    deleteuser: true,
    receivelist: {}
};
const mutations = {
    REQUSER(state, orderList) { 
        state.orderList=orderList
    },
    REQORDER(state, recordList) { 
        state.recordList=recordList
    },
    USER(state, userList) { 
        state.userList=userList
    },
    RECORD(state, record1List) { 
        state.record1List=record1List
    },
    ORDER(state, order1List) {
        state.order1List=order1List
    },
    DELETEUSER(state, deleteuser)
    {
        state.deleteuser=deleteuser
    },
    RECEIVE(state, receivelist) { 
        state.receivelist=receivelist
    }
};
const actions = {
     // 获取search模块数据
     async requser({ commit }) { 
        let result = await reqUserList();
        console.log(result);
        if (result.code === 200) { 
            commit('REQUSER', result.data);
            console.log(result.data);
        }
        return result.data
    },
    async reqorder({ commit }) { 
      
        let result = await reqOrederList();
        console.log(result);
        if (result.code === 200) { 
            commit('REQORDER', result.data);
            
        }
        return result.data
    },
    // 用户信息
    async user({ commit }) { 
    
        let result = await reqUser();
        console.log(result);
        if (result.code === 200) { 
            commit('USER', result.data);
            
        }
        return result.data
    },
    // 用户下单信息
    async order({ commit },user) { 
        
        let result = await reqOreder(user);
        console.log(result);
        if (result.code === 200) { 
            commit('ORDER', result.data);
            
        }
        return result.data
    },
    // 快递信息
    async record({ commit },user) { 
        let result = await reqRecord(user);
        console.log(result);
        if (result.code === 200) { 
            commit('RECORD', result.data);
            
        }
        return result.data
    },
     // 删除用户信息
     async deleteuser({ commit },user) { 
        let result = await reqDeleteuser(user);
        console.log(result);
        if (result.code === 200) { 
            commit('DELETEUSER', result.data);
            
        }
        return result.data
    },
    //  用户签收
    async  receive({ commit }) { 
        let result = await reqReceive();
        console.log(result);
        if (result.code === 200) { 
            commit('RECEIVE', result.data);
            
        }
        return result.data
    },
    
};
// 计算属性：在项目中，为了简化数据而生

const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}
