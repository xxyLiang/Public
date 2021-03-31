### Ajax的实现步骤

```js
// 1. 创建Ajax对象
var xhr = new XMLHttpRequest();

// 2. 告诉Ajax请求地址以及请求方式
xhr.open('get', 'http://www.baidu.com');

// 3. 发送请求
xhr.send();

// 4. 获取服务器端基于客户端的响应数据，获取到数据后会xhr会触发onload
xhr.onload = function(){
    console.log(xhr.resonseText);
}
```
<br/>

### 请求参数传递

前端
```js
var xhr = new XMLHttpRequest();

// get请求方式
xhr.open('get', 'http://localhost:3000/get?val1=123&val2=456')
xhr.send();


// post请求方式
// 1. 以字符串方式传递
xhr.open('post', 'http://localhost:3000/post')
// 设置请求参数格式的类型（post请求必须要设置）
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('val1=123&val2=456');  // 参数放在send()中

// 2. 以json格式传递
xhr.open('post', 'http://localhost:3000/json')
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({val1: '123', val2: '456'}));  // json格式的字符串
```
<br/>

后端
```js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());   // 接受字符串格式的post参数
app.use(bodyParser.json());     // 接受json格式的post参数

app.get('/get', (req, res) => {
    var params = req.query;
    res.send(params);
})

app.post('/post', (req, res) => {
    var params = req.body;
    res.send(params);
})

app.post('/json', (req, res) => {
    var params = req.body;
    res.send(params);
})
```