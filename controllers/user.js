const db = require('./db_helper');
const md5 = require('md5');

//用户登录渲染
exports.showSignin = (req,res) => {
    // res.send('signin.html');
    res.render('signin.html');
}
//处理登陆逻辑
exports.handleSignin = (req,res) => {
    res.render('signin.html');
}
//用户注册渲染
exports.showSignup = (req,res) => {
    res.render('signup.html');
}
//处理注册逻辑
exports.handleSignup = (req, res) => {
    //注册之前,要做数据验证
    //验证邮箱是否存在
    db.query(
        'select * from `users` where `email`=?',
        req.body.email,
        (error,results) => {
            if (error) {
                return res.send('服务器内部错误');
            }
            console.log(results);
            if (results.length > 0) {
                //说明用户名已经存在
                res.render('signup.html',{
                    msg: '用户名已存在'
                });
                return;
            }
            db.query(
                'select * from `users` where `nickname` = ?',
                req.body.nickname,
                (error,results) => {
                    if (error) {
                        return res.send('服务器内部错误');
                    }
                    console.log(results);
                    if (results.length > 0) {
                        res.render('signup.html',{
                            msg: '邮箱已存在'
                        })
                        return;
                    }
                    //注册
                    req.body.createdAt = new Date();
                    req.body.password = md5(req.body.password);
                    db.query(
                        'insert into `users` set ?',
                        req.body,
                        (error,results) => {
                            if (error) {
                                return res.send('服务器内部错误');
                            }
                            console.log(results);
                            if (results.affectedRows === 1) {
                                res.redirect('/signin');
                            } else {
                                res.render('/signup.html',{
                                    msg: '注册失败'
                                })
                            }
                        }

                    )
                }
            )
        }
       
    );

}
//处理登出逻辑
exports.handleSignout = (req,res) => {
    res.send('handleSignout');
}