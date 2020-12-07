Array.prototype.__find = function(callback) {
    for (var i = 0; i < this.length; i++) {
      if(callback.call(this, this[i], i, this)){
        return this[i]
      }
    }
    return undefined
  }
  
  
  var arr = [1, 2, 3]
  var res = arr.__find((item,index) => {
    return  item > 1
  })
  console.log('res: ', res); // res:  2
  var res = arr.__find((item,index) => {
    return  item > 2
  })
  console.log('res: ', res); // res:  3
  