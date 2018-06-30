//程序入口
const express = require('express');
const app = express();
const expressArttemplate = require('express-art-template');
const bodyParser = require('body-parser');
const session = require('express-session');

//引入公共文件
const config = require('./config');

//session持久化   引入express-mysql-session包
const MySQLStore = require('express-mysql-session')(session);


//导入路由模块
const router = require('./routes/router');


//监听端口号
app.listen(config.port,function () {
    console.log('监听 '+ config.port);
})

//处理静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));

//配置模板引擎
app.engine('html',expressArttemplate);

//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const bd = config.database;
//把session 保存在数据库中
var options = {
    host: bd.host,
    port: bd.port,
    user: bd.user,
    password: bd.password,
    database: bd.database
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