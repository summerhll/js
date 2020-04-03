/*
    async await 示例1
    https://blog.csdn.net/roamingcode/article/details/85052590

    1.await函数先执行，await后面的函数进入等待状态，暂停执行。
    2. 微任务队列开始执行后就要将微任务队列执行完毕。
*/

//例子1
setTimeout(function () {
    console.log('8')
}, 0)

async function async1 () {
    console.log('1')
    const data = await async2()
    console.log('6')
    return data
}

async function async2 () {
    return new Promise(resolve => {
        console.log('2')
        resolve('async2的结果')
    }).then(data => {
        console.log('4')
        return data
    })
}

async1().then(data => {
    console.log('7')
    console.log(data)
})

new Promise(function (resolve) {
    console.log('3')
    resolve()
}).then(function () {
    console.log('5')
})

/**
 输出：
  "1"
  "2"
  "3"
  "4"
  "5"
  "6"
  "7"
  "async2的结果"
  "8"
 */

/**
 解析过程：
    setTimeout作为宏任务进入宏任务队列等待下一轮事件循环。
    先执行async1函数，输出1，6进入等待状态，现在执行async2。
    输出2，then回调进入微任务队列。
    接下来执行外面的同步代码输出3，then回调进入微任务队列。
    按序执行微任务，输出4，5。下面回到async1函数。
    输出了4之后执行了return data，await拿到了内容。
    继续执行输出6，执行了后面的 return data 才触发了async1()的then回调输出7以及data。
    进行第二轮事件循环输出8。执行结果：1 - 2 - 3 -4 - 5 - 6 - 7 - async2的结果 - 8
 */
