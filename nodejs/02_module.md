>## Node中的模块系统

使用Node编写应用程序主要就是在使用：

- EcmaScript语言
  - 和浏览器一样，在Node中没有Bom和Dom

- 核心模块
  - 文件操作的fs
  - http服务操作的http
  - url路径操作模块
  - path路径处理模块
  - os操作系统信息
- 第三方模块
  - art-template
  - 必须通过npm来下载才可以使用
- 自己写的模块
  - 自己创建的文件

<br/>

>## 模块化

- 文件作用域(模块是独立的，在不同的文件使用必须要重新引用)【在node中没有全局作用域，它是文件模块作用域】
- 通信规则
  - 加载require
  - 导出exports
&nbsp;
#### CommonJS模块规范

在Node中的JavaScript还有一个重要的概念，模块系统。

- 模块作用域
- 使用require方法来加载模块
- 使用exports接口对象来导出模板中的成员

#### 加载require

语法：

```js
    var 自定义变量名 = require('模块')
```
作用：
- 执行被加载模块中的代码
- 得到被加载模块中的`exports`导出接口对象

#### 导出exports
- Node中是模块作用域，默认文件中所有的成员只在当前模块有效
- 对于希望可以被其他模块访问到的成员，我们需要把这些公开的成员都挂载到`exports`接口对象中就可以了。

导出多个成员（必须在对象中）：
```javascript
exports.a = 123;
exports.b = function(){
    console.log('bbb')
};
exports.c = {
    foo:"bar"
};
exports.d = 'hello';
```

导出单个成员（拿到的就是函数，字符串）：
```javascript
module.exports = 'hello';
```

以下情况会覆盖：
```javascript
module.exports = 'hello';
//后者会覆盖前者
module.exports = function add(x, y) {
    return x+y;
}
```

也可以通过以下方法来导出多个成员：

```javascript
module.exports = {
    foo: 'hello',
    add: function(x, y){
        return x+y;
    }
};
```

#### 模块原理

exports和`module.exports`的一个引用：

```javascript
console.log(exports === module.exports);	//true
exports.foo = 'bar';
//等价于
module.exports.foo = 'bar';
```

当给exports重新赋值后，`exports != module.exports`

最终return的是`module.exports`，无论`exports`中的成员是什么都没用。

真正去使用的时候：
```javascript
// 导出单个成员：
exports.xxx = xxx;

// 导出多个成员：
module.exports 或者 modeule.exports = {};
```
<br/>

>## 总结

```javascript
// 引用服务
var http = require('http');
var fs = require('fs');
// 引用模板
var template = require('art-template');
// 创建服务
var server = http.createServer();
// 公共路径
var wwwDir = 'D:/app/www';
server.on('request', function (req, res) {
    var url = req.url;
    // 读取文件
    fs.readFile('./template-apche.html', function (err, data) {
        if (err) {
            return res.end('404 Not Found');
        }
        fs.readdir(wwwDir, function (err, files) {
            if (err) {
                return res.end('Can not find www Dir.')
            }
            // 使用模板引擎解析替换data中的模板字符串
            // 去xmpTempleteList.html中编写模板语法
            var htmlStr = template.render(data.toString(), { 
                title: 'D:/app/www/ 的索引',
                files:files 
            });
            // 发送响应数据
            res.end(htmlStr);
        })
    })
});
server.listen(3000, function () {
    console.log('running....');
})
```

```javascript
1.jQuery中的each 和 原生JavaScript方法forEach的区别：
	提供源头：
    	原生js是es5提供的（不兼容IE8）,
        jQuery的each是jQuery第三方库提供的（如果要使用需要用2以下的版本也就是1.版本）,它的each方法主要用来遍历jQuery实例对象（伪数组）,同时也可以做低版本forEach的替代品,jQuery的实例对象不能使用forEach方法，如果想要使用必须转为数组（[].slice.call(jQuery实例对象)）才能使用
2.模块中导出多个成员和导出单个成员
3.301和302的区别：
	301永久重定向,浏览器会记住
    302临时重定向
4.exports和module.exports的区别:
	每个模块中都有一个module对象
    module对象中有一个exports对象
    我们可以把需要导出的成员都挂载到module.exports接口对象中
	也就是`module.exports.xxx = xxx`的方式
    但是每次写太多了就很麻烦，所以Node为了简化代码，就在每一个模块中都提供了一个成员叫`exports`
    `exports === module.exports`结果为true,所以完全可以`exports.xxx = xxx`
    当一个模块需要导出单个成员的时候必须使用`module.exports = xxx`的方式，=,使用`exports = xxx`不管用,因为每个模块最终return的是module.exports,而exports只是module.exports的一个引用,所以`exports`即使重新赋值,也不会影响`module.exports`。
    有一种赋值方式比较特殊：`exports = module.exports`这个用来新建立引用关系的。
    
```
<br/>

>## require的加载规则
- 优先从缓存加载
- 判断模块标识符
  - 核心模块
  - 自己写的模块（路径形式的模块）
  - 第三方模块（node_modules）
    - 第三方模块的标识就是第三方模块的名称（不可能有第三方模块和核心模块的名字一致）
    - npm
      - 开发人员可以把写好的框架库发布到npm上
      - 使用者通过npm命令来下载
    - 使用方式：`var 名称 = require('npm install【下载包】 的包名')`
      - node_modules/express/package.json main
      - 如果package.json或者main不成立，则查找被选择项：index.js
      - 如果以上条件都不满足，则继续进入上一级目录中的node_modules按照上面的规则依次查找，直到当前文件所属此盘根目录都找不到最后报错

```javascript
// 如果非路径形式的标识
// 路径形式的标识：
    // ./  当前目录 不可省略
    // ../  上一级目录  不可省略
    //  /xxx也就是D:/xxx
    // 带有绝对路径几乎不用（D:/a/foo.js）
// 首位表示的是当前文件模块所属磁盘根目录
// require('./a'); 


// 核心模块
// 核心模块本质也是文件，核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
require('fs'); 

// 第三方模块
// 凡是第三方模块都必须通过npm下载（npm i node_modules），使用的时候就可以通过require('包名')来加载才可以使用
// 第三方包的名字不可能和核心模块的名字是一样的
// 既不是核心模块，也不是路径形式的模块
//      先找到当前文所述目录的node_modules
//      然后找node_modules/art-template目录
//      node_modules/art-template/package.json
//      node_modules/art-template/package.json中的main属性
//      main属性记录了art-template的入口模块
//      然后加载使用这个第三方包
//      实际上最终加载的还是文件

//      如果package.json不存在或者mian指定的入口模块不存在
//      则node会自动找该目录下的index.js
//      也就是说index.js是一个备选项，如果main没有指定，则加载index.js文件
//      
        // 如果条件都不满足则会进入上一级目录进行查找
// 注意：一个项目只有一个node_modules，放在项目根目录中，子目录可以直接调用根目录的文件
var template = require('art-template');

```

### 模块标识符中的`/`和文件操作路径中的`/`

文件操作路径：

```javascript
// 咱们所使用的所有文件操作的API都是异步的
// 就像ajax请求一样
// 读取文件
// 文件操作中 ./ 相当于当前模块所处磁盘根目录
// ./index.txt    相对于当前目录
// /index.txt    相对于当前目录
// /index.txt   绝对路径,当前文件模块所处根目录
// d:express/index.txt   绝对路径
fs.readFile('./index.txt',function(err,data){
    if(err){
       return  console.log('读取失败');
    }
    console.log(data.toString());
})
```

模块操作路径：

```javascript
// 在模块加载中，相对路径中的./不能省略
// 这里省略了.也是磁盘根目录
require('./index')('hello')
```

