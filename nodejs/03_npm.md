# npm

- Node Package Manage（node包管理器）
- 通过npm命令安装jQuery包`npm install jquery --save`，在安装时加上`--save`，会主动将jQuery添加到该项目的依赖包，依赖包信息保存在`package.json`文件里。
- 后面再次装该项目的依赖包时，只需要执行`npm install`，就会自动将`package.json`中的`dependencies`所有依赖项都下载回来。

npm网站：npmjs.com   是用来搜索npm包的
<br/>

>## npm命令行工具

- npm是一个命令行工具，只要安装了node就已经安装了npm。
- npm也有版本概念，可以通过`npm --version`来查看npm的版本
- 升级npm（自己升级自己）：
    ```javascript
    npm install --global npm
    ```

#### 常用命令

- `npm init`（生成package.json说明书文件）
  - `npm init -y`（可以跳过向导，快速生成）
- `npm install`
  - 一次性把`dependencies`选项中的依赖项全部安装
  - 简写 `npm i`
- `npm install 包名`
  - 只下载某一个包
  - 简写 `npm i 包名`
- `npm install --save 包名`
  - 下载并且保存依赖项（`package.json`文件中的`dependencies`选项）
  - 简写 `npm i -S 包名`
- `npm uninstall 包名`
  - 只删除该包，如果有依赖项会依然保存
  - 简写 `npm un 包名`
- `npm uninstall --save 包名`
  - 删除的同时也会把依赖信息全部删除
  - 简写 `npm un -S 包名`
- `npm help`
  - 查看使用帮助
- `npm 命令 --help`
  - 查看具体命令的使用帮助（`npm uninstall --help`）

#### 解决npm被墙问题

npm存储包文件的服务器在国外，有时候会被墙，速度很慢，所以需要解决这个问题。(现在国内npm好像都是默认从淘宝镜像下载了)

https://developer.aliyun.com/mirror/NPM?from=tnpm
淘宝的开发团队把npm在国内做了一个镜像（也就是一个备份）。

```shell
# 在任意目录执行都可以
# --global表示安装到全局，而非当前目录
# --global不能省略，否则不管用
npm install --global cnpm
```

安装包的时候把以前的`npm`替换成`cnpm`。

```shell
# 走国外的npm服务器下载jQuery包，速度比较慢
npm install jQuery;

# 使用cnpm就会通过淘宝的服务器来下载jQuery
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
<br/>

>## package.json

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
