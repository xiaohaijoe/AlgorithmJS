## Array

**索引**

1. <a href="#empty-item">Array 中的 empty item 是什么</a>
2. <a href="#reduce">reduce</a>
3. <a href="#reduceRight">reduceRight</a>
4. <a href="#map">map</a>
5. <a href="#filter">filter</a>
6. <a href="#every">every</a>
7. <a href="#some">some</a>
8. <a href="#flat">flat</a>

## <a name='empty-item'>Array 中的 empty item 是什么

空位不是 undefined，一个位置的值等于 undefined，依然是有值的。空位是没有任何值，in 运算符可以说明这一点。

```javascript
0 in [undefined, undefined, undefined]; // true
0 in [, , ,]; // false
```

ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

- forEach(), filter(), reduce(), every() 和 some()都会跳过空位。
- map()会跳过空位，但会保留这个值
- join()和 toString()会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。

[转载](https://www.jianshu.com/p/1776ca10a7f8?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

结论：an empty handle 是一个空的由 v8 垃圾收集器管理的对象引用，不是 undefined，所以 arr.indexOf(undefined)返回-1。

## <a name='reduce'>reduce

```javascript
Array.prototype.reduce = function () {
  const fn = arguments[0];
  const array = this;
  let prev = arguments.length == 2 ? arguments[1] : array[0];
  let startIndex = arguments.length == 2 ? 0 : 1;
  for (let i = startIndex; i < array.length; i++) {
    prev = fn.call(this, prev, array[i], i, array);
  }
  return prev;
};
```

## <a name='reduceRight'>reduceRight

```javascript
Array.prototype.reduceRight = function () {
  const fn = arguments[0];
  const array = this;
  let prev = arguments.length == 2 ? arguments[1] : array[array.length - 1];
  const startIndex =
    arguments.length == 2 ? array.length - 2 : array.length - 1;
  for (let i = startIndex; i >= 0; i--) {
    prev = fn.call(this, prev, array[i], i, array);
  }
  return prev;
};
```

## <a name='map'>map

```javascript
Array.prototype.map = function (fn) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn.call(this, array[i], i, array));
  }
  return result;
};
```

## <a name='filter'>filter

```javascript
Array.prototype.filter = function (fn) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const res = fn.call(this, array[i], i, array);
    if (res) {
      result.push(array[i]);
    }
  }
  return result;
};
```

## <a name='every'>every

```javascript
Array.prototype.every = function (fn) {
  const array = this;
  let flag = true;
  for (let i = 0; i < array.length; i++) {
    if (!fn.call(this, array[i], i, array)) {
      flag = false;
    }
  }
  return flag;
};
```

## <a name='some'>some

```javascript
Array.prototype.some = function (fn) {
  const array = this;
  const result = [];
  let flag = false;
  for (let i = 0; i < array.length; i++) {
    if (fn.call(this, array[i], i, array)) {
      flag = true;
    }
  }
  return flag;
};
```

## <a name='flat'>flat

```javascript
Array.prototype.flat = function () {
  const level = arguments.length == 1 ? arguments[0] : 1;
  const array = this;

  const result = [];
  function flat(array, level, result) {
    if (array instanceof Array) {
      if (level <= 0) {
        result.push(...array);
        return;
      }
    } else {
      result.push(array);
      return;
    }
    for (let i = 0; i < array.length; i++) {
      flat(array[i], level - 1, result);
    }
  }

  flat(array, level, result);
  return result;
};
```
