/*
    async await 示例2
    https://blog.csdn.net/roamingcode/article/details/85052590

    1.await函数先执行，await后面的函数进入等待状态，暂停执行。
    2. 微任务队列开始执行后就要将微任务队列执行完毕。
*/

async function async1 () {
    console.log('2')
    const data = await async2()
    console.log(data)
    console.log('8')
}

async function async2 () {
    return new Promise(function (resolve) {
        console.log('3')
        resolve('await的结果')
    }).then(function (data) {
        console.log('6')
        return data
    })
}
console.log('1')

setTimeout(function () {
    console.log('9')
}, 0)

async1()

new Promise(function (resolve) {
    console.log('4')
    resolve()
}).then(function () {
    console.log('7')
})
console.log('5')

/**
 输出结果：
 "1"
 "2"
 "3"
 "4"
 "5"
 "6"
 "7"
 "await的结果"
 "8"
 "9"
 */

/**
 解析过程：
 函数async1和async2只是定义先不去管他，首先输出1。
setTimeout作为宏任务进入宏任务队列等待下一轮事件循环。
进入async1()函数输出2，await下面的代码进入等待状态。
进入async2()输出3，then回调进入微任务队列。
现在执行外面的同步代码，输出4，5，then回调进入微任务队列。
按序执行微任务，输出6，7。现在回到async1函数。
输出data，也就是await关键字等到的内容，接着输出8。
进行下一轮时间循环输出9。执行结果：1 - 2 - 3 - 4 - 5 - 6 - 7 - await的结果 - 8 - 9
 */
