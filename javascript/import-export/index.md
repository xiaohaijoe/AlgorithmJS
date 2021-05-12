# Import Export 导入导出

## 索引

1. <a href="#classic">传统方法</a>
2. <a href="#commonjs">commonjs</a>
3. <a href="#amd">AMD(异步模块定义)</a>
4. <a href="#umd">UMD</a>
5. <a href="#es6-module">ES6 Module</a>

## <a name="classic">传统方法

```html
<script type="application/javascript" src="path/to/myModule.js"></script>
```

默认情况下，浏览器是同步加载 Javascript 脚本，当渲染引擎遇到\<script\>标签就会停下来，等到执行万脚本，再继续向下渲染

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中，\<script>标签打开 defer 和 async 属性就会异步加载

<code>defer</code>和<code>async</code>的区别是：

- defer: 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成）才会执行
- async：一旦下载完，渲染引擎就会**中断渲染**，执行这个脚本以后，再继续渲染。

总之：defer 是"**渲染完再执行**",async 是"**下载完就执行**"。如果有多个 defer 脚本，会按照它们在页面出现的顺序加载，而多个 async 脚本是不能保证加载顺序的。

## <a name="commonjs">commonjs

CommonJS 规范概述了同步声明依赖的模块定义。这个规范主要用于在服务器端实现模块化代码组织，但也可用于定义在浏览器中使用的模块依赖。CommonJS 模块语法不能在浏览器中直接运行。

- 注意　一般认为，Node.js 的模块系统使用了 CommonJS 规范，实际上并不完全正确。Node.js 使用了轻微修改版本的 CommonJS，因为 Node.js 主要在服务器环境下使用，所以不需要考虑网络延迟问题。考虑到一致性，本节使用 Node.js 风格的模块定义语法。

CommonJS 模块定义需要使用 require()指定依赖，而使用 exports 对象定义自己的公共 API。下面的代码展示了简单的模块定义：

```javascript
var moduleB=require('./moduleB');

module.exports = {
    stuff: moduleB.doStuff();
};
```

## <a name="amd">AMD(异步模块定义)

CommonJS 以服务器端为目标环境，能够一次性把所有模块都加载到内存，而异步模块定义（AMD，AsynchronousModuleDefinition）的模块定义系统则以浏览器为目标执行环境，这需要考虑网络延迟的问题。AMD 的一般策略是让模块声明自己的依赖，而运行在浏览器中的模块系统会按需获取依赖，并在依赖加载完成后立即执行依赖它们的模块。AMD 模块实现的核心是用函数包装模块定义。这样可以防止声明全局变量，并允许加载器库控制何时加载模块。

包装函数也便于模块代码的移植，因为包装函数内部的所有模块代码使用的都是原生 JavaScript 结构。包装模块的函数是全局 define 的参数，它是由 AMD 加载器库的实现定义的。

AMD 模块可以使用字符串标识符指定自己的依赖，而 AMD 加载器会在所有依赖模块加载完毕后立即调用模块工厂函数。与 CommonJS 不同，AMD 支持可选地为模块指定字符串标识符。

```javascript
// ID为'moduleA'的模块定义。moduleA依赖moduleB，
// moduleB会异步加载
define('moduleA', ['moduleB'], function(moduleB){
    return {
        stuff: moduleB.doStuff();
    };
});
```

## <a name="umd">UMD

为了统一 CommonJS 和 AMD 生态系统，通用模块定义（UMD，UniversalModuleDefinition）规范应运而生。UMD 可用于创建这两个系统都可以使用的模块代码。本质上，UMD 定义的模块会在启动时检测要使用哪个模块系统，然后进行适当配置，并把所有逻辑包装在一个立即调用的函数表达式（IIFE）中。虽然这种组合并不完美，但在很多场景下足以实现两个生态的共存。

下面是只包含一个依赖的 UMD 模块定义的示例（来源为 GitHub 上的 UMD 仓库）：

```javascript
(function (root, factory) {
  if (typeofdefine === "function" && define.amd) {
    // AMD。注册为匿名模块
    define(["moduleB"], factory);
  } else if (typeofmodule === "object" && module.exports) {
    // Node。不支持严格CommonJS
    // 但可以在Node这样支持module.exports的
    // 类CommonJS环境下使用
    module.exports = factory(require("moduleB"));
  } else {
    //浏览器全局上下文（root是window）
    root.returnExports = factory(root.moduleB);
  }
})(this, function (moduleB) {
  // 以某种方式使用moduleB
  // 将返回值作为模块的导出
  // 这个例子返回了一个对象
  // 但是模块也可以返回函数作为导出值
  return {};
});
```

## <a name="es6-module"> ES6 Module

ECMAScript6 模块是作为一整块 JavaScript 代码而存在的。带有 type="module"属性的\<script\>标签会告诉浏览器相关代码应该作为模块执行，而不是作为传统的脚本执行。模块可以嵌入在网页中，也可以作为外部文件引入：

```html
<script type="module">
  //模块代码
</script>

<script type="module" src="path/to/myModule.js"></script>
```

与传统脚本不同，所有模块都会像\<script defer\>加载的脚本一样按顺序执行。解析到\<script type="module"\>标签后会立即下载模块文件，但执行会延迟到文档解析完成。无论对嵌入的模块代码，还是引入的外部模块文件，都是这样。\<script type="module"\>在页面中出现的顺序就是它们执行的顺序。

与\<script defer\>一样，修改模块标签的位置，无论是在\<head\>还是在\<body\>中，只会影响文件什么时候加载，而不会影响模块什么时候加载。

**模块行为**

ECMAScript6 模块借用了 CommonJS 和 AMD 的很多优秀特性。下面简单列举一些。

- 模块代码只在加载后执行。
- 模块只能加载一次。
- 模块是单例。
- 模块可以定义公共接口，其他模块可以基于这个公共接口观察和交互。
- 模块可以请求加载其他模块。
- 支持循环依赖。

ES6 模块系统也增加了一些新行为。

- ES6 模块默认在严格模式下执行。
- ES6 模块不共享全局命名空间。
- 模块顶级 this 的值是 undefined（常规脚本中是 window）。
- 模块中的 var 声明不会添加到 window 对象。
- ES6 模块是异步加载和执行的。
