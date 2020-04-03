/*
    async await 示例3
    https://blog.csdn.net/roamingcode/article/details/85052590

    1.await函数先执行，await后面的函数进入等待状态，暂停执行。
    2. 微任务队列开始执行后就要将微任务队列执行完毕。
*/

async function async1 () {
    console.log('2')
    await async2()
    console.log('7')
}

async function async2 () {
    console.log('3')
}

setTimeout(function () {
    console.log('8')
}, 0)

console.log('1')
async1()

new Promise(function (resolve) {
    console.log('4')
    resolve()
}).then(function () {
    console.log('6')
})
console.log('5')


/**
输出结果：
  "1"
  "2"
  "3"
  "4"
  "5"
  "7"
  "6"
  "8"

 */

/**
 解析：
 首先输出同步代码1，然后进入async1方法输出2。
因为遇到await所以先进入async2方法，后面的7处于等待状态。
在async2中输出3，现在跳出async函数先执行外面的同步代码。
输出4，5。then回调进入微任务栈。
现在宏任务执行完了，然后回到async1函数接着往下执行输出7。
然后执行微任务输出6。

 */
