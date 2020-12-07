Array.prototype.__forEach = function(callback) {
    for (var i = 0; i < this.length; i++) {
      callback.call(this, this[i], i, this)
    }
  }
  var arr = [1, 2, 3]
  var res = arr.__forEach((item,index) => {
    return arr[index]  = item * 2
  })
  console.log('arr: ', arr); // arr:  [ 2, 4, 6 ]
  console.log('res: ', res); // res:  undefined