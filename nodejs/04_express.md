# Express


&emsp;&emsp;原生的http在某些方面表现不足以应对我们的开发需求，所以就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码高度统一。

&emsp;&emsp;在node中有很多web开发框架。主要学习express，主要封装的是http。[express官网](http://expressjs.com/)

安装express：
```shell
npm install express --save
```

使用express：
```javascript
var express = require('express');
// 创建服务器应用程序，也就是原来的http.createServer();
var app = express();

app.get('/', function(req, res){
    res.send('hello express');
})  // 当服务器收到get请求 / 的时候，执行回调处理函数

app.get('/intro', function(req, res){
    res.send('This is intro page');
})  // 不用像http那样使用大段 if-else 来判断url

app.listen(3000, function(){
    console.log('app is runing at port 3000');
})  // 相当于server.listen
```
<br/>

>## 学习Express

#### 基本路由

路由：

- 请求方法

- 请求路径
- 请求处理函数

get:

```javascript
//当你以get方法请求/的时候，执行对应的处理函数
app.get('/', function(req, res){
    res.send('hello world');
})
```

post:

```javascript
//当你以post方法请求/的时候，执行对应的处理函数
app.post('/', function(req, res){
    res.send('hello world');
})
```
<br/>

#### Express静态服务API

```javascript

app.use(express.static('./public/')); 
// 访问/public/中的文件，可省略'/public/'

app.use('/public/',express.static('./public/'));
// 开放public文件夹中的资源

app.use('/static/',express.static('./public/'));
// 访问'/public/xxx'文件，需要定位为'/static/xxx' （取别名）
```
<br/>

#### 在Express中配置使用`art-templete`模板引擎

- [art-template官方文档](https://aui.github.io/art-template/)
- 在node中，有很多第三方模板引擎都可以使用，不是只有`art-template`
  - 还有`ejs`，`jade（pug）`，`handlebars`，`nunjucks`

安装：

```shell
npm install --save art-template
npm install --save express-art-template

# 两个一起安装
npm i -S art-template express-art-template
```

配置：
- 配置使用`art-template`模板引擎
- 第一个参数表示当渲染以`.html`结尾的文件的时候，使用`art-template`模板引擎。
- `express-art-template`是专门用来在Express中把`art-template`整合到Express中的。
```javascript
var express = require('express);
var app = express();
app.engine('html', require('express-art-template'));
```

使用：
- Express为`Resopnse`相应对象提供了一个方法：`render`，`render`方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
- `res.render('html模板名', {模板数据})`
- 第一个参数不能写路径，默认会去项目中的views目录查找该模板文件。也就是说开发人员把所有的视图文件都放到views目录中。
```javascript
app.get('/', function(req,res){
    res.render('index.html', {
        title:'hello world'     
    });
})
```

如果希望修改默认的`views`视图渲染存储目录，可以：
```javascript
// 第一个参数views千万不要写错
app.set('views', 目录路径);
```
<br/>

>## GET & POST请求数据

#### 获取get请求数据

Express内置了一个api，可以直接通过`req.query`来获取数据

```javascript
// 通过requery方法获取用户输入的数据
// req.query只能拿到get请求的数据
 var comment = req.query;
```

#### 获取post请求数据

在Express中没有内置获取表单post请求体的api，这里我们需要使用一个第三方包`body-parser`的中间件来获取数据。

安装：

```javascript
npm install --save body-parser;
```

配置：
```javascript
var express = require('express');
var bodyParser = require('body-parser'); // 引包
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// 配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说可以直接通过req.body来获取表单post请求数据

// parse application/json
app.use(bodyParser.json());
```

使用：
```javascript
app.post('/post', function(req, res) {
    console.log(req.body);

    // 重定向网页
    res.redirect('/')
})
```
<br/>

>## 路由模块

Express专门提供了一种更好的方式，专门用来提供路由的。

`router.js`部分：
- 职责：
  - 处理路由
  - 根据不同的请求方法+请求路径设置具体的请求函数
```javascript
var express = require('express');
// 1 创建一个路由容器
var router = express.Router();

// 2 把路由都挂载到路由容器中
router.get('/p1', function(req, res) {
    res.render('1.html')
});

router.get('/p2',function(req,res){
    res.render('2.html')
});

router.get('/p3',function(req,res){
    res.render('3.html')
});

// 3 把router导出
module.exports = router;
```

`app.js`部分:
- 职责：
  - 入口模块
  - 创建服务
  - 服务相关配置
    - 模板引擎
    - 提供静态资源服务
  - 挂载路由
  - 监听端口启动服务
```javascript
var express = require('express');
var app = express();

var router = require('./router');
// 把路由容器挂在到app服务中，如果使用body-parser，一定要在此之前配置
app.use(router);

app.listen(3000, function(){
    console.log('running...');
})
```
<br/>

>### 在Express中配置使用`express-session`插件操作

> 参考文档：https://github.com/expressjs/session

安装：

```javascript
npm install express-session
```

配置：

```javascript
//该插件会为req请求对象添加一个成员:req.session默认是一个对象
//这是最简单的配置方式
//Session是基于Cookie实现的
app.use(session({
  //配置加密字符串，他会在原有的基础上和字符串拼接起来去加密
  //目的是为了增加安全性，防止客户端恶意伪造
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,//无论是否适用Session，都默认直接分配一把钥匙
  cookie: { secure: true }
}))
```

使用：

```javascript
// 读
//添加Session数据
//session就是一个对象
req.session.foo = 'bar';

//写
//获取session数据
req.session.foo

//删
req.session.foo = null;
delete req.session.foo
```

提示：

默认Session数据时内存储数据，服务器一旦重启，真正的生产环境会把Session进行持久化存储。
