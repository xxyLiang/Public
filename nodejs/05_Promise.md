## Promise

callback  hell（回调地狱）：文件的读取无法判断执行顺序（文件的执行顺序是依据文件的大小来决定的）(异步api无法保证文件的执行顺序)

```javascript
var fs = require('fs');

fs.readFile('./data/a.text','utf8',function(err,data){
    if(err){
        throw err;
    }
    console.log(data);
});

fs.readFile('./data/b.text','utf8',function(err,data){
    if(err){
        throw err;
    }
    console.log(data);
});

fs.readFile('./data/c.text','utf8',function(err,data){
    if(err){
        throw err;
    }
    console.log(data);
});
// a b c三个文件的读取顺序不能确定
```

通过回调嵌套的方式来保证顺序：

```javascript
var fs = require('fs');

fs.readFile('./data/a.text','utf8',function(err,data){
    if(err){
        throw err;
    }
    console.log(data);
    fs.readFile('./data/b.text','utf8',function(err,data){
        if(err){
            throw err;
        }
        console.log(data);
        fs.readFile('./data/c.text','utf8',function(err,data){
            if(err){
                throw err;
            }
            console.log(data);
        });
    });
});
// 问题：代码难看，难以维护
```

`Promise`
- 提供一种使异步函数按照确定的顺序执行的方法
- `Promise`本身不是异步的，但往往都是内部封装一个异步任务


基本语法：

```javascript
// 在EcmaScript 6中新增了一个API Promise
// Promise 是一个构造函数
// Promise 有三个状态：从Pending转化为resolve或reject

var fs = require('fs');
// 1 创建Promise容器		resolve:解决   reject：失败
var p1 = new Promise(function(resolve, reject) {
    fs.readFile('./a.text', 'utf8', function(err, data) {
        if (err) {
            // 把容器的Pending状态变为rejected
            reject(err);
        } else {
            // 把容器的Pending状态变为resolve
            resolve(data);
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
&nbsp;
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
        return pReadFile('./c.txt');
    })
    .then(function(data) {
        console.log(data);
    })

```