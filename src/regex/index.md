## 索引

1. <a href="#1">给一个连字符串例如：get-element-by-id 转化成驼峰形式。</a>
2. <a href="#2">获取 transform 属性的参数值。</a>
3. <a href="#3">匹配二进制数字</a>
4. <a href="#4">匹配是否月份</a>

### 解答

1. <a name='1'>给一个连字符串例如：get-element-by-id 转化成驼峰形式。</a>

```javascript
const str = "get-element-by-id";
const reg = /-\w/g;
const res = str.replace(reg, (e) => e.slice(1).toUpperCase());
console.log(res);
```

2. <a name='2'>获取 transform 属性的参数值。</a>

```javascript
const str = "translate(12px, 35%) scale(12px, 33%)";
const reg = /[translate|scale]+\((\d+[px|%]*)\,\s*(\d+[px|%]*)\)/g; // 需使用g修饰符
const a = reg.exec(str);
const b = reg.exec(str);
console.log(a, b);
```

3. <a name='3'>匹配二进制数字</a>

```javascript
const str = "0101011101";
const reg = /^[01]+$/;
const res = reg.test(str);
console.log(res);
```

4. <a name='4'>匹配是否月份</a>

```javascript
const str = "12";
const reg = /^(0?[1-9])|(1[0-2])$/;
const res = reg.test(str);
console.log(res);
```
