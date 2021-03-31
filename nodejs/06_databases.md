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
