/**
 * 记录event loop的面试题
 * 参考资料：
 * https://github.com/forthealllight/blog/issues/5
 * 
 * nodejs环境：
 * https://segmentfault.com/a/1190000008595101
 */

//问题1（浏览器和node环境下执行结果会不一样，目前只考虑浏览器环境）
async function async1 () {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2 () {
    console.log("async2");
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout0')
}, 0);

setTimeout(function () {
    console.log('setTimeout3')
}, 3);

setImmediate(() => console.log('setImmediate'));

// process.nextTick(() => {
//     console.log('nextTick');
// });

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
    console.log('promise2');
}).then(function () {
    console.log('promise3');
})

console.log('script end');
/**
浏览器中的输出结果:
script start
async1 start
async2
promise1
promise2
script end
async1 end
promise3
setImmediate
setTimeout0
setTimeout3
 */


