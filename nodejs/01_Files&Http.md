## 文件的读写

>#### 文件读取

```javascript
//浏览器中的JavaScript是没有文件操作能力的
//但是Node中的JavaScript具有文件操作能力
//fs是file-system的简写，就是文件系统的意思
//在Node中如果想要进行文件的操作就必须引用fs这个核心模块
//在fs这个和兴模块中，就提供了人所有文件操作相关的API
//例如 fs.readFile就是用来读取文件的

//  1.使用fs核心模块
var fs = require('fs');

// 2.读取文件
fs.readFile('./data/a.txt',function(error, data){
    // 成功：   error: null
    //          data: 数据
    // 失败:    error: 错误对象
    //          data: undefined
   if(error){
        console.log('文件读取失败');
   }
    else{
         console.log(data.toString()); // data默认是二进制
    }
})
```
<br/>

>#### 文件写入

```javascript
// 1.使用fs核心模块
var fs = require('fs');

// 2.将数据写入文件
fs.writeFile('./data/a.txt', '我是文件写入的信息', function(error, data){
    // 成功： 文件写入成功，error 是 null
    // 失败： 文件写入失败，error 是错误对象
   if(error){
        console.log('文件写入失败');
   } else {
        console.log(data.toString());
    }
})
```
<br/>

## HTTP
&emsp;&emsp;使用Node构建一个Web服务器。在Node中专门提供了一个核心模块 `http`，这个模块的职责就是帮你创建编写的服务器的。

#### 服务器要做的事
- 提供服务：对数据服务
- 发请求
- 接收请求
- 处理请求
- 反馈（发送响应）
 
&emsp;&emsp;当客户端请求过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调处理函数。

&emsp;&emsp;response对象有一个方法：write 可以用来给客户端发送响应数据。write 可以使用多次，但是最后一定要使用end来结束响应，否则客户端会一直等待

&emsp;&emsp;响应的数据只能是二进制数据或者字符串
- `JSON.stringify()`

```js
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
    // 或者直接：
    response.end('hello world');
})

// 4.绑定端口号，启动服务
server.listen(3000, function(){
    console.log('通过 http://127.0.0.1:3000/ 来访问');
})

```
