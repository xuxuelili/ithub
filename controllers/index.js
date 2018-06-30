exports.showIndex = (req,res) => {
    // res.send('index01.html');
    res.render('index.html',{
        user: req.session.user
    });
}