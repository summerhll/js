//promise.race
// 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(执行.then方法)。
//Promise.race 在第一个promise对象变为Fulfilled之后，并不会取消其他promise对象的执行。

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
// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then(function (value) {
    console.log(Date.now() - startDate + 'ms');
    console.log(value);    // => 1
});


/**
 * 输出结果：
  timerPromisefy: 1，1576131211486
  timerPromisefy: 32，1576131211486
  timerPromisefy: 64，1576131211486
  timerPromisefy: 128，1576131211486
  Promise
  setTimeout: 1, 1576131211487
  1ms
  1
  setTimeout: 32, 1576131211521
  setTimeout: 64, 1576131211554
  setTimeout: 128, 1576131211616
 */
