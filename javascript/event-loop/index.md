# Event Loop

## 索引

1. <a href="progress">Event Loop 运行机制</a>
2. <a href="macro-micro-task">宏任务与微任务</a>

## <a name="progress">Event Loop 运行机制

1. 所有同步任务都在主线程上执行，行成一个执行栈(excution context stack)
2. 主线程之外，还存在一个“任务队列(task queue)”。只要异步任务有了结果，就在“任务队列”中放置一个事件
3. 一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些任务。那些对应的异步任务，于是结束等待状态，进入执行栈，进行执行。
4. 主线程不断重复上面的第三步。

**setTimeout(fn, 0)**

<code>setTimeout(fn,0)</code>它在“任务队列”的尾部添加一个事件，因此要等到同步任务和“任务队列”现有的事件都处理完，才会得到执行

总之<code>setTimeout(fn,0)</code>的含义就是，指定某个任务最早可得到的空闲时间执行，也就是是说，尽可能早执行。

**process.nextTick**

<code>process.nextTick</code>方法可以在当前“执行栈”的尾部，下一次<code>Event Loop</code>(主线程读取“任务队列”)之前，触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。

**setImmediate**

<code>setImmediate</code>方法则是在当前“任务队列”的尾部添加事件，也就是说，它指定的任务总是在下一次 Event Loop 时执行，这与 setTimeout(fn, 0)很想。

## <a name="macro-micro-task">宏任务与微任务

- macro-task(宏任务)：包括整体代码 script, setTimeout, setInterval
- micro-task(微任务)：Promise, process.nextTick
