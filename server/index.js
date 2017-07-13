const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./dbModel/model.js');
const resolve = file => path.resolve(__dirname, file);
const api = require('./api.js');
const blog = require('./blog.js');
const app = express();
const config = require('./config/config.js');
const cryptoMd5 = require('./tool/cryptoMd5.js');

app.set('port', (process.env.port || config.port));
app.use(compression());
app.use(favicon(resolve('../dist/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/dist', express.static(resolve('../dist')));
// api路由
app.use(api);
// 博客路由
app.use(blog);

app.post('/api/setup', (req, res) => {
    let {name, pwd} = req.body;
    pwd = cryptoMd5(pwd);
    const token = jsonwebtoken.sign({
            name: name
        }, config.token.secret, {
            expiresIn: config.token.expired
        });
    new db.User({name, pwd})
    .save()
    .then(() => {
        res.send({token: token});
        res.status(200).end();
        db.initialized = true;
    })
    .catch(() => res.status(500).end());
});

app.get(['/login', '/console'], (req, res) => {
    const fileName = db.initialized ? 'index.html': 'setup.html';
    const html = fs.readFileSync(resolve('../' + fileName), 'utf-8');
    res.send(html);
});

app.get('/', (req, res) => {
    res.send('Main Page').end();
});

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'));
});