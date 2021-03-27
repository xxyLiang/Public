// 1.加载http核心模块
var http = require('http');

// 2.使用http.createServer()创建一个web服务器
var server = http.createServer();

// 3.服务器要做的事儿
// 
server.on('request', function(request, response){
    console.log('收到客户的请求了，请求路径是：' + request.url);

    response.write('hello ');
    response.write('world');
    response.end();
})

// 4.绑定端口号，启动服务
server.listen(3000, function(){
    console.log('通过 http://127.0.0.1:3000/ 来访问');
})