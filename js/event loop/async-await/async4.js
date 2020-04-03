/*
    async await 示例4
    https://blog.csdn.net/roamingcode/article/details/85052590

   1.await函数先执行，await后面的函数进入等待状态，暂停执行。
    2. 微任务队列开始执行后就要将微任务队列执行完毕。
*/
console.log('1')
async function async1 () {
    console.log('2')
    await 'await的结果'
    console.log('5')
}

async1()
console.log('3')

new Promise(function (resolve) {
    console.log('4')
    resolve()
}).then(function () {
    console.log('6')
})



/**
输出结果：
 "1"
 "2"
 "3"
 "4"
  "5"
 "6"

 */

/**
 解析过程：
 首先输出1，然后进入async1()函数，输出2。
await后面虽然是一个直接量，但是还是会先执行async函数外的同步代码。
输出3，进入Promise输出4，then回调进入微任务队列。
现在同步代码执行完了，回到async函数继续执行输出5。
最后运行微任务输出6。

 */
