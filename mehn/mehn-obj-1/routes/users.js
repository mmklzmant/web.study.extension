var express = require('express');
var router = express.Router();


//配置路由
router.get('/signin', function(req, res){
    res.render('users/signin');
});
router.get('/signup', function(req, res){
    res.render('users/signup');
});

module.exports = router;