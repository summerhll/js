Array.prototype.__some = function(callback) {
    for (var i = 0; i < this.length; i++) {
      if(callback.call(this, this[i], i, this)){
        return true
      }
    }
    return false
  }
  
  
  var arr = [1, 2, 3]
  var res = arr.__some((item,index) => {
    return  item > 2
  })
  console.log('res: ', res); // res:  true
  var res = arr.__some((item,index) => {
    return  item > 3
  })
  console.log('res: ', res); // res:  false
  