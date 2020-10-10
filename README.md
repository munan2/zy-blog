<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhangyan
 * @Date: 2020-09-28 23:23:45
 * @LastEditors: zhangyan
 * @LastEditTime: 2020-09-29 11:26:50
-->
# 搭建一个个人博客系统
## 目标
- client react
- server koa
- 数据库 mongo

通过该博客的搭建，熟悉技能
1. react语法熟悉
2. ts语法学习
3. react-router理解学习
4. 后台文件录入使用markdown语法，对于markdown 编辑熟悉
5. 文件上传功能，支持使用上传图片等搭建一个本地静态服务器
6. 使用SSR，对于react ssr熟练使用
7. node语法学习
8. mongo数据库操作熟练使用，中间也可以切换成mysql，了解两者之间的区别
9. 自己配置webpack，熟练webpack各个阶段
10. 如果可以有一个做到每一个博客内容都有一个demo展示，可以自己的博客里搭建一个运行其他代码的功能就太好了

## 搭建工作开始
1. webpack配置
- entry   
// 记住都是node执行命令的那个路径
- output  
  //path, filename
- module 各种loader的配置

## 知识点学习
### 1. 关于babel-loader
babel-loader帮我们干了很多事情，比如es6+的语法转为es5语法，且react 使用jsx语法，webpack并不能识别，所以需要使用@babel/preset-react帮我们做转换，这里我需要安装几个npm包
- babel-loader
- @babel/core
- @babel/preset-react
- @babel/preset-env
且需要新建一个.babelrc文件内，写入
```js
{
  "preset": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```
那么问题：babel-loader到底干了多少事情，安装的这些npm包分别的作用是什么
参考文章：https://zhuanlan.zhihu.com/p/43249121
常见的与babel相关的名词
- babel-loader
- babel-core corejs还分2和3
- babel-cli
- babel-polyfill
- babel-runtime

babel到底做了什么，怎么做的？

babel就是进行语法转换，将es2015/es2016/es2017等新语法转为es5，将在不支持高语法的环境也可以正常运行。

常见三种使用方法：
1、使用单体文本
2、使用命令行(cli)
3、使用构建工具的插件（webpack中的babel-loader,rollup-plugin-babel）

运行方式和插件：
babel总共分为三个阶段：解析、转换、生成。

babel本身不具有任何转化功能，它把转化功能都分解到一个个**plugin**里面。当我们不配置任何插件时，经过babel的代码和输入是相同的。

插件总共分为两种：

- 当我们添加**语法插件**之后，在解析这一步就使得babel能够解析更多的语法。

  比如源码写的语法正常babel转义是错误的，会报错。比如callFoo(param1, param2,)，正常babel转义最后一个参数不允许加逗号。可以使用增强语法插件babel-plugin-syntax-trailing-function-commas，使用了这个插件后，babel就不会报错。
- 添加**转换插件**，在转换这一步把源码转换并输出。常见的一些插件有很多，举例：
  - babel-plugin-transform-es2015-arrow-functions 箭头函数转换
  - babel-plugin-transform-object-rest-spread 扩展符

#### 如何配置

插件是babel的根本，如何使用？：将插件的名字添加到配置文件(.babelrc或者package.json的babel里面)

.babelrc内常见的两个配置项:
```js
{
  "preset": [],
  "plugin": []
}
```
preset 代表的意思是预设，比如es2015是一套规范，包含了大概有十几二十个转译插件。如果每次要开发者一个个安装添加插件，太麻烦了。为了解决这个问题，babel还提供了一组插件的集合。

preset分为几种：
- 官网内容，目前包括env,react,flow,minify。最重要的是env
- stage-x 这俩面包含都是当前最新规范的草案，每年更新。这里细分：
  - stage 0 稻草人: 只是一个想法，经过 TC39 成员提出即可
  - stage 1 提案: 初步尝试
  - stage 2 初稿: 完成初步规范。
  - stage 3 候选: 完成规范和浏览器初步实现。
  - stage 4 完成: 将被添加到下一年度发布。
  低一级的stage会包含所有高级的stage的内容，例如stage-1包含了stage-2和stage-3的所有内容
- es201x，latest
  这些是已经纳入到标准规范的语法。例如 es2015 包含 arrow-functions，es2017 包含 syntax-trailing-function-commas。但因为 env 的出现，使得 es2016 和 es2017 都已经废弃。所以我们经常可以看到 es2015 被单独列出来，但极少看到其他两个。
  latest 是 env 的雏形，它是一个每年更新的 preset，目的是包含所有 es201x。但也是因为更加灵活的 env 的出现，已经废弃。

执行顺序：
- plugin会运行在preset之前
- plugin会从前到后的顺序执行
- preset是从后往前顺序执行

**env**
其核心目标是通过配置得知目标环境的特点，然后只做必要的转换。例如目标浏览器支持es2015，那么es2015这个preset其实不需要，转换后代码就会小一点，构建时间也可以缩短一点。

如果不写任何配置想，env=latest，也等价于es2015+es2016+es2017三个相加。
常见的配置方法：
```js
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

#### babel-cli
在一些项目不太大，不需要使用构建工具（webpack或者rollup）时，可以在发布之前使用babel-cli进行处理

#### babel-node
babel-node 是 babel-cli 的一部分，它不需要单独安装。

它的作用是在 node 环境中，直接运行 es2015 的代码，而不需要额外进行转码。例如我们有一个 js 文件以 es2015 的语法进行编写(如使用了箭头函数)。我们可以直接使用 babel-node es2015.js 进行执行，而不用再进行转码了。

可以说：babel-node = babel-polyfill + babel-register。那这两位又是谁呢？

#### babel-register
babel-register 模块改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载 .js、.jsx、.es 和 .es6 后缀名的文件，就会先用 babel 进行转码。

使用时，必须首先加载 require('babel-register')。

需要注意的是，babel-register 只会对 require 命令加载的文件转码，而 不会对当前文件转码。

另外，由于它是实时转码，所以 只适合在开发环境使用。

#### babel-polyfill
babel只是对js进行语法转换，但从不转换新的API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法(比如 Object.assign)都不会转码。

举例来说，es2015 在 Array 对象上新增了 Array.from 方法。babel 就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill。(内部集成了 core-js 和 regenerator)

使用时，在所有代码运行之前增加 require('babel-polyfill')。或者更常规的操作是在 webpack.config.js 中将 babel-polyfill 作为第一个 entry。因此必须把 babel-polyfill 作为 dependencies 而不是 devDependencies

babel-polyfill 的缺点：
1. 使用babel-polyfill 会导致打出来的包非常大，因为babel-polyfill是一个整体，把所有方法都加到了原型链上。这个问题可以单独使用core-js的某个类库来解决。
2. 会污染全局变量，给很多类的原型链上做了修改。

在实际开发中，我们无法忍受这两个缺点的话，通常会更加倾向于使用babel-plugin-transform-runtime

#### babel-runtime 和 babel-plugin-transform-runtime
我们时常在项目中看到 .babelrc 中使用 babel-plugin-transform-runtime，而 package.json 中的 dependencies (注意不是 devDependencies) 又包含了 babel-runtime，那这两个是不是成套使用的呢？他们又起什么作用呢？

先聊一下babel-plugin-tranform-runtime

babel转换语法时，假设多处使用了async/await，在转换的时候会对每一处都插入一段_asyncToGenerator代码，造成重复和浪费。

使用babel-plugin-transform-runtime，就从在每一处定义方法变成，在一处定义，其他处重复引用，就不存在重复代码。

但是在这里babel-runtime就需要出场了，因为它是这些方法的集合处。在使用babel-plugin-transform-runtime的时候必须把babel-runtime当作依赖。

babel-runtime 内部集成了
1. core-js: 转换一些内置类 (Promise, Symbols等等) 和静态方法 (Array.from 等)。绝大部分转换是这里做的。自动引入。
2. regenerator: 作为 core-js 的拾遗补漏，主要是 generator/yield 和 async/await 两组的支持。当代码中有使用 generators/async 时自动引入。
3. helpers, 如上面的 asyncToGenerator 就是其中之一，其他还有如 jsx, classCallCheck 等等，可以查看 babel-helpers。在代码中有内置的 helpers 使用时(如上面的第一段代码)移除定义，并插入引用(于是就变成了第二段代码)。

此外补充一点，把 helpers 抽离并统一起来，避免重复代码的工作还有一个 plugin 也能做，叫做 babel-plugin-external-helpers。但因为我们使用的 transform-runtime 已经包含了这个功能，因此不必重复使用。而且 babel 的作者们也已经开始讨论这两个插件过于类似，正在讨论在 babel 7 中把 external-helpers 删除，讨论在 issue#5699 中。

#### babel-loader
在大型的项目都会有构建工具（webpack,rollup）来进行代码构建和代码压缩。理论上可以对压缩后的代码进行babel处理，但是会非常慢，可以在压缩之前进行babel处理。

就有了babel插入到构建工具内部的需求，因此出现了babel-loader








