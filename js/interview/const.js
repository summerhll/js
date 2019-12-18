/**
 * 记录const面试问题
 */

//问题1
const a = {};
const b = { key: 'b' };
const c = { key: 'c' }
a[b] = 123;
a[c] = 456;
console.log(a[b]); //输出：456

/** 
解析：对象中的键会被转为字符串类型，第5题里面使用对象作为键，不管哪个对象，转为字符串后都变成了"[object Object]"
所以上述问题变成：
a["[object Object]"] = 123,
a["[object Object]"] = 456
a[b] 实际上就是a["[object Object]"] 所以是456
*/

//问题2
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers); //输出：[1, 2, 3, 7*empty, 11]
