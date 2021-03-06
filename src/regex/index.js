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
  const reg = /[translate|scale]+\((\d+[px|%]*)\,\s*(\d+[px|%]*)\)/g; // 需使用g修饰符
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

fn4();
