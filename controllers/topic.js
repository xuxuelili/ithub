const categoryModel = require('../models/category');
const topicModel = require('../models/topic');

//显示添加话题的页面
exports.showCreate = (req,res) => {
    categoryModel.getAll((err, categories) => {
        res.render('topic/create.html',{
            categories
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
    req.body.userId = req.session.id;
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

exports.showTopic = (req,res) => {
    res.render();
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