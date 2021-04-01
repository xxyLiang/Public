
## Node中的其它成员(__dirname,__filename)

在每个模块中，除了`require`,`exports`等模块相关的API之外，还有两个特殊的成员：

- `__dirname`，是一个成员，可以用来**动态**获取当前文件模块所属目录的绝对路径

- `__filename`，可以用来**动态**获取当前文件的绝对路径（包含文件名）

- `__dirname`和`filename`是不受执行node命令所属路径影响的


在文件操作中，使用相对路径是不可靠的，因为node中文件操作的路径被设计为相对于执行node命令所处的路径。

所以为了解决这个问题，只需要把相对路径变为绝对路径（绝对路径不受任何影响）就可以了。

就可以使用`__dirname`或者`__filename`来帮助我们解决这个问题

在拼接路径的过程中，为了避免手动拼接带来的一些低级错误，推荐使用`path.join()`来辅助拼接

```javascript
var fs = require('fs');
var path = require('path');

// console.log(__dirname + 'a.txt');
// path.join方法会将文件操作中的相对路径都统一的转为动态的绝对路径
fs.readFile(path.join(__dirname + '/a.txt'), 'utf8', function(err,data){
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
<br/>

### 回调函数

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

注意：

​	凡是需要得到一个函数内部异步操作的结果（`setTimeout`，`readFile`，`writeFile`，`ajax`，`readdir`），这种情况必须实用回调函数 (异步API都会伴随着一个回调函数)。

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




