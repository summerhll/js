Array.prototype.__findIndex = function(callback) {
    for (var i = 0; i < this.length; i++) {
      if(callback.call(this, this[i], i, this)){
        return i
      }
    }
    return -1
  }
  
  
  
  var arr = [1, 2, 3]
  var res = arr.__findIndex((item,index) => {
    return  item > 1
  })
  console.log('res: ', res); // res:  1
  var res = arr.__findIndex((item,index) => {
    return  item > 4
  })
  console.log('res: ', res); // res:  -1
  