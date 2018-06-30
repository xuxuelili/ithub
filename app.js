//程序入口
const express = require('express');
const app = express();
const expressArttemplate = require('express-art-template');
const bodyParser = require('body-parser');
const session = require('express-session');

//session持久化   引入express-mysql-session包
var MySQLStore = require('express-mysql-session')(session);


//导入路由模块
const router = require('./routes/router');

const PORT = 3000;
//监听端口号
app.listen(PORT,function () {
    console.log('监听 3000');
})

//处理静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));

//配置模板引擎
app.engine('html',expressArttemplate);

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//把session 保存在数据库中
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'ithub'
};
var sessionStore = new MySQLStore(options);

// 配置session
app.use(session({
    key: 'sessionid',  // 修改sessionid的名称
    secret: 'keyboard cat',  // 对sessionid 进行加密 
    resave: false,   // 强制重新存储服务器上的session数据  
    store: sessionStore,   // 配置把session数据存储到mysql
    saveUninitialized: true  // 即使不写session 也会生成sessionid
  }));


//挂载路由
app.use(router);

//配置路由
// app.get('/',(req,res) => {
//     res.send('index.html');
// })