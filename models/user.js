const db = require('./db_helper');

//增加一个用户
exports.createUser = (user,callback) => {
    db.query(
        'insert into `users` set ?',
        user,
        (err,results) => {
            if (err) {
                return callback(err);
            }
            if (results.affectedRows > 0) {
                //添加成功
                callback(null,true);
            } else {
                callback(null,false);
            }
        }
    );
}

//验证邮箱
exports.getByEmail = (email,callback) => {
    db.query(
        'select * from `users` where email = ?',
        email,
        (err,results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                //数据库有该邮箱
                callback(null,results[0]);
            } else {
                callback(null,null);
            }
        }
    );
}

//验证nickname
exports.getByNickname = (nickname,callback) => {
    db.query(
        'select * from `users` where nickname = ?',
        nickname,
        (err,results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                //数据库有该邮箱
                callback(null,results[0]);
            } else {
                callback(null,null);
            }
        }
    );
}