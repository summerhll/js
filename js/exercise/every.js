Array.prototype.__every = function(callback) {
    for (var i = 0; i < this.length; i++) {
      if(!callback.call(this, this[i], i, this)){
        return false
      }
    }
    return true
  }
  
  
  var arr = [1, 2, 3]
  var res = arr.__every((item,index) => {
    return  item > 0
  })
  console.log('res: ', res); // res:  true
  var res = arr.__every((item,index) => {
    return  item > 2
  })
  console.log('res: ', res); // res:  false