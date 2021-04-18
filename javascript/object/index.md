## 对象

**索引**

1. <a href="#inherit">对象的继承</a>
1. <a href="#inherit">对象的继承</a>

## <a name='inherit'>对象的继承

**各继承方式总结**

1. 组合继承：原型链继承（继承原型属性和方法） + 盗用构造函数继承（继承属性）

2. 原型式继承：创建一个实现继承的函数，然后返回这个对象

   object()和 Object.create()函数内部实现是创建一个新对象，让这个对象的原型指向父对象；

3. 寄生式继承：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象；

4. 组合寄生式继承：寄生式继承（浅复制原型属性和方法） + 盗用构造函数继承（继承属性）

**原型链的问题**
原型链虽然是实现继承的强大工具，但它也有问题。主要问题出现在原型中包含引用值的时候。前面在谈到原型的问题时也提到过，原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先的实例属性摇身一变成为了原型属性。下面的例子揭示了这个问题：

```javascript
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {}

//继承
SubType.prototype = new SuperType();

let instance1 = new SubType();
instance.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green,black"
```

### 组合继承

组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。来看下面的例子：

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  // 盗用构造函数，继承属性，第二次调用SuperType
  SuperType.call(this, name);

  this.age = age;
}

// 继承属性和方法,第一次调用SuperType
SubType.prototype = new SuperType();

SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas"
instance1.sayAge(); // 29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors);
instance2.sayName(); // "Greg"
instance2.sayAge(); // 27
```

**特点**

- 最主要的效率问题就是父类构造函数始终会被调用两次：
  - 一次在是创建子类原型时调用(<code>SubType.prototype = new SuperType();</code>)
  - 另一次是在子类构造函数中调用(<code>SuperType.call(this);</code>)

![alt 属性文本](./assets/inherit_1.png)

### 原型式继承

原型式继承适用于这种情况：你有一个对象，想在它的基础上再创建一个新对象。你需要把这个对象先传给 object()，然后再对返回的对象进行适当修改。在这个例子中，person 对象定义了另一个对象也应该共享的信息，把它传给 object()之后会返回一个新对象。这个新对象的原型是 person，意味着它的原型上既有原始值属性又有引用值属性。这

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: "Nicholas",
  friends: ["Shelly", "Court", "Van"],
};

// 等价 let anotherPerson = object(person);
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

// 等价 let yetAnotherPerson = object(person);
let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friend.push("Barbie");

console.log(person.friends); // "Shelly,Court,Van,Rob,Barbie"
```

**特点**
属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。

### 寄生式继承

与原型式继承比较接近的一种继承方式是寄生式继承。寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。基本的寄生继承模式如下：

```javascript
function createAnother(original) {
  // 等价 let clone = object(original);
  let clone = Object.create(original);
  clone.sayHi = function () {
    console.log("hi");
  };
  return clone;
}

let person = {
  name: "Nicholas",
  friends: ["Shelly", "Court", "Van"],
};

let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi"
```

**特点**

通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似（<code>SubType.prototype = new SuperType()</code>）。

### 寄生式组合继承

寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。

寄生式组合继承的基本模式如下所示：

```javascript
function inheritPrototype(subType, superType) {
  // let prototype = object(superType.prototype);
  let prototype = Object.create(superType.prototype); //创建对象
  prototype.constructor = subType; //增强对象
  subType.prototype = prototype; //赋值对象
}
```

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);

  this.age = age;
}

// SubType.prototype = inheritPrototype(SuperType);
SubType.prototype = Object.create(SuperType.prototype); // 创建对象（浅复制，并不调用SuperType函数）
SubType.prototype.constructor = SubType; // 增强对象

SubType.prototype.sayAge = function () {
  console.log(this.age);
};
```

**特点**

- 这里只调用了一次 SuperType 构造函数，避免了 SubType.prototype 上不必要也用不到的属性
- 因此可以说这个例子的效率更高。
