// 给一个连字符串例如：get-element-by-id转化成驼峰形式。
function fn1() {
  const str = "get-element-by-id";
  const reg = /-\w/g;
  const res = str.replace(reg, (e) => e.slice(1).toUpperCase());
  console.log(res);
  // true
}

// 获取translate的参数值
function fn2() {
  const str = "translate(12px, 35%) scale(12px, 33%)";
  const reg = /[translate|scale]+\((\d+[px|%]*)\,\s*(\d+[px|%]*)\)/; // 需使用g修饰符
  const a = reg.exec(str);
  const b = reg.exec(str);
  console.log(a, b);
}

// 匹配二进制数
function fn3() {
  const str = "0101011101";
  const reg = /^[01]+$/;
  const res = reg.test(str);
  console.log(res);
}

// 匹配是否月份
function fn4() {
  const str = "12";
  const reg = /^(0?[1-9])|(1[0-2])$/;
  const res = reg.test(str);
  console.log(res);
}

// 匹配是否a标签
function fn5() {
  const str = ["<a href='http://baidu.com'/>", "<a href='baidu.com'></a>"];
  const reg = /^<a[^>]*(\/\>$|\>([^<]*)\<\/a\>$)/;
  str.forEach((s) => console.log(reg.exec(s)));
}

// 分割数字每三个以一个逗号划分
function fn6() {
  const str = "1234567890";
  const reg = /(\d)(?=(\d{3})+$)/g;
  //(\d{3})+$ 的意思是连续匹配 3 个数字，且最后一次匹配以 3 个数字结尾。
  //要找到所有的单个字符，这些字符的后面跟随的字符的个数必须是3的倍数，并在符合条件的单个字符后面添加,
  const res = str.replace(reg, (e) => {
    return e + ",";
  });
  console.log(res);
}

// 所有的单词大写首字母大写，其余小写
function fn7() {
  const str =
    "HELLO, lyw, Although you leave me, but I will have been waiting for you that you come back to me";
  const reg = /\b([a-zA-Z])+\b/g; // \b：匹配单词边界
  const res = str.replace(reg, (e) => {
    return e[0].toUpperCase() + e.substring(1).toLowerCase();
  });
  console.log(res);
}

// 将一段url解析成object
function fn8() {
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
}

fn8();
