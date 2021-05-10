## Vue

1. <a href="#vue2.0">Vue 2.0 数据劫持</a>
2. <a href="#vue3.0">Vue 3.0 数据劫持</a>
3. <a href="#diff">diff 算法</a>

## <a name='vue2.0'>Vue 2.0 数据劫持

```javascript
let oldArrayPrototype = Array.prototype;
let proto = Object.create(oldArrayPrototype); // 继承
["push", "shift", "unshift"].forEach((method) => {
  // 函数劫持，把函数进行重写，内部继续调用老的方法
  proto[method] = function () {
    updateView();
    oldArrayPrototype[method].call(this, ...arguments);
  };
});
function observer(target) {
  if (typeof target !== "object" || target == null) {
    return target;
  }
  if (Array.isArray(target)) {
    // 拦截数组，给数组的方法进行重写
    Object.setPrototypeOf(target.prototype);
  }
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

function defineReactive(target, key, value) {
  observer(value); // 递归
  Object.defineProperty(target, key, {
    get() {
      // get中进行依赖收集
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        observer(newValue);
        updateView();
        value = newValue;
      }
    },
  });
}
```

## <a name='vue3.0'>Vue 3.0 数据劫持

- Vue 2.0 的问题

  1. 创建对象默认会将所有属性递归一遍;
  2. 数组一些方法非响应式，如 length;
  3. 对象不存在的属性不能被拦截

- 使用 Proxy 的缺点

  兼容性插，IE11 不兼容

```javascript
const obj = { name: "zf" }; //响应式对象
console.log(obj.name); //  -> 触发get -> track -> 存入effect
obj.name = "jw"; // -> 触发set -> trigger -> 从effect中取出来执行
```

```javascript
let obj = Vue.reactive({ name: "zf" });
Vue.effect(() => {
  // effect会执行两次，默认执行一次，之后依赖改变再执行
  console.log(obj.name);
});
```

**Proxy 订阅者模式**

```javascript
export function reactive(target) {
  return createReactiveObject(target, baseHandler);
}

function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }
  const observed = new Proxy(target, baseHandler);
  return observed;
}
function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver); // target[key];
    track(target, "get", key); // 收集依赖
    if (isObject(res)) {
      // 如 obj = reactive({name: 1, arr: [1,2,3]})
      // obj.arr.push(4);
      // 子对象如果是对象则需要再次递归proxy
      reactive(res);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const hadKey = hasOwn(target, key); // 判断是否已经收集过此依赖
    const oldValue = target[key];
    const result = Reflect.set(target, key, value, receiver);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value);
    }
    return result;
  };
}

export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect();
  }
  return effect;
}
```

**WeakMap 依赖收集结构**

| key (any)               | value (Map)                                           |
| :---------------------- | :---------------------------------------------------- |
| { name: 'zf', age: 11 } | { name: Set { effect, effect }, age: Set { effect } } |
| { name: 'jw', age: 28 } | { name: Set { effect, effect }, age: Set { effect } } |

```javascript
// 收集依赖
effect(() => {
  state.name;
});
state.name = "jw";

// 1. 执行effect， 将当前effect赋予activeEffect
// 2. 如果函数里调用了getter方法，则进行依赖收集（track） -> 进 WeakMap
// 3. 更改变量，调用setter方法，则进行触发方法（trigger）
```

## <a name='diff'>diff 算法

### 无 key 情况下

1. 无key情况下，取长度值最小的一组做patch

```

```
