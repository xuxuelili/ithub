const md5 = require('md5');
const userModel = require('../models/user');

//用户登录渲染
exports.showSignin = (req,res) => {
    // res.send('signin.html');
    res.render('signin.html');
}
//处理登陆逻辑
exports.handleSignin = (req,res) => {
    //1.验证用户输入
    //2.验证邮箱密码是否正确
    db.query(
        'select * from `users` where `email` = ?',
        req.body.email,
        (error,results) => {
            if (error) {
                return res.send('服务器内部错误');
            }
            // console.log(results);
            if (results.length <= 0) {
                //说明邮箱不存在
                return res.json({
                    code: 401,
                    msg: '邮箱不正确'
                })
            }
            req.body.password = md5(req.body.password);
            if (req.body.password !== results[0].password) {
                //密码不正确
                return res.json({
                    code: 402,
                    msg: '密码不正确'
                })
            }
            res.json({
                code: 200,
                msg: '登录成功'
            })
        }
    )
}
//用户注册渲染
exports.showSignup = (req,res) => {
    res.render('signup.html');
}
//处理注册逻辑
exports.handleSignup = (req, res) => {
    //注册之前,要做数据验证
    //验证邮箱是否存在
    userModel.getByEmail(req.body.email, (err, user) => {
        if (err) {
            return res.send('服务器内部错误');
        }
        //判断邮箱是否存在
        if (user) {
           res.render('signup.html',{
               msg: '邮箱已存在!'
           })
        }

        //验证昵称是否存在
        userModel.getByNickname(req.body.nickname, (err, user) => {
            if (err) {
                return res.send('服务器内部错误');
            }
            if (user) {
                res.render('signup.html',{
                    msg: '昵称已存在!'
                });
            }

            //添加用户
            req.body.createdAt = new Date();
            req.body.password = md5(req.body.password);
            userModel.createUser(req.body, (err,isOK) => {
                if (isOK) {
                    //注册成功
                    res.redirect('/signin');
                } else {
                   res.render('signup.html',{
                       msg: '注册失败!'
                   })
                }
            });
        })
    })
}
//处理登出逻辑
exports.handleSignout = (req,res) => {
    res.send('handleSignout');
}