# 严格模式

## 索引

1. <a href="variable"> 变量
2. <a href="object"> 对象
3. <a href="function"> 函数
4. <a href="arguments"> 函数参数
5. <a href="this"> this 强制转型
6. <a href="class-module"> 类与模块
7. <a href="other"> 其他变化

要选择使用严格模式，需要使用严格模式编译指示（pragma），即一个不赋值给任何变量的字符串：

```javascript
"use strict";
```

## <a name="variable"> 变量

```javascript
// 变量未声明
// 非严格模式：创建全局变量
// 严格模式：抛出ReferenceError
message = "Helloworld!";
```

```javascript
// 删除变量
// 非严格模式：静默失败
// 严格模式：抛出ReferenceError
let color = "red";
delete color;
```

严格模式也对变量名增加了限制。具体来说，不允许变量名为 implements、interface、let、package、private、protected、public、static 和 yield。这些是目前的保留字，可能在将来的 ECMAScript 版本中用到。如果在严格模式下使用这些名称作为变量名，则会导致语法错误。

## <a name="object"> 对象

首先，以下几种情况下试图操纵对象属性会引发错误。

- 给只读属性赋值会抛出 TypeError。
- 在不可配置属性上使用 delete 会抛出 TypeError。
- 给不存在的对象添加属性会抛出 TypeError。

另外，与对象相关的限制也涉及通过对象字面量声明它们。在使用对象字面量时，属性名必须唯一。例如：

```javascript
// 两个属性重名
// 非严格模式：没有错误，第二个属性生效
// 严格模式：抛出SyntaxError
let person = {
  name: "Nicholas",
  name: "Greg",
};
```

## <a name="function"> 函数

首先，严格模式要求命名函数参数必须唯一。看下面的例子：

```javascript
// 命名参数重名
// 非严格模式：没有错误，只有第二个参数有效
// 严格模式：抛出SyntaxError
function sum(num, num) {
  //函数代码
}
```

arguments 对象在严格模式下也有一些变化。在非严格模式下，修改命名参数也会修改 arguments 对象中的值。而在严格模式下，命名参数和 arguments 是相互独立的。例如：

```javascript
// 修改命名参数的值
// 非严格模式：arguments会反映变化
// 严格模式：arguments不会反映变化
function showValue(value) {
  value = "Foo";
  alert(value); //"Foo"
  alert(arguments[0]);
  //非严格模式："Foo"
  //严格模式："Hi"
}
showValue("Hi");
```

另一个变化是去掉了 arguments.callee 和 arguments.caller。在非严格模式下，它们分别引用函数本身和调用函数。在严格模式下，访问这两个属性中的任何一个都会抛出 TypeError。例如：

```javascript
// 访问arguments.callee
// 非严格模式：没问题
// 严格模式：抛出TypeError
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num1);
  }
}
let result = factorial(5);
```

关于函数的最后一个变化是不允许函数声明，除非它们位于脚本或函数的顶级。这意味着在 if 语句中声明的函数现在是个语法错误：

```javascript
// 在if语句中声明函数
// 非严格模式：函数提升至if语句外部
// 严格模式：抛出SyntaxError
if (true) {
  function doSomething() {
    //...
  }
}
```

## <a name="arguments"> 函数参数

ES6 增加了剩余操作符、解构操作符和默认参数，为函数组织、结构和定义参数提供了强大的支持。ECMAScript7 增加了一条限制，要求使用任何上述先进参数特性的函数内部都不能使用严格模式，否则会抛出错误。不过，全局严格模式还是允许的。

```javascript
//可以
function foo(a, b, c) {
  "usestrict";
}
//不可以
function bar(a, b, c = "d") {
  "usestrict";
}
//不可以
function baz({ a, b, c }) {
  "usestrict";
}
//不可以
function qux(a, b, ...c) {
  "usestrict";
}
```

## <a name="this"> this 强制转型

JavaScript 中最大的一个安全问题，也是最令人困惑的一个问题，就是在某些情况下 this 的值是如何确定的。使用函数的 apply()或 call()方法时，在非严格模式下 null 或 undefined 值会被强制转型为全局对象。在严格模式下，则始终以指定值作为函数 this 的值，无论指定的是什么值。例如：

```javascript
// 访问属性
// 非严格模式：访问全局属性
// 严格模式：抛出错误，因为this值为null
let color = "red";
function displayColor() {
  alert(this.color);
}
displayColor.call(null);
```

这里在调用 displayColor.call()时传入 null 作为 this 的值，在非严格模式下该函数的 this 值是全局对象。结果会显示"red"。在严格模式下，该函数的 this 值是 null，因此在访问 null 的属性时会抛出错误。

通常，函数会将其 this 的值转型为一种对象类型，这种行为经常被称为“装箱”（boxing）。这意味着原始值会转型为它们的包装对象类型。

```javascript
function foo() {
  console.log(this);
}
foo.call(); // Window{}
foo.call(2); // Number{2}
```

在严格模式下执行以上代码时，this 的值不会再“装箱”：

```javascript
function foo() {
  "usestrict";
  console.log(this);
}
foo.call(); // undefined
foo.call(2); // 2
```

## <a name="class-module"> 类与模块

类和模块都是 ECMAScript6 新增的代码容器特性。在之前的 ECMAScript 版本中没有类和模块这两个概念，因此不用考虑从语法上兼容之前的 ECMAScript 版本。为此，TC39 委员会决定在 ES6 类和模块中定义的所有代码默认都处于严格模式。

对于类，这包括类声明和类表达式，构造函数、实例方法、静态方法、获取方法和设置方法都在严格模式下。对于模块，所有在其内部定义的代码都处于严格模式。

## <a name="other"> 其他变化

严格模式下还有其他一些需要注意的变化。首先是消除 with 语句。with 语句改变了标识符解析时的方式，严格模式下为简单起见已去掉了这个语法。在严格模式下使用 with 会导致语法错误：

```javascript
// 使用with语句
// 非严格模式：允许
// 严格模式：抛出SyntaxError
with (location) {
  alert(href);
}
```

严格模式也从 JavaScript 中去掉了八进制字面量。八进制字面量以前导 0 开始，一直以来是很多错误的源头。在严格模式下使用八进制字面量被认为是无效语法：

```javascript
// 使用八进制字面量
// 非严格模式：值为8
// 严格模式：抛出SyntaxError
let value = 010;
```

ECMAScript5 修改了非严格模式下的 parseInt()，将八进制字面量当作带前导 0 的十进制字面量。例如：

```javascript
// 在parseInt()中使用八进制字面量
// 非严格模式：值为8
// 严格模式：值为10
let value = parseInt("010");
```
