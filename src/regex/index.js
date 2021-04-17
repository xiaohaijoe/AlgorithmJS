// 给一个连字符串例如：get-element-by-id转化成驼峰形式。
class Solution1 {
  func(str) {
    const reg = /-\w/g;
    return str.replace(reg, (e) => e.slice(1).toUpperCase());
  }
  static test() {
    const str = "get-element-by-id";
    const sol = new Solution1();
    const res = sol.func(str);
    console.log(res);
  }
}

// 获取translate的参数值
class Solution2 {
  func(str) {
    const reg = /[translate|scale]+\((\d+[px|%]*)\,\s*(\d+[px|%]*)\)/g;

    const a = reg.exec(str);
    const b = reg.exec(str);
    console.log(a, b);
  }
  static test() {
    const str = "translate(12px, 35%) scale(12px, 33%)";
    const sol = new Solution2();
    sol.func(str);
  }
}

// 匹配二进制数
class Solution3 {
  func(str) {
    const reg = /^[01]+$/;
    return reg.test(str);
  }
  static test() {
    const str = "01001010101";
    const sol = new Solution3();
    const res = sol.func(str);
    console.log(res);
  }
}

// 匹配是否月份
class Solution4 {
  func(str) {
    const reg = /^(0?[1-9]|1[0-2])$/;
    return reg.test(str);
  }
  static test() {
    const str = "10";
    const sol = new Solution4();
    const res = sol.func(str);
    console.log(res);
  }
}

// 匹配是否a标签
class Solution5 {
  func(str) {
    // <a xxx>xxx</a>
    // <a xxx />
    const reg = /^<a[^>]*(\/\>$|\>[^<]*\<\/a\>$)/;
    return reg.exec(str);
  }
  static test() {
    const strs = ["<a href='http://baidu.com'/>", "<a href='baidu.com'></a>"];
    strs.forEach((s) => {
      const sol = new Solution5();
      const res = sol.func(s);
      console.log(res);
    });
  }
}

// 分割数字每三个以一个逗号划分
class Solution6 {
  func(str) {
    //(\d{3})+$ 的意思是连续匹配 3 个数字，且最后一次匹配以 3 个数字结尾。
    //要找到所有的单个字符，这些字符的后面跟随的字符的个数必须是3的倍数，并在符合条件的单个字符后面添加,
    const reg = /(\d)(?=(\d{3})+$)/g;
    const res = str.replace(reg, (a) => {
      return a + ",";
    });
    return res;
  }
  static test() {
    const str = "1234567890";
    const sol = new Solution6();
    const res = sol.func(str);
    console.log(res);
  }
}

// 所有的单词大写首字母大写，其余小写
class Solution7 {
  func(str) {
    const reg = /\b([a-zA-Z]+)\b/g;
    return str.replace(reg, (a) => {
      return a.slice(0, 1).toUpperCase() + a.slice(1).toLowerCase();
    });
  }
  static test() {
    const str =
      "HELLO, lyw, Although you leave me, but I will have been waiting for you that you come back to me";
    const sol = new Solution7();
    const res = sol.func(str);
    console.log(res);
  }
}

// 将一段url解析成object
class Solution8 {
  func(str) {
    const reg = /^(http[s]?):\/\/([0-9a-zA-Z.]+)(:\d+)?([\/\w]+)?(\?[\w+\=\w*\&]+)?(\#\w+)?/g;
    const res = reg.exec(str);
    const obj = {
      protocol: res[1],
      port: res[3],
      host: res[2],
      path: res[4],
      query: res[5],
      achor: res[6],
    };
    return obj;
  }
  static test() {
    const str = "http://www.baidu.com:8080/product/list?id=123&sort=jjd#title";
    const sol = new Solution8();
    const res = sol.func(str);
    console.log(res);
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
}

Solution8.test();
