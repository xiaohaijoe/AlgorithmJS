## Function

**索引**

1. <a href="#bind">bind</a>

## <a name='bind'>bind

```javascript
Function.prototype.bind = function () {
  var fn = this,
    _this = arguments[0],
    args = Array.prototype.slice.call(arguments, 1);

  return function () {
    fn.apply(_this, args.concat(arguments));
  };
};
```
