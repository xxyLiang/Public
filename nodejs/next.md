


# npm

- node package manage(node包管理器)
- 通过npm命令安装jQuery包（npm install --save jquery），在安装时加上--save会主动生成说明书文件信息（将安装文件的信息添加到package.json里面）

### npm网站

> ​	npmjs.com	网站   是用来搜索npm包的

### npm命令行工具

npm是一个命令行工具，只要安装了node就已经安装了npm。

npm也有版本概念，可以通过`npm --version`来查看npm的版本

升级npm(自己升级自己)：

```javascript
npm install --global npm
```

### 常用命令

- npm init(生成package.json说明书文件)
  - npm init -y(可以跳过向导，快速生成)
- npm install
  - 一次性把dependencies选项中的依赖项全部安装
  - 简写（npm i）
- npm install 包名
  - 只下载
  - 简写（npm i 包名）
- npm install --save 包名
  - 下载并且保存依赖项（package.json文件中的dependencies选项）
  - 简写（npm i  包名）
- npm uninstall 包名
  - 只删除，如果有依赖项会依然保存
  - 简写（npm un 包名）
- npm uninstall --save 包名
  - 删除的同时也会把依赖信息全部删除
  - 简写（npm un 包名）
- npm help
  - 查看使用帮助
- npm 命令 --help
  - 查看具体命令的使用帮助（npm uninstall --help）

### 解决npm被墙问题

npm存储包文件的服务器在国外，有时候会被墙，速度很慢，所以需要解决这个问题。

> https://developer.aliyun.com/mirror/NPM?from=tnpm淘宝的开发团队把npm在国内做了一个镜像（也就是一个备份）。
>

安装淘宝的cnpm：

```javascript
npm install -g cnpm --registry=https://registry.npm.taobao.org;
```



```shell
#在任意目录执行都可以
#--global表示安装到全局，而非当前目录
#--global不能省略，否则不管用
npm install --global cnpm
```

安装包的时候把以前的`npm`替换成`cnpm`。

```shell
#走国外的npm服务器下载jQuery包，速度比较慢
npm install jQuery;

#使用cnpm就会通过淘宝的服务器来下载jQuery
cnpm install jQuery;
```

如果不想安装`cnpm`又想使用淘宝的服务器来下载：

```shell
npm install jquery --registry=https://npm.taobao.org;
```

但是每次手动加参数就很麻烦，所以我们可以把这个选项加入到配置文件中：

```shell
npm config set registry https://npm.taobao.org;

#查看npm配置信息
npm config list;
```

只要经过上面的配置命令，则以后所有的`npm install`都会通过淘宝的服务器来下载

# package.json

每一个项目都要有一个`package.json`文件（包描述文件，就像产品的说明书一样）

这个文件可以通过`npm init`自动初始化出来

```javascript

D:\code\node中的模块系统>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (node中的模块系统)
Sorry, name can only contain URL-friendly characters.
package name: (node中的模块系统) cls
version: (1.0.0)
description: 这是一个测试项目
entry point: (main.js)
test command:
git repository:
keywords:
author: xiaochen
license: (ISC)
About to write to D:\code\node中的模块系统\package.json:

{
  "name": "cls",
  "version": "1.0.0",
  "description": "这是一个测试项目",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "xiaochen",
  "license": "ISC"
}


Is this OK? (yes) yes
```

对于目前来讲，最有用的是`dependencies`选项，可以用来帮助我们保存第三方包的依赖信息。

如果`node_modules`删除了也不用担心，只需要在控制面板中`npm install`就会自动把`package.json`中的`dependencies`中所有的依赖项全部都下载回来。

- 建议每个项目的根目录下都有一个`package.json`文件
- 建议执行`npm install 包名`的时候都加上`--save`选项，目的是用来保存依赖信息

## package.json和package-lock.json

npm 5以前是不会有`package-lock.json`这个文件

npm5以后才加入这个文件

当你安装包的时候，npm都会生成或者更新`package-lock.json`这个文件

- npm5以后的版本安装都不要加`--save`参数，它会自动保存依赖信息
- 当你安装包的时候，会自动创建或者更新`package-lock.json`文件
- `package-lock.json`这个文件会包含`node_modules`中所有包的信息（版本，下载地址。。。）
  - 这样的话重新`npm install`的时候速度就可以提升
- 从文件来看，有一个`lock`称之为锁
  - 这个`lock`使用来锁版本的
  - 如果项目依赖了`1.1.1`版本
  - 如果你重新install其实会下载最细版本，而不是`1.1.1`
  - ``package-lock.json``的另外一个作用就是锁定版本号，防止自动升级

## path路径操作模块

> 参考文档：https://nodejs.org/docs/latest-v13.x/api/path.html

- path.basename：获取路径的文件名，默认包含扩展名
- path.dirname：获取路径中的目录部分
- path.extname：获取一个路径中的扩展名部分
- path.parse：把路径转换为对象
  - root：根路径
  - dir：目录
  - base：包含后缀名的文件名
  - ext：后缀名
  - name：不包含后缀名的文件名
- path.join：拼接路径
- path.isAbsolute：判断一个路径是否为绝对路径![image-20200315150610001](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200315150610001.png)

# Node中的其它成员(__dirname,__filename)

在每个模块中，除了`require`,`exports`等模块相关的API之外，还有两个特殊的成员：

- `__dirname`，是一个成员，可以用来**动态**获取当前文件模块所属目录的绝对路径

- `__filename`，可以用来**动态**获取当前文件的绝对路径（包含文件名）

- `__dirname`和`filename`是不受执行node命令所属路径影响的

  ![image-20200315151551873](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200315151551873.png)

在文件操作中，使用相对路径是不可靠的，因为node中文件操作的路径被设计为相对于执行node命令所处的路径。

所以为了解决这个问题，只需要把相对路径变为绝对路径（绝对路径不受任何影响）就可以了。

就可以使用`__dirname`或者`__filename`来帮助我们解决这个问题

在拼接路径的过程中，为了避免手动拼接带来的一些低级错误，推荐使用`path.join()`来辅助拼接

```javascript
var fs = require('fs');
var path = require('path');

// console.log(__dirname + 'a.txt');
// path.join方法会将文件操作中的相对路径都统一的转为动态的绝对路径
fs.readFile(path.join(__dirname + '/a.txt'),'utf8',function(err,data){
	if(err){
		throw err
	}
	console.log(data);
});
```

> 补充：模块中的路径标识和这里的路径没关系，不受影响（就是相对于文件模块）

> **注意：**
>
> **模块中的路径标识和文件操作中的相对路径标识不一致**
>
> **模块中的路径标识就是相对于当前文件模块，不受node命令所处路径影响**



# Express（快速的）

作者：Tj

原生的http在某些方面表现不足以应对我们的开发需求，所以就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码高度统一。

在node中有很多web开发框架。主要学习express

- `http://expressjs.com/`,其中主要封装的是http。

- ```javascript
  // 1 安装
  // 2 引包
  var express = require('express');
  // 3 创建服务器应用程序
  //      也就是原来的http.createServer();
  var app = express();
  
  // 公开指定目录
  // 只要通过这样做了，就可以通过/public/xx的方式来访问public目录中的所有资源
  // 在Express中开放资源就是一个API的事
  app.use('/public/',express.static('/public/'));
  
  //模板引擎在Express中开放模板也是一个API的事
  
  // 当服务器收到get请求 / 的时候，执行回调处理函数
  app.get('/',function(req,res){
      res.send('hello express');
  })
  
  // 相当于server.listen
  app.listen(3000,function(){
      console.log('app is runing at port 3000');
  })
  ```


### 学习Express

#### 起步

##### 安装：![image-20200310123723079](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200310123723079.png)

```javascript
cnpm install express
```

##### hello world:![image-20200310124850557](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200310124850557.png)

```javascript
// 引入express
var express = require('express');

// 1. 创建app
var app = express();

//  2. 
app.get('/',function(req,res){
    // 1
    // res.write('Hello');
    // res.write('World');
    // res.end()

    // 2
    // res.end('hello world');

    // 3
    res.send('hello world');
})

app.listen(3000,function(){
    console.log('express app is runing...');
})
```

##### 基本路由

路由：

- 请求方法

- 请求路径
- 请求处理函数

get:

```javascript
//当你以get方法请求/的时候，执行对应的处理函数
app.get('/',function(req,res){
    res.send('hello world');
})
```

post:

```javascript
//当你以post方法请求/的时候，执行对应的处理函数
app.post('/',function(req,res){
    res.send('hello world');
})
```

##### Express静态服务API

```javascript
// app.use不仅仅是用来处理静态资源的，还可以做很多工作(body-parser的配置)
app.use(express.static('public'));

app.use(express.static('files'));

app.use('/stataic',express.static('public'));
```

```javascript
// 引入express
var express = require('express');

// 创建app
var app = express();

// 开放静态资源
// 1.当以/public/开头的时候，去./public/目录中找对应资源
// 访问：http://127.0.0.1:3000/public/login.html
app.use('/public/',express.static('./public/')); 

// 2.当省略第一个参数的时候，可以通过省略/public的方式来访问
// 访问：http://127.0.0.1:3000/login.html
// app.use(express.static('./public/'));   

// 3.访问：http://127.0.0.1:3000/a/login.html
// a相当于public的别名
// app.use('/a/',express.static('./public/')); 

//  
app.get('/',function(req,res){
    res.end('hello world');
});

app.listen(3000,function(){
    console.log('express app is runing...');
});
```

##### 在Express中配置使用`art-templete`模板引擎

- [art-template官方文档](https://aui.github.io/art-template/)
- 在node中，有很多第三方模板引擎都可以使用，不是只有`art-template`
  - 还有ejs，jade（pug），handlebars，nunjucks

安装：

```shell
npm install --save art-template
npm install --save express-art-template

//两个一起安装
npm i --save art-template express-art-template
```

配置：

```javascript
app.engine('html', require('express-art-template'));
```

使用：

```javascript
app.get('/',function(req,res){
    // express默认会去views目录找index.html
    res.render('index.html',{
           title:'hello world'     
    });
})
```

如果希望修改默认的`views`视图渲染存储目录，可以：

```javascript
// 第一个参数views千万不要写错
app.set('views',目录路径);
```

##### 在Express中获取表单请求数据

###### 获取get请求数据：

Express内置了一个api，可以直接通过`req.query`来获取数据

```javascript
// 通过requery方法获取用户输入的数据
// req.query只能拿到get请求的数据
 var comment = req.query;
```

###### 获取post请求数据：

在Express中没有内置获取表单post请求体的api，这里我们需要使用一个第三方包`body-parser`来获取数据。

安装：

```javascript
npm install --save body-parser;
```

配置：

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）

```javascript
var express = require('express')
// 引包
var bodyParser = require('body-parser')

var app = express()

// 配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说可以直接通过req.body来获取表单post请求数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```

使用：

```javascript
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // 可以通过req.body来获取表单请求数据
  res.end(JSON.stringify(req.body, null, 2))
})
```

### 在Express中配置使用`express-session`插件操作

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

### 利用Express实现ADUS项目

#### 模块化思想

模块如何划分:

- 模块职责要单一

javascript模块化：

- Node 中的 CommonJS
- 浏览器中的：
  - AMD	require.js
  - CMD     sea.js
- es6中增加了官方支持

#### 起步

- 初始化
- 模板处理

#### 路由设计

|      请求方法|   请求路径   |  get参数    |   post参数   |    备注  |
| ---- | :--- | :--- | ---- | :--- |
|    GET  |   /students   |      |      |   渲染首页   |
| GET | /students/new | | |渲染添加学生页面  |
| POST|/students/new||name,age,gender,hobbies|处理添加学生请求|
|GET|/students/edit|id||渲染编辑页面|
|POST|/students/edit||id,name,age,gender,hobbies|处理编辑请求|
|GET|/students/delete|id||处理删除请求|

#### 提取路由模块

router.js:

```javascript
/**
 * router.js路由模块
 * 职责：
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体的请求函数
 * 模块职责要单一，我们划分模块的目的就是增强代码的可维护性，提升开发效率
 */
var fs = require('fs');

// Express专门提供了一种更好的方式
// 专门用来提供路由的
var express = require('express');
// 1 创建一个路由容器
var router = express.Router();
// 2 把路由都挂载到路由容器中

router.get('/students', function(req, res) {
    // res.send('hello world');
    // readFile的第二个参数是可选的，传入utf8就是告诉他把读取到的文件直接按照utf8编码，直接转成我们认识的字符
    // 除了这样来转换，也可以通过data.toString（）来转换
    fs.readFile('./db.json', 'utf8', function(err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        // 读取到的文件数据是string类型的数据
        // console.log(data);
        // 从文件中读取到的数据一定是字符串，所以一定要手动转换成对象
        var students = JSON.parse(data).students;
        res.render('index.html', {
            // 读取文件数据
            students:students
        })
    })
});

router.get('/students/new',function(req,res){
    res.render('new.html')
});

router.get('/students/edit',function(req,res){
    
});

router.post('/students/edit',function(req,res){
    
});

router.get('/students/delete',function(req,res){
    
});

// 3 把router导出
module.exports = router;

```

app.js:

```javascript
var router = require('./router');

// router(app);
// 把路由容器挂载到app服务中
// 挂载路由
app.use(router);
```



#### 设计操作数据的API文件模块

es6中的find和findIndex：

find接受一个方法作为参数，方法内部返回一个条件

find会便利所有的元素，执行你给定的带有条件返回值的函数

符合该条件的元素会作为find方法的返回值

如果遍历结束还没有符合该条件的元素，则返回undefined![image-20200313103810731](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200313103810731.png)

```javascript
/**
 * student.js
 * 数据操作文件模块
 * 职责：操作文件中的数据，只处理数据，不关心业务
 */
var fs = require('fs');
 /**
  * 获取所有学生列表
  * return []
  */
exports.find = function(){
    
}


 /**
  * 获取添加保存学生
  */
exports.save = function(){
        
}

/**
 * 更新学生
 */
exports.update = function(){
        
}

 /**
 * 删除学生
 */
exports.delete = function(){
        
}
```

#### 步骤

- 处理模板
- 配置静态开放资源
- 配置模板引擎
- 简单的路由，/studens渲染静态页出来
- 路由设计
- 提取路由模块
- 由于接下来的一系列业务操作都需要处理文件数据，所以我们需要封装Student.js'
- 先写好student.js文件结构
  - 查询所有学生列别哦的API
  - findById
  - save
  - updateById
  - deleteById
- 实现具体功能
  - 通过路由收到请求
  - 接受请求中的参数（get，post）
    - req.query
    - req.body
  - 调用数据操作API处理数据
  - 根据操作结果给客户端发送请求

- 业务功能顺序
  - 列表
  - 添加
  - 编辑
  - 删除

#### 子模板和模板的继承（模板引擎高级语法）【include，extend，block】

注意:

模板页：

```javascript
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>模板页</title>
	<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css"/>
	{{ block 'head' }}{{ /block }}
</head>
<body>
	<!-- 通过include导入公共部分 -->
	{{include './header.html'}}
	
	<!-- 留一个位置 让别的内容去填充 -->
	{{ block  'content' }}
		<h1>默认内容</h1>
	{{ /block }}
	
	<!-- 通过include导入公共部分 -->
	{{include './footer.html'}}
	
	<!-- 公共样式 -->
	<script src="/node_modules/jquery/dist/jquery.js" ></script>
	<script src="/node_modules/bootstrap/dist/js/bootstrap.js" ></script>
	{{ block 'script' }}{{ /block }}
</body>
</html>
```

模板的继承：

​	header页面：

```javascript
<div id="">
	<h1>公共的头部</h1>
</div>
```

​	footer页面：

```javascript
<div id="">
	<h1>公共的底部</h1>
</div>
```

模板页的使用：

```javascript
<!-- 继承(extend:延伸，扩展)模板也layout.html -->
<!-- 把layout.html页面的内容都拿进来作为index.html页面的内容 -->
{{extend './layout.html'}}

<!-- 向模板页面填充新的数据 -->
<!-- 填充后就会替换掉layout页面content中的数据 -->
<!-- style样式方面的内容 -->
{{ block 'head' }}
	<style type="text/css">
		body{
			background-color: skyblue;
		}
	</style>
{{ /block }}
{{ block 'content' }}
	<div id="">
		<h1>Index页面的内容</h1>
	</div>
{{ /block }}
<!-- js部分的内容 -->
{{ block 'script' }}
	<script type="text/javascript">
		
	</script>
{{ /block }}
```

最终的显示效果：

![image-20200316134759517](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200316134759517.png)

# MongoDB

## 关系型和非关系型数据库

### 关系型数据库（表就是关系，或者说表与表之间存在关系）。

- 所有的关系型数据库都需要通过`sql`语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空

### 非关系型数据库

- 非关系型数据库非常的灵活
- 有的关系型数据库就是key-value对儿
- 但MongDB是长得最像关系型数据库的非关系型数据库
  - 数据库 -》 数据库
  - 数据表 -》 集合（数组）
  - 表记录 -》文档对象

一个数据库中可以有多个数据库，一个数据库中可以有多个集合（数组），一个集合中可以有多个文档（表记录）

```javascript
{
    qq:{
       user:[
           {},{},{}...
       ]
    }
}
```



- 也就是说你可以任意的往里面存数据，没有结构性这么一说

## 安装

- 下载

  - 下载地址：https://www.mongodb.com/download-center/community

- 安装

  ```javascript
  npm i mongoose
  ```

- 配置环境变量

- 最后输入`mongod --version`测试是否安装成功

## 启动和关闭数据库

启动：

```shell
# mongodb 默认使用执行mongod 命令所处盼复根目录下的/data/db作为自己的数据存储目录
# 所以在第一次执行该命令之前先自己手动新建一个 /data/db
mongod
```

如果想要修改默认的数据存储目录，可以：

```javascript
mongod --dbpath = 数据存储目录路径
```

停止：

```javascript
在开启服务的控制台，直接Ctrl+C;
或者直接关闭开启服务的控制台。
```

![image-20200314101047100](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314101047100.png)

## 连接数据库

连接：

```javascript
# 该命令默认连接本机的 MongoDB 服务
mongo
```

退出：

```javascript
# 在连接状态输入 exit 退出连接
exit
```



![image-20200314100821112](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314100821112.png)

## 基本命令

- `show dbs`
  - 查看数据库列表(数据库中的所有数据库)
- `db`
  - 查看当前连接的数据库
- `use 数据库名称`
  - 切换到指定的数据库，（如果没有会新建）
- `show collections`
  - 查看当前目录下的所有数据表
- `db.表名.find()`
  - 查看表中的详细信息

## 在Node中如何操作MongoDB数据库

### 使用官方的`MongoDB`包来操作

> ​	http://mongodb.github.io/node-mongodb-native/
>

### 使用第三方包`mongoose`来操作MongoDB数据库

​	第三方包：`mongoose`基于MongoDB官方的`mongodb`包再一次做了封装，名字叫`mongoose`，是WordPress项目团队开发的。

 

> ​	https://mongoosejs.com/
>

![image-20200314105632745](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314105632745.png)

![image-20200314105717993](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314105717993.png)

## 学习指南（步骤）

官方学习文档：https://mongoosejs.com/docs/index.html

### 设计Scheme 发布Model (创建表)

```javascript
// 1.引包
// 注意：按照后才能require使用
var mongoose = require('mongoose');

// 拿到schema图表
var Schema = mongoose.Schema;

// 2.连接数据库
// 指定连接数据库后不需要存在，当你插入第一条数据库后会自动创建数据库
mongoose.connect('mongodb://localhost/test');

// 3.设计集合结构（表结构）
// 用户表
var userSchema = new Schema({
	username: { //姓名
		type: String,
		require: true //添加约束，保证数据的完整性，让数据按规矩统一
	},
	password: {
		type: String,
		require: true
	},
	email: {
		type: String
	}
});

// 4.将文档结构发布为模型
// mongoose.model方法就是用来将一个架构发布为 model
// 		第一个参数：传入一个大写名词单数字符串用来表示你的数据库的名称
// 					mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
// 					例如 这里会变成users集合名称
// 		第二个参数：架构
// 	返回值：模型构造函数
var User = mongoose.model('User', userSchema);
```

### 添加数据（增）

```javascript
// 5.通过模型构造函数对User中的数据进行操作
var user = new User({
	username: 'admin',
	password: '123456',
	email: 'xiaochen@qq.com'
});

user.save(function(err, ret) {
	if (err) {
		console.log('保存失败');
	} else {
		console.log('保存成功');
		console.log(ret);
	}
});
```

### 删除（删）

根据条件删除所有：

```javascript
User.remove({
	username: 'xiaoxiao'
}, function(err, ret) {
	if (err) {
		console.log('删除失败');
	} else {
		console.log('删除成功');
		console.log(ret);
	}
});
```

根据条件删除一个：

```javascript
Model.findOneAndRemove(conditions,[options],[callback]);
```

根据id删除一个：

```javascript
User.findByIdAndRemove(id,[options],[callback]);
```



### 更新（改）

更新所有：

```javascript
User.remove(conditions,doc,[options],[callback]);
```

根据指定条件更新一个：

```javascript
User.FindOneAndUpdate([conditions],[update],[options],[callback]);
```

根据id更新一个：

```javascript
// 更新	根据id来修改表数据
User.findByIdAndUpdate('5e6c5264fada77438c45dfcd', {
	username: 'junjun'
}, function(err, ret) {
	if (err) {
		console.log('更新失败');
	} else {
		console.log('更新成功');
	}
});
```



### 查询（查）

查询所有：

```javascript
// 查询所有
User.find(function(err,ret){
	if(err){
		console.log('查询失败');
	}else{
		console.log(ret);
	}
});
```

条件查询所有：

```javascript
// 根据条件查询
User.find({ username:'xiaoxiao' },function(err,ret){
	if(err){
		console.log('查询失败');
	}else{
		console.log(ret);
	}
});
```

条件查询单个：

```javascript
// 按照条件查询单个，查询出来的数据是一个对象（{}）
// 没有条件查询使用findOne方法，查询的是表中的第一条数据
User.findOne({
	username: 'xiaoxiao'
}, function(err, ret) {
	if (err) {
		console.log('查询失败');
	} else {
		console.log(ret);
	}
});
```

# 使用Node操作MySQL数据库

文档：https://www.npmjs.com/package/mysql

安装：

```shell
npm install --save  mysql
```

```javascript
// 引入mysql包
var mysql      = require('mysql');

// 创建连接
var connection = mysql.createConnection({
  host     : 'localhost',	//本机
  user     : 'me',		//账号root
  password : 'secret',	//密码12345
  database : 'my_db'	//数据库名
});
 
// 连接数据库	（打开冰箱门）
connection.connect();
 
//执行数据操作	（把大象放到冰箱）
connection.query('SELECT * FROM `users` ', function (error, results, fields) {
  if (error) throw error;//抛出异常阻止代码往下执行
  // 没有异常打印输出结果
  console.log('The solution is: ',results);
});

//关闭连接	（关闭冰箱门）
connection.end();
```





# 异步编程

## 回调函数

不成立的情况下：

```javascript
function add(x,y){
    console.log(1);
    setTimeout(function(){
        console.log(2);
        var ret = x + y;
        return ret;
    },1000);
    console.log(3);
    //到这里执行就结束了，不会i等到前面的定时器，所以直接返回了默认值 undefined
}

console.log(add(2,2));
// 结果是 1 3 undefined 4
```

![image-20200313085008929](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200313085008929.png)

使用回调函数解决：

回调函数：通过一个函数，获取函数内部的操作。（根据输入得到输出结果）

```javascript
var ret;
function add(x,y,callback){
    // callback就是回调函数
    // var x = 10;
    // var y = 20;
    // var callback = function(ret){console.log(ret);}
    console.log(1);
    setTimeout(function(){
        var ret = x + y;
        callback(ret);
    },1000);
    console.log(3);
}
add(10,20,function(ret){
    console.log(ret);
});
```

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200313084746701.png" alt="image-20200313084746701" style="zoom:100%;" />

注意：

​	凡是需要得到一个函数内部异步操作的结果（setTimeout,readFile,writeFile,ajax,readdir）

​	这种情况必须通过   回调函数 (异步API都会伴随着一个回调函数)

ajax:

基于原生XMLHttpRequest封装get方法：

```javascript
var oReq = new XMLHttpRequest();
// 当请求加载成功要调用指定的函数
oReq.onload = function(){
    console.log(oReq.responseText);
}
oReq.open("GET", "请求路径",true);
oReq.send();
```

```javascript
function get(url,callback){
    var oReq = new XMLHttpRequest();
    // 当请求加载成功要调用指定的函数
    oReq.onload = function(){
        //console.log(oReq.responseText);
        callback(oReq.responseText);
    }
    oReq.open("GET", url,true);
    oReq.send();
}
get('data.json',function(data){
    console.log(data);
});
```

## Promise

callback  hell（回调地狱）:

![image-20200314143410972](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314143410972.png)

文件的读取无法判断执行顺序（文件的执行顺序是依据文件的大小来决定的）(异步api无法保证文件的执行顺序)

```javascript
var fs = require('fs');

fs.readFile('./data/a.text','utf8',function(err,data){
	if(err){
		// 1 读取失败直接打印输出读取失败
		return console.log('读取失败');
		// 2 抛出异常
		// 		阻止程序的执行
		// 		把错误信息打印到控制台
		throw err;
	}
	console.log(data);
});

fs.readFile('./data/b.text','utf8',function(err,data){
	if(err){
		// 1 读取失败直接打印输出读取失败
		return console.log('读取失败');
		// 2 抛出异常
		// 		阻止程序的执行
		// 		把错误信息打印到控制台
		throw err;
	}
	console.log(data);
});
```

通过回调嵌套的方式来保证顺序：

```javascript
var fs = require('fs');

fs.readFile('./data/a.text','utf8',function(err,data){
	if(err){
		// 1 读取失败直接打印输出读取失败
		return console.log('读取失败');
		// 2 抛出异常
		// 		阻止程序的执行
		// 		把错误信息打印到控制台
		throw err;
	}
	console.log(data);
	fs.readFile('./data/b.text','utf8',function(err,data){
		if(err){
			// 1 读取失败直接打印输出读取失败
			return console.log('读取失败');
			// 2 抛出异常
			// 		阻止程序的执行
			// 		把错误信息打印到控制台
			throw err;
		}
		console.log(data);
		fs.readFile('./data/a.text','utf8',function(err,data){
			if(err){
				// 1 读取失败直接打印输出读取失败
				return console.log('读取失败');
				// 2 抛出异常
				// 		阻止程序的执行
				// 		把错误信息打印到控制台
				throw err;
			}
			console.log(data);
		});
	});
});
```

![image-20200314144807008](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314144807008.png)为了解决以上编码方式带来的问题（回调地狱嵌套），所以在EcmaScript6新增了一个API:`Promise`。![image-20200314150050839](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314150050839.png)

- Promise：承诺，保证
- Promise本身不是异步的，但往往都是内部封装一个异步任务



基本语法：

```javascript
// 在EcmaScript 6中新增了一个API Promise
// Promise 是一个构造函数

var fs = require('fs');
// 1 创建Promise容器		resolve:解决   reject：失败
var p1 = new Promise(function(resolve, reject) {
	fs.readFile('./a.text', 'utf8', function(err, data) {
		if (err) {
			// console.log(err);
			// 把容器的Pending状态变为rejected
			reject(err);
		} else {
			// console.log(data);
			// 把容器的Pending状态变为resolve
			resolve(1234);
		}
	});
});

// 当p1成功了，然后就（then）做指定的操作
// then方法接收的function就是容器中的resolve函数
p1
	.then(function(data) {
		console.log(data);
	}, function(err) {
		console.log('读取文件失败了', err);
	});

```

![image-20200315100611620](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200315100611620.png)

链式循环：![image-20200315125559136](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200315125559136.png)

封装Promise的`readFile`：

```javascript
var fs = require('fs');

function pReadFile(filePath) {
	return new Promise(function(resolve, reject) {
		fs.readFile(filePath, 'utf8', function(err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

pReadFile('./a.txt')
	.then(function(data) {
		console.log(data);
		return pReadFile('./b.txt');
	})
	.then(function(data) {
		console.log(data);
		return pReadFile('./a.txt');
	})
	.then(function(data) {
		console.log(data);
	})

```

mongoose所有的API都支持Promise：

```javascript
// 查询所有
User.find()
	.then(function(data){
        console.log(data)
    })
```

注册：

```javascript
User.findOne({username:'admin'},function(user){
    if(user){
        console.log('用户已存在')
    } else {
        new User({
             username:'aaa',
             password:'123',
             email:'fffff'
        }).save(function(){
            console.log('注册成功');
        })
    }
})
```



```javascript
User.findOne({
    username:'admin'
})
    .then(function(user){
        if(user){
            // 用户已经存在不能注册
            console.log('用户已存在');
        }
        else{
            // 用户不存在可以注册
            return new User({
                username:'aaa',
                password:'123',
                email:'fffff'
            }).save();
        }
    })
    .then(funciton(ret){
		console.log('注册成功');
    })
```



## Generator

async函数



# 其他

## 修改完代码自动重启

我们在这里可以使用一个第三方命名行工具：`nodemon`来帮助我们解决频繁修改代码重启服务器的问题。

`nodemon`是一个基于Node.js开发的一个第三方命令行工具，我们使用的时候需要独立安装：

```javascript
#在任意目录执行该命令都可以
#也就是说，所有需要 --global安装的包都可以在任意目录执行
npm install --global nodemon
npm install -g nodemon

#如果安装不成功的话，可以使用cnpm安装
cnpm install -g nodemon
```

安装完毕之后使用：

```javascript
node app.js

#使用nodemon
nodemon app.js
```

只要是通过`nodemon`启动的服务，则他会监视你的文件变化，当文件发生变化的时候，会自动帮你重启服务器。

## 封装异步API

回调函数：获取异步操作的结果

```javascript
function fn(callback){
    // var callback = funtion(data){ console.log(data); }
	setTimeout(function(){
        var data = 'hello';
        callback(data);
    },1000);
}
// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数的方式来获取
fn(function(data){
    console.log(data);
})
```

## 数组的遍历方法，都是对函数作为一种参数

![image-20200314094620191](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200314094620191.png)

## EcmaScript 6

> 参考文档：https://es6.ruanyifeng.com/

# 项目案例

## 目录结构

```javascript
.
app.js	项目的入口文件
controllers
models	存储使用mongoose设计的数据模型
node_modules	第三方包
package.json	包描述文件
package-lock.json	第三方包版本锁定文件（npm5之后才有）
public	公共静态资源
routes
views	存储视图目录
```

## 模板页

- 子模板
- 模板继承

## 路由设计

| 路由            | 方法 | get参数 | post参数                | 是否需要登录 | 备注         |
| --------------- | ---- | ------- | ----------------------- | ------------ | ------------ |
| /               | get  |         |                         |              | 渲染首页     |
| /register(登录) | get  |         |                         |              | 渲染注册页面 |
| /register       | post |         | email,nickname,password |              | 处理注册请求 |
| /login          | get  |         |                         |              | 渲染登陆界面 |
| /login          | post |         | email,password          |              | 处理登录请求 |
| /loginout       | get  |         |                         |              | 处理退出请求 |
|                 |      |         |                         |              |              |

## 模型设计

## 功能实现

## 步骤

- 创建目录结构
- 整合静态也-模板页
  - include
  - block
  - extend
- 设计用户登陆，退出，注册的路由
- 用户注册
  - 先处理客户端页面的内容（表单控件的name，收集表单数据，发起请求）
  - 服务端
    - 获取从客户端收到的数据
    - 操作数据库
      - 如果有错，发送500告诉客户端服务器错了‘
      - 其他的根据业务发送不同的响应数据
- 登录
- 退出

# Express中间件

## 中间件的概念

> 参考文档：http://expressjs.com/en/guide/using-middleware.html

![image-20200316202757617](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200316202757617.png)

中间件：把很复杂的事情分割成单个，然后依次有条理的执行。就是一个中间处理环节，有输入，有输出。

说的通俗易懂点儿，中间件就是一个（从请求到响应调用的方法）方法。

把数据从请求到响应分步骤来处理，每一个步骤都是一个中间处理环节。

```javascript
var http = require('http');
var url = require('url');

var cookie = require('./expressPtoject/cookie');
var query = require('./expressPtoject/query');
var postBody = require('./expressPtoject/post-body');

var server = http.createServer(function(){
	// 解析请求地址中的get参数
	// var obj = url.parse(req.url,true);
	// req.query = obj.query;
	query(req,res);	//中间件
	
	// 解析请求地址中的post参数
	req.body = {
		foo:'bar'
	}
});

if(req.url === 'xxx'){
	// 处理请求
	...
}

server.listen(3000,function(){
	console.log('3000 runing...');
});
```

同一个请求对象所经过的中间件都是同一个请求对象和响应对象。

```javascript
var express = require('express');
var app = express();
app.get('/abc',function(req,res,next){
	// 同一个请求的req和res是一样的，
	// 可以前面存储下面调用
	console.log('/abc');
	// req.foo = 'bar';
	req.body = {
		name:'xiaoxiao',
		age:18
	}
	next();
});
app.get('/abc',function(req,res,next){
	// console.log(req.foo);
	console.log(req.body);
	console.log('/abc');
});
app.listen(3000, function() {
	console.log('app is running at port 3000.');
});

```

![image-20200317110520098](C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20200317110520098.png)

## 中间件的分类:

### 应用程序级别的中间件

万能匹配（不关心任何请求路径和请求方法的中间件）：

```javascript
app.use(function(req,res,next){
    console.log('Time',Date.now());
    next();
});
```

关心请求路径和请求方法的中间件：

```javascript
app.use('/a',function(req,res,next){
    console.log('Time',Date.now());
    next();
});
```

### 路由级别的中间件

严格匹配请求路径和请求方法的中间件

get:

```javascript
app.get('/',function(req,res){
	res.send('get');
});
```

post：

```javascript
app.post('/a',function(req,res){
	res.send('post');
});
```

put:

```javascript
app.put('/user',function(req,res){
	res.send('put');
});
```

delete:

```javascript
app.delete('/delete',function(req,res){
	res.send('delete');
});
```

### 总

```javascript
var express = require('express');
var app = express();

// 中间件：处理请求，本质就是个函数
// 在express中，对中间件有几种分类

// 1 不关心任何请求路径和请求方法的中间件
// 也就是说任何请求都会进入这个中间件
// 中间件本身是一个方法，该方法接收三个参数
// Request 请求对象
// Response 响应对象
// next 下一个中间件
// // 全局匹配中间件
// app.use(function(req, res, next) {
// 	console.log('1');
// 	// 当一个请求进入中间件后
// 	// 如果需要请求另外一个方法则需要使用next（）方法
// 	next();
// 	// next是一个方法，用来调用下一个中间件
//  // 注意：next（）方法调用下一个方法的时候，也会匹配（不是调用紧挨着的哪一个）
// });
// app.use(function(req, res, next) {
// 	console.log('2');
// });

// // 2 关心请求路径的中间件
// // 以/xxx开头的中间件
// app.use('/a',function(req, res, next) {
// 	console.log(req.url);
// });

// 3 严格匹配请求方法和请求路径的中间件
app.get('/',function(){
	console.log('/');
});
app.post('/a',function(){
	console.log('/a');
});

app.listen(3000, function() {
	console.log('app is running at port 3000.');
});

```

## 错误处理中间件

```javascript
app.use(function(err,req,res,next){
    console.error(err,stack);
    res.status(500).send('Something broke');
});
```

配置使用404中间件：

```javascript
app.use(function(req,res){
    res.render('404.html');
});
```

配置全局错误处理中间件:

```javascript
app.get('/a', function(req, res, next) {
	fs.readFile('.a/bc', funtion() {
		if (err) {
        	// 当调用next()传参后，则直接进入到全局错误处理中间件方法中
        	// 当发生全局错误的时候，我们可以调用next传递错误对象
        	// 然后被全局错误处理中间件匹配到并进行处理
			next(err);
		}
	})
});
//全局错误处理中间件
app.use(function(err,req,res,next){
    res.status(500).json({
        err_code:500,
        message:err.message
    });
});
```





## 内置中间件

- express.static(提供静态文件)
  - http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

## 第三方中间件

> 参考文档：http://expressjs.com/en/resources/middleware.html

- body-parser
- compression
- cookie-parser
- mogran
- response-time
- server-static
- session

