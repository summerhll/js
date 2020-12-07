//类数组是具有length属性，但不具有数组原型上的方法。常见的类数组有arguments、DOM操作方法返回的结果。

//方法一：Array.from

Array.from(document.querySelectorAll('div'))


//方法三：扩展运算符

[...document.querySelectorAll('div')]


//方法三：Array.prototype.slice.call()

Array.prototype.slice.call(document.querySelectorAll('div'))


//方法四：利用concat

Array.prototype.concat.apply([], document.querySelectorAll('div'));

