const categoryModel = require('../models/category');

exports.showCreate = (req,res) => {
    categoryModel.getAll((err, categories) => {
        res.render('topic/create.html',{
            categories
        });
    })
    
};

exports.handleCreate = (req,res) => {
    res.render();
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