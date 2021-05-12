# Webpack

## 索引

1. <a href="#introduction">Webpack 简介</a>
2. <a href="#tree-shaking">Tree Shaking</a>
3. <a href="#loader">loader</a>
4. <a href="#plugin">plugin</a>
5. <a href="#tapable">Tapable</a>
6. <a href="#plugin-optimize">plugin optimize 插件优化</a>
7. <a href="#difference">gulp 与 webpack 的区别</a>

## <a name='introduction'>Webpack 简介

Webpack 是一个现代 Javascript 应用程序的静态模块打包器

**打包结果**

大体结构

```javascript
(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    /* code */
  }
  // ...
  __webpack_require__(0);
})([
  /* modules array */
]);
```

核心方法

```javascript
function __webpack_require__(moduleId) {
  // check if module is in cached
  if (installedModules[moduleId]) {
    return installedModules[moduleId].exports;
  }

  // create a new module (and put it into the cache)
  var module = (installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
  });

  // execute the module function
  installedModules[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__
  );
  // flag the module as loaded
  module.l = true;

  return module.exports;
}
```

**Webpack 打包过程**

- 从入口文件开始，分析整个应用的依赖树
- 将每个依赖模块包装起来，放到一个数组中等待调用
- 实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用
- 把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数

## <a name="tree-shaking"> Tree Shaking

Tree-shaking 的本质是消除无用的 js 代码。无用代码消除广泛存在于传统的编程语言编译器中，编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为 DCE(dead code elimination)

## <a name="loader">loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在更高层面，在 webpack 的配置中，loader 有两个属性：

- test 属性，识别出哪些文件会被转换。
- use 属性，定义出在进行转换时，应该使用哪个 loader。

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
    ],
  },
};
```

以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：

```
“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先 use(使用) raw-loader 转换一下。”
```

**loader 执行顺序**

1. use: ["xx1-loader", "xx2-loader"]
2. 最后的 loader 最早调用，传入原始资源
3. 中间的 loader 执行的时候，传入的就是上一个 loader 的执行结果
4. loader 需要异步 this.async(),this.callback()

**自定义 loader**

```javascript
module.exports = function (content, map, meta) {
  console.log("loader 执行了");
};
```

**自定义 loader 前置钩子**

```javascript
module.exports.pitch = function (remainRequest, preRequest, data) {
  data.value = xx;
};
```

前置钩子执行顺序

1. xx1loader -> pitch
2. xx2loader -> pitch
3. xx2
4. xx1

## <a name="plugin">plugin(插件)

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

**自定义插件**

```javascript
class ConsoleLogOnBuildWebpack {
  apply(compiler) {
    compoler.hooks.run.tap(pluginName, (compilation) => {
      console.log("webpack 构建过程开始！");
    });
  }
}
```

**webpack 实现插件机制大体方式**

- [创建]：webpack 在其内部对象上创建各种钩子
- [注册]：插件将自己的方法注册到对应的钩子上，交给 webpack
- [调用]：webpack 编译过程中，合适时触发相应的钩子

webpack 利用了**tapable**这个库来协调实现整个构建流程各个步骤的控制。**tapable**定义了主要构建流程后，使用**tapable**这个库添加了各种各样的钩子方法来讲 webpack 扩展至功能十分丰富，这就是 plugin 机制。

## <a name="tapable">Tapable

1. 什么是 Tapable

   webpack 核心使用 Tapable 来实现插件（plugins）的 binding 和 applying。Tapable 是一个用于事件发布订阅执行的可插拔插件架构。

   Tapable 就是 webpack 用来创建钩子的库。

2. 打开 webpack -> package.json -> main -> webpack.js
3. 创建 Compiler

   1. 调用 compiler.run 开始构建 ->
   2. 创建 compilation ->
   3. 基于配置开始创建 chunk ->
   4. 使用 Parser 从 chunk 开始解析依赖 ->
   5. 使用 Module 和 Dependency 管理代码模块相互关系 ->
   6. 使用 Template 基于 compilation 的数据生成结果代码

```
初始化 <- 启动构建，读取与合并参数加载plugin，实例化compiler
  |
  v
 编译  <- 从 entry 触发，针对每一个 module 调用 loader 翻译文件内容，
         并找到 module依赖进行编译处理
  |
  v
 输出  <- 将编译后的 module 组成 chunk，将 chunk 转换成文件，
         输出到文件系统中
```

## <a name="plugin-optimize">plugin optimize 插件优化

- Tree-shaking 插件
  - js tree-shaking： webpack-deep-scope-plugin
  - css tree-shaking: purifycss-webpack, purify-css
- clean-webpack-plugin: 每次打包前删除文件内容
- html-webpack-plugin：自动生成 html5 文件，并 includes 所有 webpack bundles
- webpack-dev-server：热启动
- webpack magic comments: 用于动态引入 ES Module
  ```javascript
  import(/* webpackChunkName: "async-test" */ "../async/index.js").then((_) => {
    _.default.init();
  });
  ```
- uglifyjs-webpack-plugin: node 开启多核压缩 JS 文件
  ```javascript
  optimization: {
    minimizer: new UglifyJSPlugin({
      parallel: true, // os.cpus().length
    });
  }
  ```
- speed-measure-webpack-plugin: 监控面板，计算每个包执行时间
- webpack-build-notify-plugin: 开启通知面板
- progress-bar-webpack-plugin: 打包进度
- webpack-dashboard: 开发面板优化
- babel-polyfill: 将 ES6 转 ES5， 不推荐使用，文件太大
  建议使用 cdn 加速引入
  https://cdn.polyfill.io/v2/polyfill.min.js?feature=Map,Set...
  页面初始化时先判断是否支持新的方法，动态去获取 polyfill

- webpack-manifest-plugin: 生成网站的所有资源配置
- webpack-chart, webpack-bundle-analyzer: 分析打包结果

## <a name="difference">gulp 与 webpack 的区别

- gulp 强调的是前端开发的工作流程，我们可以通过配置一系列的 task，定义 task 处理的事务（例如文件压缩合并，雪碧图，启动 server，版本控制等），然后定义执行顺序，来让 gulp 执行这些 task，从而构建项目的整个前端开发流程。PS：简单说就是一个 Task Runner(任务执行器)
- webpack 是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片，js 文件，css 文件等）都看成模块，通过 loader（加载器）和 plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

**相同功能**

- 文件合并与压缩（css）
- 文件合并与压缩（js）
- sass/less 预编译
- 启动 server
- 版本控制

**两者区别**

虽然都是前端的自动构建工具，但看他的定位就知道不是对等的。<code>gulp</code>严格上讲，模块化不是它的强调的东西，它旨在规范前端开发流程。

webpack 更是明显强调模块化开发
