## Promise

**Promise 使用**

1. Promise 是一个构造函数

   new Promise 返回一个 promise 对象 接收一个 excutor 执行函数作为参数, excutor 有两个函数类型形参 resolve reject

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步处理
  // 处理结束后、调用resolve 或 reject
});
```

2. promise 的三种状态

- pending
- fulfilled
- rejected

  1. promise 对象初始化状态为 pending
  2. 当调用 resolve(成功)，会由 pending => fulfilled
  3. 当调用 reject(失败)，会由 pending => rejected

注意 promsie 状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变

**Promise 执行流程**

```javascript
async function foo() {
  console.log(2);
  console.log(await Promise.resolve(8));
  console.log(9);
}
async function bar() {
  console.log(4);
  console.log(await 6);
  console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
//1
//2
//3
//4
//5
//6
//7
//8
//9
```

运行时会像这样执行上面的例子：

1. 打印 1；
2. 调用异步函数 foo()；
3. （在 foo()中）打印 2；
4. （在 foo()中）await 关键字暂停执行，向消息队列中添加一个期约在落定之后执行的任务；
5. 期约立即落定，把给 await 提供值的任务添加到消息队列；
6. foo()退出；
7. 打印 3；
8. 调用异步函数 bar()；
9. （在 bar()中）打印 4；
10. （在 bar()中）await 关键字暂停执行，为立即可用的值 6 向消息队列中添加一个任务；
11. bar()退出；
12. 打印 5；
13. 顶级线程执行完毕；
14. JavaScript 运行时从消息队列中取出解决 await 期约的处理程序，并将解决的值 8 提供给它；
15. JavaScript 运行时向消息队列中添加一个恢复执行 foo()函数的任务；
16. JavaScript 运行时从消息队列中取出恢复执行 bar()的任务及值 6；
17. （在 bar()中）恢复执行，await 取得值 6；
18. （在 bar()中）打印 6；
19. （在 bar()中）打印 7；
20. bar()返回；
21. 异步任务完成，JavaScript 从消息队列中取出恢复执行 foo()的任务及值 8；
22. （在 foo()中）打印 8；
23. （在 foo()中）打印 9；
24. foo()返回。

**Promise 代码**

```javascript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
  let that = this;
  this.status = PENDING; // 初始状态
  this.value = undefined; // fulfilled 状态时返回的信息
  this.reason = undefined; // rejected 状态时返回的信息
  this.onFulfilledCallbacks = []; // 存储fulfilled状态对应的onFulfilled函数
  this.onRejectedCallbacks = []; // 存储rejected状态对应的onRejected函数

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }

    // 为什么resolve 加setTimeout?
    // 2.2.4规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行.
    // 注1 这里的平台代码指的是引擎、环境以及 promise 的实施代码。实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
    process.nextTick(() => {
      // 调用resolve 回调对应的onFulfilled函数
      if (that.status === PENDING) {
        // 只能由PENDING => FULFILLED状态
        that.status = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach((cb) => cb(that.value));
      }
    });
  }

  function reject(reason) {
    process.nextTick(() => {
      // 调用reject 回调对应onRejected函数
      if (that.status === PENDING) {
        // 只能由pedning状态 => rejected状态 (避免调用多次resolve reject)
        that.status = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach((cb) => cb(that.reason));
      }
    });
  }
  // 捕获在excutor执行器中抛出的异常
  // new Promise((resolve, reject) => {
  //     throw new Error('error in excutor')
  // })
  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
    return reject(new TypeError("循环引用"));
  }

  let called = false;
  // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
  if (x instanceof Promise) {
    // 获得它的终值 继续resolve
    if (x.status === PENDING) {
      // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
      x.then(
        (y) => {
          resolvePromise(promise2, y, resolve, reject);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else {
      // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
      x.then(resolve, reject);
    }
  } else if (x != null && (typeof x == "object" || typeof x == "function")) {
    try {
      let then = x.then;
      if (typeof then == "function") {
        // 是否是thenable对象（具有then方法的对象/函数）
        then.call(x, (y) => {
          if (called) {
            return;
          }
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        });
      } else {
        // 说明是一个普通对象/函数
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  let newPromise;
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
  // 原因:
  // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
  // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

  // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
  // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

  // 如下面这种情景 多次调用p1.then
  // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
  //     console.log(value); // resolve
  //     // console.log(p1.status); // fulfilled
  //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
  //         console.log(value); // 'resolve'
  //     });
  //     console.log('当前执行栈中同步代码');
  // })
  // console.log('全局执行栈中同步代码');
  //
  if (this.status === FULFILLED) {
    return (newPromise = new Promise((resolve, reject) => {
      process.nextTick(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === REJECTED) {
    // 失败态
    return (newPromise = new Promise((resolve, reject) => {
      process.nextTick(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (that.status === PENDING) {
    // 等待态
    // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
    return (newPromise = new Promise((resolve, reject) => {
      that.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

/**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let done = gen(promises.length, resolve);
    promises.forEach((promise, index) => {
      promise.then((value) => {
        done(index, value);
      }, reject);
    });
  });
};

function gen(length, resolve) {
  let count = 0;
  let values = [];
  return function (i, value) {
    values[i] = value;
    if (++count === length) {
      console.log(values);
      resolve(values);
    }
  };
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(resolve, reject);
    });
  });
};

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.resolve = function (value) {
  return new Promise((resolve) => {
    resolve(value);
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 *
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function () {
  // 延迟对象
  let defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

/**
 * Promise/A+规范测试
 * npm i -g promises-aplus-tests
 * promises-aplus-tests Promise.js
 */

try {
  module.exports = Promise;
} catch (e) {}
```
