Function.prototype.bind = function(context, ...args) {
    if (typeof this !== 'function') {
      throw new Error("Type Error");
    }
    // 保存this的值
    var self = this;
  
    return function F() {
      // 考虑new的情况
      if(this instanceof F) {
        return new self(...args, ...arguments)
      }
      return self.apply(context, [...args, ...arguments])
    }
  }