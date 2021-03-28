>## 为什么要学习Node.js

- 企业需求
  - 具有服务端开发经验更改
  - front-end
  - back-end
  - 全栈开发工程师
  - 基本的网站开发能力
    - 服务端
    - 前端
    - 运维部署
  - 多人社区
<br/>

>## Node.js是什么

- Node.js是JavaScript 运行时
  - 通俗易懂的讲，Node.js是JavaScript的运行平台
  - Node.js既不是语言，也不是框架，它是一个平台
  - 浏览器中的JavaScript
    - EcmaScript
      - 基本语法
      - if
      - var
      - function
      - Object
      - Array
    - Bom
    - Dom
  - Node.js中的JavaScript
    - 没有Bom，Dom
    - EcmaScript
    - 在Node中这个JavaScript执行环境为JavaScript提供了一些服务器级别的API
      - 例如文件的读写
      - 网络服务的构建
      - 网络通信
      - http服务器
  - 构建与Chrome的V8引擎之上
    - 代码只是具有特定格式的字符串
    - 引擎可以认识它，帮你解析和执行
    - Google Chrome的V8引擎是目前公认的解析执行JavaScript代码最快的
    - Node.js的作者把Google Chrome中的V8引擎移植出来，开发了一个独立的JavaScript运行时环境
- Node.js uses an envent-driven,non-blocking I/O mode that makes it lightweight and efficent.
  -  envent-driven	事件驱动
  - non-blocking I/O mode   非阻塞I/O模型（异步）
  - ightweight and efficent.   轻量和高效
- Node.js package ecosystem,npm,is the larget scosystem of open sourcr libraries in the world
  - npm 是世界上最大的开源生态系统
  - 绝大多数JavaScript相关的包都存放在npm上，这样做的目的是为了让开发人员更方便的去下载使用
  - npm install jquery
<br/>

>## Node能做什么

- web服务器后台
- 命令行工具
  - npm(node)
  - git(c语言)
  - hexo（node）
  - ...
- 对于前端工程师来讲，接触最多的是它的命令行工具
  - 自己写的很少，主要是用别人第三方的
  - webpack
  - gulp
  - npm
<br/>

>## 安装Node环境

- 查看Node环境的版本号
- 下载：https://nodejs.org/en/
- 安装：
  - 傻瓜式安装，一路`next`
  - 安装过再次安装会升级
- 确认Node环境是否安装成功
  - 查看node的版本号：`node --version`
  - 或者`node -v`
- 配置环境变量
<br/>

>## 解析执行JavaScript

1. 创建编写JavaScript脚本文件
2. 打开终端，定位脚本文件的所属目录
3. 输入`node  文件名`执行对应的文件

注意：文件名不要用`node.js`来命名，也就是说除了`node`这个名字随便起，最好不要使用中文。

### nodemon

可以使用一个第三方命令行工具：`nodemon`来帮助我们解决频繁修改代码重启服务器问题。

`nodemon`是一个基于Node.js开发的第三方命令行工具，我们使用的时候需要独立安装：
```shell
npm install --global nodemon
```

安装完毕后，使用：
```shell
# 使用 nodemon
nodemon app.js

# 不使用 nodemon
node app.js
```
