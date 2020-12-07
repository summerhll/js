Function.prototype.myApply = function (context = window, args) {
    if (typeof this !== 'function') {
      throw new TypeError('Type Error');
    }
    const fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
      result = context[fn](...args);
    } else {
      result = context[fn]();
    }
    delete context[fn];
    return result;
  }
