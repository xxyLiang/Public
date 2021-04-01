## Ajax封装

问题：发送一次请求代码过多，发送多次请求代码冗余且重复。

解决方案：将请求代码封装到函数中，发请求时调用函数即可。

#### 原生js封装
```js
function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    }
    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options);

    var xhr = new XMLHttpRequest();
    var params = '';
    for (var attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
    }
    params = params.substr(0, params.length - 1);   // 去除最后的'&'

    // 判断请求类型作出不同响应
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    } 
    xhr.open(defaults.type, defaults.url);
    if (defaults.type == 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
    else {
        xhr.send();
    }

    xhr.onload = function () {
        if(xhr.status == 200) {
            defaults.success(xhr.responseText, xhr);
        } else {
            defaults.error(xhr.responseText, xhr);
        }
    }
}

ajax({
    type: 'get',
    url: 'http://localhost:3000',
    data: {
        name: 'jason',
        age: 18
    }
    success: function (data, xhr) {
        console.log(data);
    }
})
```

