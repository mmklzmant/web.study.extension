var express = require('express');
var router = express.Router();

//配置路由
router.get('/', function(req, res){
    res.render('home');
});
router.get('/about', function(req, res){
    res.render('about', {users: [{name: 'jack', age: 23},
        {name: 'Bill', age: 33}]});
});
router.get('/contact', function(req, res){
    //不能以斜杠开头
    res.render('contact');
});

module.exports = router;