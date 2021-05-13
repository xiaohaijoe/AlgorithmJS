# 语言基础

## 索引

1. <a href="#let"> let 声明

## <a name="let"> let 声明

let 声明的范围是块作用域，而 var 声明的范围是函数作用域。

```javascript
if (true) {
  var name = "Matt";
  console.log(name); //Matt
}
console.log(name); // Matt
if (true) {
  let age = 26;
  console.log(age); //26
}
console.log(age); //ReferenceError:age没有定义
```

**暂时性死区**

let 与 var 的另一个重要的区别，就是 let 声明的变量不会在作用域中被提升。

```javascript
// name会被提升
console.log(name);
// undefined
var name = "Matt";
//age不会被提升
console.log(age); //ReferenceError：age没有定义
let age = 26;
```

在解析代码时，JavaScript 引擎也会注意出现在块后面的 let 声明，只不过在此之前不能以任何方式来引用未声明的变量。在 let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此阶段引用任何后面才声明的变量都会抛出 ReferenceError。

**全局声明**

与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性（var 声明的变量则会）。

```javascript
var name = "Matt";
console.log(window.name); //'Matt'
let age = 26;
console.log(window.age); //undefined
```

**条件声明**

在使用 var 声明变量时，由于声明会被提升，JavaScript 引擎会自动将多余的声明在作用域顶部合并为一个声明。因为 let 的作用域是块，所以不可能检查前面是否已经使用 let 声明过同名变量，同时也就不可能在没有声明的情况下声明它。

**for 循环中的 let 声明**

在 let 出现之前，for 循环定义的迭代变量会渗透到循环体外部：

```javascript
for (var i = 0; i < 5; ++i) {
  //循环逻辑
}
console.log(i); //5
```

改成 let 之后，这个问题就消失了，因为迭代变量的作用域仅限于 for 循环块内部：

```javascript
for (let i = 0; i < 5; ++i) {
  //循环逻辑
}
console.log(i); //ReferenceError:i没有定义
```
