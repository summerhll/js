/*
    async await 示例5
    https://blog.csdn.net/roamingcode/article/details/85052590

    1.await函数先执行，await后面的函数进入等待状态，暂停执行。
    2. 微任务队列开始执行后就要将微任务队列执行完毕。
*/

setTimeout(function () {
    console.log('6')
}, 0)
console.log('1')
async function async1 () {
    console.log('2')
    await async2()
    console.log('5')
}
async function async2 () {
    console.log('3')
}
async1()
console.log('4')

/**
  结果：
    "1"
    "2"
    "3"
    "4"
    "5"
    "6"
 */

/**
 解析：
 6是宏任务在下一轮事件循环执行
先同步输出1，然后调用了async1()，输出2。
await async2() 会先运行async2()，5进入等待状态。
输出3，这个时候先执行async函数外的同步代码输出4。
最后await拿到等待的结果继续往下执行输出5。
进入第二轮事件循环输出6。

 */
