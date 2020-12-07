Array.prototype._filter = function (fn, thisValue) {
    let arr = thisValue || this
    let result = []
    if (typeof fn !== 'function') {
      throw new TypeError(fn + ' is not a function');
    }
    if (!arr.length) { // 空数组不处理 直接返回空数组
        return []
    }
    for (let i = 0; i < arr.length; i++) {
      if(fn.call(arr, arr[i], i, arr)) {
        result.push(arr[i])
      }
    }
    return result
}

 
   
let arr = [4, 9, 16, 25];
let result = arr._filter((item) => {
    return item > 10
})
console.log(result) // [16, 25]