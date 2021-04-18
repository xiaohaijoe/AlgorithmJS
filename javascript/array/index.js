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

Array.prototype.map = function (fn) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn.call(this, array[i], i, array));
  }
  return result;
};

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

class Solution {
  static testReduce() {
    const arr = [3, 1, 2, 4];
    const res = arr.reduce((prev, cur, index, array) => {
      return prev + cur;
    });
    console.log(res);
  }
  static testReduceRight() {
    const arr = [3, 1, 2, 4];
    const res = arr.reduceRight((prev, cur, index, array) => {
      console.log(prev, index);
      return prev + cur;
    });
    console.log(res);
  }
  static testMap() {
    const arr = [3, 1, 2, 4];
    const res = arr.map((cur, index, array) => {
      return { label: cur, value: index };
    });
    console.log(res);
  }
  static testFlat() {
    const arr = [3, 1, [2, 4], [9, [10, 11]]];
    const res = arr.flat(1);
    console.log(res);
  }
}

Solution.testFlat();
