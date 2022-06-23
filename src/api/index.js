// 当前这个模块：API进行统一管理
import requests from "./ajax";

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数

// 注册
export const reqUserRegister = (data)=>requests({url:'/manager',data,method:'post'});

//登录
export const reqUserLogin = (data) => requests({ url: '/managerlogin', data, method: 'post' });


// 查询用户信息
export const reqUser = () => requests({ url: '/user', method: 'get' });

// 查询用户下单
export const reqOreder = (data) => requests({ url: '/order1',data, method: 'post' });
// 用户快递信息
export const reqRecord = (data) => requests({ url: '/record', data, method: 'post' });

// 删除用户信息
export const reqDeleteuser = (data) => requests({url:'/delete',data,method:'post'})

// 查询所以下单信息
export const reqUserList = () => requests({ url: '/userList', method: 'get' });

// 查询所有快递信息
export const reqOrederList = () => requests({ url: '/orderList', method: 'get' });

// 查询所有签收信息
// 查询所有快递信息
export const reqReceive = () => requests({ url: '/receive', method: 'get' });


