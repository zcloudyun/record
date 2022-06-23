// search模块的小仓库
import {reqUserLogin} from "@/api";
const state = {
    loginList: {}
};
const mutations = {
    LOGINLIST(state, loginList) { 
        state.loginList=loginList
    }
};
const actions = {
     // 获取search模块数据
     async reqloginList({ commit }, user) { 
        // 当前这个reqGetSearchInfo这个函数获取服务器数据的时候，至少传递一个数据(空对象)
        let result = await reqUserLogin(user);
        console.log(result);
        if (result.code === 200) { 
            commit('LOGINLIST', result.data);
            
        }
        return result.data
    }
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
