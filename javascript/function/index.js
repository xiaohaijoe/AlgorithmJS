class SolutionBind {
  bindPolyfill() {
    Function.prototype.bind = function () {
      var fn = this,
        _this = arguments[0],
        args = Array.prototype.slice.call(arguments, 1);

      return function () {
        fn.apply(_this, args.concat(arguments));
      };
    };
  }

  static test() {
    const s = new SolutionBind();
    s.bindPolyfill();

    function fn() {
      console.log(this.a);
    }

    const foo = fn.bind({ a: 10 });
    foo();
  }
}

SolutionBind.test();
