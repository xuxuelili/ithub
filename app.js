//程序入口
const express = require('express');
const app = express();
const expressArttemplate = require('express-art-template');
const bodyParser = require('body-parser');


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


//挂载路由
app.use(router);

//配置路由
// app.get('/',(req,res) => {
//     res.send('index.html');
// })