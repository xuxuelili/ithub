const categoryModel = require('../models/category');
const topicModel = require('../models/topic');

//显示添加话题的页面
exports.showCreate = (req,res) => {
    categoryModel.getAll((err, categories) => {
        res.render('topic/create.html',{
            categories,
            user: req.session.user
        });
    })
    
};

//处理添加话题
exports.handleCreate = (req,res) => {
    //判断session
    if (!req.session.user) {
        res.json({
            code: 403,
            msg: '登录过期,请先登录'
        })
    }
    req.body.userId = req.session.user.id;
    req.body.createdAt = new Date();
    topicModel.createTopic(req.body, (err, isOK) => {
        if (err) {
            res.json({
                code: 500,
                msg: '服务器内部错误'
            })
        }
        if (isOK) {
            res.json({
                code: 200,
                msg: '添加成功'
            })
        } else {
            res.json({
                code: 401,
                msg: '添加失败'
            })
        }
    })
};

//详情页显示
exports.showTopic = (req,res) => {
    // 获取url传递的id, 动态路由
    const topicId = req.params.topicID;
    if (isNaN(topicId)) {
        res.send('参数错误')
    }
    topicModel.getById(topicId, (err, topic) => {
        if (err) {
            return res.send('服务器内部错误')
        }
        if (topic) {
            res.render('topic/show.html',{
                topic,
                user: req.session.user
            });
            
        } else {
            res.send('该话题不存在');
        }
        
    })
    
};

exports.showEdit = (req,res) => {
    res.render();
};

exports.handleEdit = (req,res) => {
    res.render();
};

exports.handleDelete = (req,res) => {
    res.render();
};