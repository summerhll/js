
//promise.all
//传递给 Promise.all 的promise并不是一个个的顺序执行的，而是同时开始、并行执行的。
//如果参数中的任何一个promise为reject的话，则整个Promise.all调用会立即终止，并返回一个reject的新的promise对象。

//一. 全部promise都resolve，才执行.then
// `delay`毫秒后执行resolve
function timerPromisefy (delay) {
    return new Promise(function (resolve) {
        console.log("timerPromisefy: " + delay + "，" + Date.now());
        setTimeout(function () {
            resolve(delay);
            console.log("setTimeout: " + delay + ", " + Date.now());
        }, delay);
    });
}
var startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (values) {
    console.log(Date.now() - startDate + 'ms');
    // 输出结果越128ms
    console.log(values);    // [1,32,64,128]
});
/**
 *
  timerPromisefy: 1，1576130278396
  timerPromisefy: 32，1576130278396
  timerPromisefy: 64，1576130278396
  timerPromisefy: 128，1576130278396
  Promise
  setTimeout: 1, 1576130278397
  setTimeout: 32, 1576130278430
  setTimeout: 64, 1576130278461
  setTimeout: 128, 1576130278527
  131ms
  [1, 32, 64, 128]
 */

//一. 有一个promise reject,就执行.then
// `delay`毫秒后执行resolve
function timerPromisefy (delay) {
    return new Promise(function (resolve, reject) {
        console.log("timerPromisefy: " + delay + "，" + Date.now());
        setTimeout(function () {
            reject(delay);
            console.log("setTimeout: " + delay + ", " + Date.now());
        }, delay);
    });
}
var startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (values) {
    console.log("then: " + (Date.now() - startDate) + 'ms');
    // 输出结果越128ms
    console.log("then: " + values);    // [1,32,64,128]
}).catch(values => {
    console.log("catch: " + (Date.now() - startDate) + 'ms');
    // 输出结果越128ms
    console.log("catch: " + values);    // [1,32,64,128]

});
/**
 timerPromisefy: 1，1576133685854
 timerPromisefy: 32，1576133685854
 timerPromisefy: 64，1576133685855
 timerPromisefy: 128，1576133685855
Promise
 setTimeout: 1, 1576133685856
 catch: 2ms
 catch: 1
 setTimeout: 32, 1576133685888
 setTimeout: 64, 1576133685921
 setTimeout: 128, 1576133685983

 */


