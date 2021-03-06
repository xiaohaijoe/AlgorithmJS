## 索引

1. <a href="#1">给一个连字符串例如：get-element-by-id 转化成驼峰形式。</a>
2. <a href="#2">获取 transform 属性的参数值。</a>
3. <a href="#3">匹配二进制数字</a>
4. <a href="#4">匹配是否月份</a>
5. <a href="#5">匹配是否 a 标签</a>
6. <a href="#6">分割数字每三个以一个逗号划分</a>
7. <a href="#7">所有的单词大写首字母大写，其余小写</a>
8. <a href="#8">将一段 url 解析成 object</a>

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

5. <a name='5'>匹配是否 a 标签</a>

```javascript
const str = ["<a href='http://baidu.com'/>", "<a href='baidu.com'></a>"];
const reg = /^<a[^>]*(\/\>$|\>([^<]*)\<\/a\>$)/;
str.forEach((s) => console.log(reg.exec(s)));
```

6. <a name='6'>匹配是否 a 标签</a>

```javascript
const str = "1234567890";
const reg = /(\d)(?=(\d{3})+$)/g;
//(\d{3})+$ 的意思是连续匹配 3 个数字，且最后一次匹配以 3 个数字结尾。
//要找到所有的单个字符，这些字符的后面跟随的字符的个数必须是3的倍数，并在符合条件的单个字符后面添加,
const res = str.replace(reg, (e) => {
  return e + ",";
});
console.log(res); // 1,234,567,890
```

7. <a name='7'>所有的单词大写首字母大写，其余小写</a>

```javascript
const str =
  "HELLO, lyw, Although you leave me, but I will have been waiting for you that you come back to me";
const reg = /\b([a-zA-Z])+\b/g; // \b：匹配单词边界
const res = str.replace(reg, (e) => {
  return e[0].toUpperCase() + e.substring(1).toLowerCase();
});
console.log(res);
// Hello, Lyw, Although You Leave Me, But I Will Have Been Waiting For You That You Come Back To Me
```

8. <a name='8'>将一段 url 解析成 object</a>

```javascript
const str = "http://www.baidu.com:8080/product/list?id=123&sort=jjd#title";
const reg = /^(http[s]?):\/\/([0-9a-zA-Z\.]+)(:\d+)?([\/0-9a-zA-Z]+)\?([a-zA-Z0-9\=\&]+)#([a-zA-Z0-9\.]+)/g;
const res = reg.exec(str);
const obj = {
  protocol: res[1],
  port: res[3],
  host: res[2],
  path: res[4],
  query: res[5],
  achor: res[6],
};
console.log(obj);
/**
  {
    protocol: 'http',
    port: ':8080',
    host: 'www.baidu.com',
    path: '/product/list',
    query: 'id=123&sort=jjd',
    achor: 'title'
  }
   **/
```
