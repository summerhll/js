Promise.myAll = function(iterators) {
    const promises = Array.from(iterators);
    const num = promises.length;
    const resolvedList = new Array(num);
    let resolvedNum = 0;
  
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        Promise.resolve(promise)
          .then(value => {
            // 保存这个promise实例的value
            resolvedList[index] = value;
            // 通过计数器，标记是否所有实例均 fulfilled
            if (++resolvedNum === num) {
              resolve(resolvedList);
            }
          })
          .catch(reject);
      });
    });
  };