var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer  = require('multer');
var app = express();

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));

// 主页输出 "Hello World"
app.get('/', function (req, res) {
    console.log('主页 GET 请求');
    res.send('Hello GET');
});
// POST 请求
app.post('/', function (req, res) {
    console.log('主页 POST 请求');
    res.send('Hello POST');
});

app.get('/*.html', function (req, res) {
    res.sendFile(__dirname + req.originalUrl);
});
app.get('/process_get', function (req, res) {
    // 输出 JSON 格式
    const response = {
        firstName: req.query.first_name,
        lastName: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
app.post('/process_post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    const response = {
        firstName: req.body.first_name,
        lastName: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});

// /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log('/del_user 响应 DELETE 请求');
    res.send('删除页面');
});

// /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log('/list_user GET 请求');
    res.send('用户列表页面');
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
    console.log('/ab*cd GET 请求');
    res.send('正则匹配');
});

// 接收文件上传
app.post('/file_upload', function (req, res) {
    console.log(req.files[0]);// 上传的文件信息
    var desFile = __dirname + '/static/temp/' + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(desFile, data, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                var response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

var server = app.listen(8081, function () {
    console.log('主页，访问地址为 http://127.0.0.1:%s/index.html', server.address().port);
    console.log('上传文件，访问地址为 http://127.0.0.1:%s/fileupload.html', server.address().port);
});
