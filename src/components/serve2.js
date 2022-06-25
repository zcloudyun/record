// 导入http模块
const http = require('http')
    // 处理url的模块
const url = require('url')
// 引入数据库
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '83641zyj',
    database:'delivery'
})
// 创表
var user = 'create table user (username varchar(255) not null primary key unique, name varchar(255) not null,phone varchar(255) not null,password varchar(255) not null)'
var manager = 'create table manager(managername varchar(255) not null primary key,password varchar(255) not null)'
var goods = 'create table  goods (goods_No varchar(255) not null primary key,record_No varchar(255) ,goods_name varchar(255) not null,username varchar(255) not null,endAddress varchar(255),flag varchar(255) not null)' 
var goodsRecord = 'create table goodsrecord(record_No varchar(255) not null primary key,goods_No varchar(255) ,startAddress varchar(255))'
function queryTable(tablename) { 
    connection.query(tablename, function (err, results) { 
        if (err) { 
            console.log(err.message);
            return;
        }
        console.log(results);
    })
}
// queryTable(user)
// queryTable(goods)
// queryTable(goodsRecord)
// queryTable(manager)

// 执行数据库连接
connection.connect();
var array='000000';
var array1='000000';
var insert_manager='insert into manager values(?,?)'
var insert_user = 'insert into user values(?,?,?,?)'
var insert_goods = 'insert into goods values(?,?,?,?,?,?)'
var insert_goodsRecord = 'insert into goodsrecord values(?,?,?)'

const server = new http.Server((req, res) => {
    // 获取客户端传过来的url中的pathname
    const { pathname } = url.parse(req.url)
    // 判断是否为login
    // app端，用户注册信息
    if (pathname === '/cur/register') {
        // 判断客户端发送的是否为post请求
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                const { name, phone, username, password } = JSON.parse(data)
                console.log(name, phone, username, password)
               
                var cont = {
                    username_confirm: -1,
                    phone_confirm:-1
                }
               
                // 正则表达式    
                const reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
                const st = new RegExp(reg)
                var a = st.test(phone);
                // 判断电话号码格式是否正确
                if (a) {
                    var userCount = `select count(*) as ucount from user where username='${username}'`
                    var phoneCount = `select count(*) as pcount from user where phone='${phone}'`
                    connection.query(userCount, (err, results) => {
                        if (err)
                            return err.message
                        var data = JSON.stringify(results[0])
                        var cond = JSON.parse(data);
                        console.log(cond);
                        if (cond.ucount <= 0) {
                            cont.username_confirm = 1;
                        } else {
                            cont.username_confirm = 0;
                        }
                        console.log("username_confirm:" + cont.username_confirm + "\n" + "phone_confirm:" + cont.phone_confirm)
                    })
                    connection.query(phoneCount, (err, results) => {
                        if (err)
                            return err.message
                        var data = JSON.stringify(results[0])
                        var cond = JSON.parse(data);
                        console.log(cond);
                        if (cond.pcount <= 0) {
                            cont.phone_confirm = 1;
                        } else {
                            cont.phone_confirm = 0;
                            
                        }
                        var d=JSON.stringify(cont)
                        console.log("username_confirm:" + cont.username_confirm + "\n" + "phone_confirm:" + cont.phone_confirm)
                        console.log(d);
                        res.end(d)
                        if (cont.phone_confirm === 1 && cont.username_confirm === 1) {
                           
                            connection.query(insert_user, [username, name, phone, password], (err, results) => {
                             
                                if (err) {
                                    return err.message;
                                }
                                if (results.affectedRows === 1) {
                                    console.log('插入数据成功');
                                }
                            })
                        }
                    })
                   
                }
                else {
                    cont.phone_confirm = 2
                    var d = JSON.stringify(cont)
                    console.log(d);
                    res.end(d)
                }
                         
            })
        }
    }
    // app端，用户登录
    else if (pathname === '/cur/login') {
        // 判断客户端发送的是否为post请求
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                const { username, password } = JSON.parse(data)
                console.log(username, password)
               
                var cont = {
                    username_confirm: -1,
                }
                var userCount = `select count(*) as ucount from user where username='${username}'`
                var passwordCount = `select count(*) as pcount from user where password='${password}'`
                connection.query(userCount, (err, results) => {
                    if (err)
                        return err.message
                    var data = JSON.stringify(results[0])
                    var cond = JSON.parse(data);
                    console.log(cond);
                    if (cond.ucount <= 0) {
                        cont.username_confirm = 0;
                        console.log("username_confirm:" + cont.username_confirm)
                        var d=JSON.stringify(cont)
                        res.end(d)
                    } else {
                        connection.query(passwordCount, (err, results1) => {
                            if (err)
                                return err.message
                            var data1 = JSON.stringify(results1[0])
                            var cond1 = JSON.parse(data1);
                            console.log(cond1);
                            if (cond1.pcount <= 0) {
                                cont.username_confirm = 1;
                            } else {
                                cont.username_confirm = 2;
                            }
                           var d=JSON.stringify(cont)
                            res.end(d)
                                
                        })
                    }
                      
                })
                    
            })
        }
    }
    // 用户下单
    else if (pathname === '/cur/order') {
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                const { goods_No, goods_name, username, endAddress ,flag} = JSON.parse(data)
                console.log(goods_No, goods_name, username, endAddress,flag);
                array1 = goods_No;
            //    array="000000"
            // console.log(array);
            // console.log(array1);
                var cont = {
                    order_confirm:-1
                }
                connection.query(insert_goods, [goods_No, array, goods_name, username, endAddress,flag], (err, results) => {
                    if (err) {
                        return err.message;
                    }
                    if (results.affectedRows === 1) {
                        console.log('插入数据成功');
                        
                    }
                    cont.order_confirm=1
                    var d=JSON.stringify(cont)
                    res.end(d)
                })
                
            })
        }
        
    }
    // 下位机端
    else if (pathname === '/cur/list') {
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                const { record_No, startAddress } = JSON.parse(data)
                console.log(record_No, startAddress)
                // array = record_No;
                console.log(array);
                console.log(array1);
                var selectg = `select count(*) as count from goodsrecord where record_No='${record_No}'`
                var sel = `select startAddress from goodsrecord where record_No='${record_No}'`
                var arr = 'update goods set record_No=? where goods_No=?'
                connection.query(selectg, (err, results) => {
                    if (err) return err.message
                    var data = JSON.stringify(results[0])
                    var cond = JSON.parse(data);
                    console.log(cond.count);
                    if (cond.count <= 0) {
                        connection.query(insert_goodsRecord, [record_No, array1, startAddress], (err, results1) => {
                            if (err) {
                                return err.message;
                            }
                            if (results1.affectedRows === 1) {
                                console.log('插入数据成功');
                            }
                        })
                        connection.query(arr, [record_No, array1], (err, results) => {
                            if (err) {
                                return err.message;
                            }
                            if (results.affectedRows === 1) {
                                console.log('更新成功');
                            }
                        })
                    }
                    else {
                        connection.query(sel, (err, results1) => {
                            if (err) {
                                return err.message;
                            }
                            var data = JSON.stringify(results1[0]);
                            var cond = JSON.parse(data);
                            var c = cond.startAddress + ',' + startAddress;
                            console.log(c);
                            var updateg = 'update goodsrecord set startAddress=? where record_No=?'
                            connection.query(updateg, [c, record_No], (err, results2) => {
                                if (err) {
                                    return err.message;
                                }
                                console.log("更新成功");
                            })
                        })
                    }
                })
            })
        }
        res.end('yes')
    }
    // app端，物流信息
    else if (pathname === '/cur/api') {
        // 判断客户端发送的是否为post请求
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                const { username } = JSON.parse(data)
                console.log(username)
                var selectnew = `select * from user as a join goods as b on a.username=b.username join goodsrecord as c on b.record_No=c.record_No where a.username='${username}'`
                connection.query(selectnew, (err, results) => {
                    if (err) return err.message
                    var data1 = JSON.stringify(results)
                    console.log(data1);
                    res.end(data1)
                })
               
            })
        }
    }
    // 管理员注册
    else if (pathname === '/cur/manager') {
        // 判断客户端发送的是否为post请求
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                const { username, password } = JSON.parse(data)
                console.log(username, password)
                var result={
                    code: 200,
                    data:1
                }
                var managerCount = `select count(*) as count from manager where  managername='${username}'`
                connection.query(managerCount, (err, results) => {
                    if (err)
                        return err.message
                    var data = JSON.stringify(results[0])
                    var cond = JSON.parse(data);
                    console.log(cond);
                    if (cond.count <= 0) {
                        connection.query(insert_manager, [username, password], (err, results) => {
                            if (err) {
                                return err.message;
                            }
                            if (results.affectedRows === 1) {
                                console.log('插入数据成功');
                            }
                        })
                        // 注册成功
                        result.data = 1
                        console.log(result);
                        var d = JSON.stringify(result)
                        console.log(d);
                         res.end(d)
                    }
                    else {
                        // 注册失败
                        result.data = 0
                        console.log(result);
                        var d = JSON.stringify(result)
                        console.log(d);
                        res.end(d)
                    }
                })
               
            })
        }

    }
    // 管理员登录
    else if (pathname === '/cur/managerlogin') {
        // 判断客户端发送的是否为post请求
        if (req.method === 'POST') {
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                const { username, password } = JSON.parse(data)
                console.log(username, password)
                var result={
                    code: 200,
                    data:1
                }
                var managerCount = `select count(*) as count from manager where  managername='${username}'`
                var passwordCount = `select count(*) as pcount from manager where password='${password}'`
                connection.query(managerCount, (err, results) => {
                    if (err)
                        return err.message
                    var data = JSON.stringify(results[0])
                    var cond = JSON.parse(data);
                    console.log(cond);
                    if (cond.count <= 0) {
                        // 未注册
                        result.data = 1
                        var d = JSON.stringify(result)
                        res.end(d)
                    } else {
                        connection.query(passwordCount, (err, results1) => {
                            if (err)
                                return err.message
                            var data1 = JSON.stringify(results1[0])
                            var cond1 = JSON.parse(data1);
                            console.log(cond1);
                            if (cond1.pcount <= 0) {
                                // 密码错误
                                result.data = 2
                                var d = JSON.stringify(result)
                                res.end(d)
                            } else {
                                // 密码正确
                                result.data = 3
                                var d=JSON.stringify(result)
                                res.end(d)
                            }
                        })
                    }
                      
                })
               
            })
        }

    }
    // 获取所有用户下单信息
    else if (pathname === '/cur/userList') { 
        if (req.method === 'GET') { 
            // var queryString = url.parse(req.url, true).query;
            // var username = queryString.username;
            // console.log(username);
             var result = {
                code: 200,
                 data: {}
             }
            var select_user = 'select * from goods as a join user as b on a.username=b.username'
            connection.query(select_user, (err, results) => {
                if (err)
                    return err.message
                var d= JSON.stringify(results)
                console.log(d);
                var c = JSON.parse(d)
                result.data=c
                console.log(result.data);
                var r = JSON.stringify(result)
                console.log(r);
                 res.end(r)
            })
        }
    }
    // 获取所有快递信息
    else if (pathname === '/cur/orderList') { 
        if (req.method === 'GET') { 
            // var queryString = url.parse(req.url, true).query;
            // var username = queryString.username;
            // console.log(username);
            var result = {
                code: 200,
                data: {}
            }
            var select_user = `select * from goods a join goodsrecord b on a.goods_No=b.goods_No`
            connection.query(select_user, (err, results) => {
                if (err)
                    return err.message
                    var d= JSON.stringify(results)
                    var c = JSON.parse(d)
                    result.data=c
                    console.log(result.data);
                    var r = JSON.stringify(result)
                    console.log(r);
                    res.end(r)
                
            })
        }
    }
    // 获取用户信息
    else if (pathname === '/cur/user') { 
        if (req.method === 'GET') { 
             var result = {
                code: 200,
                 data: {}
             }
            var select_user = 'select * from user'
            connection.query(select_user, (err, results) => {
                if (err)
                    return err.message
                var d= JSON.stringify(results)
                console.log(d);
                var c = JSON.parse(d)
                result.data=c
                console.log(result.data);
                var r = JSON.stringify(result)
                console.log(r);
                 res.end(r)
            })
        }
    }
    // 获取指定用户下单信息
    else if (pathname === '/cur/order1') { 
        if (req.method === 'POST') { 
             // 定义客户端传过来数据的默认编码格式
             req.setEncoding('utf-8')
            
             // 拿到body中的数据
             // body中的数据是通过流来写入的
             // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
             req.on('data', (data) => {
                 // JSON.parse()把对象中的字符串转成js对象 
                 //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                 const { username} = JSON.parse(data)
                 console.log(username);
                 var result = {
                    code: 200,
                     data: {}
                 }
                var select_user = `select * from goods as a join user as b on a.username=b.username where b.username='${username}'`
                connection.query(select_user, (err, results) => {
                    if (err)
                        return err.message
                    var d= JSON.stringify(results)
                    console.log(d);
                    var c = JSON.parse(d)
                    result.data=c
                    console.log(result.data);
                    var r = JSON.stringify(result)
                    console.log(r);
                     res.end(r)
                })
                 
             })
        }
    }
    // 获取指定用户快递信息
    else if (pathname === '/cur/record') { 
        if (req.method === 'POST') { 
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
           
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                const { record_No} = JSON.parse(data)
                console.log(record_No);
                var result = {
                   code: 200,
                    data: {}
                }
               var select_user = `select * from goods as a join goodsrecord as b on a.record_No=b.record_No where b.record_No='${record_No}'`
               connection.query(select_user, (err, results) => {
                   if (err)
                       return err.message
                   var d= JSON.stringify(results)
                   console.log(d);
                   var c = JSON.parse(d)
                   result.data=c
                   console.log(result.data);
                   var r = JSON.stringify(result)
                   console.log(r);
                    res.end(r)
               })
                
            })
       }
    }
     // 删除用户信息
     else if (pathname === '/cur/delete') { 
        if (req.method === 'POST') { 
            // 定义客户端传过来数据的默认编码格式
            req.setEncoding('utf-8')
           
            // 拿到body中的数据
            // body中的数据是通过流来写入的
            // 当监听到data事件，获取到输入流，也就是body中相关的内容，可以返回这个data的结果
            req.on('data', (data) => {
                // JSON.parse()把对象中的字符串转成js对象 
                //  {"username":"阿花","passward":"123"}  ---> {username: 'ahua',password: 123}
                const {username} = JSON.parse(data)
                console.log(username);
                var result = {
                    code: 200,
                    data: true
                }
                // var delete_user = `delete from user where username='${username}'`
                var delete_user=`delete a,b,c from user a join goods b on a.username=b.username join goodsrecord c on b.record_No=c.record_No  where a.username='${username}'`
                connection.query(delete_user, (err, results) => {
                   if (err) { 
                       result.data=false
                       return err.message
                   }
                   else
                       result.data = true
                   console.log(data);
                //    进行封装
                   var r = JSON.stringify(result)
                   console.log(r);
                    res.end(r)
               })
                
            })
       }
    }
    // 显示签收信息
    else if (pathname === '/cur/receive') { 
        if (req.method === 'GET') { 
            var result = {
               code: 200,
                data: {}
            }
           var select_user =`select * from user as a join goods as b on a.username=b.username join goodsrecord as c on b.record_No=c.record_No where b.flag='1'`
           connection.query(select_user, (err, results) => {
               if (err)
                   return err.message
               console.log(results);
               var d= JSON.stringify(results)
               console.log(d);
               var c = JSON.parse(d)
               result.data=c
               console.log(result.data);
               var r = JSON.stringify(result)
               console.log(r);
                res.end(r)
           })
       }
    }
})
server.listen('8888', '192.168.218.252', () => {
    console.log("Server running at http://192.168.218.252:8888/")
})
