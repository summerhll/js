
/**
 * eventloop 示例
 * https://zhuanlan.zhihu.com/p/41543963
 */
console.log(1);

setTimeout(() => {
    console.log('setTimeout');
}, 0);

let promise = new Promise(resolve => {
    console.log(3);
    resolve();
}).then(data => {
    console.log(100);
}).then(data => {
    console.log(200);
});

console.log(2);

/**
输出：1 3 2 100 200 setTimeout


 */

