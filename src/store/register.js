// search模块的小仓库
import {reqUserRegister} from "@/api";
const state = {
    registerList: {}
};
const mutations = {
    REGISTERLIST(state, registerList) { 
        state.registerList=registerList
    },
};
const actions = {
    // 获取search模块数据
    async reqRegisterList({ commit }, user) { 
        // 当前这个reqGetSearchInfo这个函数获取服务器数据的时候，至少传递一个数据(空对象)
        let result = await reqUserRegister(user);
        console.log(result);
        if (result.code === 200) { 
            commit('REGISTERLIST', result.data);
            console.log(result.data);
            
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