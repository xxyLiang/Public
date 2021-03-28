## Node中的模块系统

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

#### CommonJS模块规范

在Node中的JavaScript还有一个重要的概念，模块系统。

- 模块作用域
- 使用require方法来加载模块
- 使用exports接口对象来导出模板中的成员
<br/>

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
<br/>

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
Apache目录的制作：
```javascript
// 引用服务
var http = require('http');
var fs = require('fs');
// 引用模板
var template = require('art-template');
// 创建服务
var server = http.createServer();
// 公共路径
var wwwDir = 'D:/';
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
                title: 'D:/ 的索引',
                files: files 
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

jQuery中的`each`和原生JavaScript方法`forEach`的区别：
- 提供源头：
  - 原生js是es5提供的（不兼容IE8）
  - jQuery的`each`是jQuery第三方库提供的（如果要使用需要用2以下的版本也就是1.版本），它的`each`方法主要用来遍历jQuery实例对象（伪数组），同时也可以做低版本`forEach`的替代品，jQuery的实例对象不能使用`forEach`方法，如果想要使用必须转为数组（`[].slice.call`(jQuery实例对象)）才能使用

<br/>

>## require的加载规则
- 优先从缓存加载
- 判断模块标识符
  - 核心模块
  - 自己写的模块（路径形式的模块）
    - ./  当前目录 不可省略
    - ../  上一级目录  不可省略
    -  /xxx也就是D:/xxx
    - 带有绝对路径几乎不用（D:/a/foo.js）
  - 第三方模块（node_modules）
    - 第三方模块的标识就是第三方模块的名称（不可能有第三方模块和核心模块的名字一致）
    - npm
      - 开发人员可以把写好的框架库发布到npm上
      - 使用者通过npm命令来下载
    - 使用方式：`var 名称 = require('npm install【下载包】 的包名')`
      - node_modules/express/package.json main
      - 如果package.json或者main不成立，则查找被选择项：index.js
      - 如果以上条件都不满足，则继续进入上一级目录中的node_modules按照上面的规则依次查找，直到当前文件所属此盘根目录都找不到最后报错

