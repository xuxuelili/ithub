const db = require('./db_helper');

//添加话题
exports.createTopic = (topic,callback) => {
    db.query(
        'insert into `topics` set ?',
        topic,
        (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.affectedRows > 0) {
                //添加成功
                callback(null, true);
            } else {
                //添加失败
                callback(null, false);
            }
        }
    );
}

//根据id查询话题
exports.getById = (id, callback) => {
    db.query(
        'select * from `topics` where id = ?',
        id,
        (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                //查询到了数据
                callback(null, results[0]);
            } else {
                //没有查询到数据
                callback(null, null)
            }
        }
    );
}

//根据id删除话题
exports.delect = (id, callback) => {
    db.query(
        'delete from `topics` where id = ?',
        id,
        (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length > 0) {
                //查询到了数据
                callback(null, results[0]);
            } else {
                //没有查询到数据
                callback(null, null)
            }
        }
    );
}

//修改话题
exports.updata = (topic, callback) => {
    db.query(
        'update `topics` set `title`=?, `content`=?, categoryId=? where id=?',
        [topic.title, topic.content, topic.categoryId, topic.id],
        (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.affectedRows > 0) {
                callback(null, true)
            } else {
                callback(null, false)
            }
        }
    );
}

//查询所有话题
exports.getAll = (callback) => {
    db.query(
        'select topics.id, nickname, title, topics.createdAt from `topics` JOIN `users` ON userId = users.id order by topics.createdAt desc ',
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        }
    );
}