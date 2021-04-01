## Ajax运行原理及实现

>### Ajax状态码（旧特性）

&emsp;&emsp;在创建ajax对象，配置ajax对象，发送请求，以及接受完服务器端响应数据，这个过程中的每一个步骤都会对应一个数值，这个数值就是ajax状态码。
- 0：请求未初始化（还没有调用open）
- 1：请求已经建立，但是还没有发送（还没有调用send）
- 2：请求已经发送
- 3：请求正在处理中，通常响应中已经有部分数据可以用了
- 4：响应已经完成，可以获取并实用服务器的响应了

```js
xhr.readyState  // 获取Ajax状态码
```

&emsp;&emsp;由于状态码在`send()`后不断变化，ajax中提供了`onreadystatechange`事件，当Ajax状态码发生变化时自动触发该事件。(javascript中，事件函数也是回调函数的一种)

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'http://loacalhost:3000);
// 需要在send()前定义事件
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {  // 状态码变为2、3、4时都会被调用
        console.log(xhr.responseText);
    }
}
xhr.send();
```

##### 两种获取服务器端响应方式的区别
| 区别描述               | onload事件 | onreadystatechange事件 |
| ---------------------- | ---------- | ---------------------- |
| 是否兼容IE低版本       | 不兼容     | 兼容                   |
| 是否需要判断Ajax状态码 | 不需要     | 需要                   |
| 被调用次数             | 一次       | 多次                   |

<br/>

>### Ajax错误处理

1. 网络畅通，服务器端能接收到请求，服务器端返回的结果不是预期结果。
   **可以判断服务器端返回的状态码，分别进行处理。`xhr.status`获取http状态码。**
    ```js
    // 服务器端
    res.status(400).send('not ok');

    // 浏览器端
    xhr.onload = function() {
        console.log(xhr.status);
    }
    ```
2. 网络畅通，服务器端没有接收到请求，返回404状态码。
   **检查请求地址是否错误。**
3. 网络畅通，服务器端能接收到请求，服务器端返回500状态码。
   **服务器端错误，找后端程序员进行沟通。**
4. 网络中断，请求无法发送到服务器端。
   **会触发xhr对象下面的`onerror`事件，在`onerror`事件处理函数中对错误进行处理。**
   ```js
    xhr.onerror = function() {
        alert('网络中断');
    }
   ```


