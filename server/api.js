const express = require('express');
const router = express.Router();
const db = require('./db.js');
const cryptoMd5 = require('./tool/cryptoMd5.js');
const fn = () => { };

router.get('/api/getArticle', (req, res) => {
    const start = new Date().getTime();
    const _id = req.query.id;
    db.Article.findOne({ _id }, (err, doc) => {
        if (err) {
            console.log(err);
        } else if (doc) {
            const execTime = new Date().getTime() - start;
            res.set('X-Response-Time', `${execTime}ms`);
            res.send(doc);
        }
    });
});

router.get('/api/getArticles', (req, res) => {
    const start = new Date().getTime();
    db.Article.find(null, 'articleTitle author postTime content', (err, doc) => {
        if (err) {
            console.log(err);
        } else if (doc) {
            const execTime = new Date().getTime() - start;
            res.set('X-Response-Time', `${execTime}ms`);
            res.send(JSON.stringify(doc));
        }
    });
});

router.post('/api/login', (req, res) => {
    const start = new Date().getTime();
    let { name, pwd } = req.body;
    db.User.findOne({ name }, 'pwd', (err, doc) => {
        pwd = cryptoMd5(pwd);
        const execTime = new Date().getTime() - start;
        res.set('X-Response-Time', `${execTime}ms`);
        switch (true) {
            case !!err:
                console.log(err);
                break;
            case !doc:
                res.send({ state: 0, msg: '账号不存在！' });
                break;
            case doc.pwd === pwd:
                res.send({ state: 1, msg: '登陆成功！' });
                break;
            case doc.pwd !== pwd:
                res.send({ state: 2, msg: '密码错误！' });
                break;
            default:
                res.send({ state: 3, msg: '未知错误！' });
        }
        
    });
});

router.post('/api/saveArticle', (req, res) => {
    const start = new Date().getTime();
    const id = req.body._id;
    // TODO：加入最后更新时间
    const article = {
        articleTitle: req.body.articleTitle,
        author: req.body.author,
        tags: req.body.tags,
        content: req.body.content
    };

    if(id){
        db.Article.findByIdAndUpdate(id, article, fn);
    } else {
        new db.Article(article).save();
    }

    const execTime = new Date().getTime() - start;
    res.set('X-Response-Time', `${execTime}ms`);
    res.status(200).end();
});

router.post('/api/deleteArticle', (req, res) => {
    const start = new Date().getTime();
    db.Article.findByIdAndRemove(req.body.id, fn);
    const execTime = new Date().getTime() - start;
    res.set('X-Response-Time', `${execTime}ms`);
    res.status(200).end();
});

router.post('/api/getLinks', (req, res) => {
    const start = new Date().getTime();
    db.Link.find(null, (err, doc) => {
        if(err){
            console.log(err);
        } else if(doc){
            const execTime = new Date().getTime() - start;
            res.set('X-Response-Time', `${execTime}ms`);
            res.send(doc);
        }
    });
});

router.post('/api/saveLinks', (req, res) => {
    //const start = new Date().getTime();
    // todo
    const links = req.body || [];
    db.Link.remove(null, fn);
    const promises = links.map(({name, href}) => new db.Link({name, href}).save());
    Promise.all(promises)
    .then(() => res.status(200).end())
    .catch(() => res.status(200).end());
});

router.post('/api/savePwd', (req, res) => {
    const start = new Date().getTime();
    let {name, pwd} = req.body;
    pwd = cryptoMd5(pwd);
    db.User.findOneAndUpdate({name}, {pwd}, fn);
    const execTime = new Date().getTime() - start;
    res.set('X-Response-Time', `${execTime}ms`);
    res.status(200).end();
});

module.exports = router;

