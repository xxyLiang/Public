// 1.加载http核心模块
var http = require('http');

// 2.使用http.createServer()创建一个web服务器
var server = http.createServer();

// 3.服务器要做的事儿
// 
server.on('request', function(request, response){
    console.log('收到客户的请求了，请求路径是：' + request.url);

    // 设置header，html格式文本，编码为utf-8
    response.setHeader('Content-Type', 'text/html; charset=utf-8')

    response.write('hello ');
    response.write('world');
    response.end();

    // 或者：
    // response.end('hello world');
})

// 4.绑定端口号，启动服务
server.listen(3000, function(){
    console.log('通过 http://127.0.0.1:3000/ 来访问');
})


// 合并版本
var http = require('http');
http
    .createServer(function(req, res){
        res.end('');
    })
    .listen(3000, function(){
        console.log('');
    })