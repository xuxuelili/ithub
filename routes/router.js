//设置路由规则

//1.加载express
const express = require('express');

//加载所有的处理函数
const indexCtrl = require('../controllers/index');
const userCtrl = require('../controllers/user');
const topicCtrl = require('../controllers/topic');

//2.调用express.Router() 创建一个路由实例
const router = express.Router();

//设置路由规则
//设置首页
router.get('/',indexCtrl.showIndex)

//设置用户
router
    .get('/signin',userCtrl.showSignin)
    .post('/signin',userCtrl.handleSignin)
    .get('/signup',userCtrl.showSignup)
    .post('/signup',userCtrl.handleSignup)
    .get('/signout',userCtrl.handleSignout)

//设置话题
router
    .get('/topic/create',topicCtrl.showCreate)
    .post('/topic/create',topicCtrl.handleCreate)
    .get('/topic/:topicID',topicCtrl.showTopic)
    .get('/topic/:topicID/edit',topicCtrl.showEdit)
    .post('/topic/:topicID/edit',topicCtrl.handleEdit)
    .get('/topic/:topicID/delete',topicCtrl.handleDelete)


//3.导出路由对象
module.exports = router;
//4.在app.js中挂载路由: app.use(路由对象);


