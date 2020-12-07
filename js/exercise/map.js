Array.prototype.__map = function(callback) {
    var arr = []
    for (var i = 0; i < this.length; i++) {
      arr.push(callback.call(this, this[i], i, this))
    }
    return arr
  }
  
  
  var res = [1, 2, 3].__map(item => {
    return item * 2
  })
  console.log('res: ', res);// res:  [ 2, 4, 6 ]