
/**
 * 微任务中又产生微任务的执行顺序
 * 
 * 题目来源链接：
 * https://zhuanlan.zhihu.com/p/29116364
 * 
 */
function foo () {
    console.log("Start of queue");
    bar();
    setTimeout(function () {
        console.log("Middle of queue");
    }, 0);
    Promise.resolve().then(function () {
        console.log("Promise resolved");
        Promise.resolve().then(function () {
            console.log("Promise resolved again");
        });
    });
    console.log("End of queue");
}

function bar () {
    setTimeout(function () {
        console.log("Start of next queue");
    }, 0);
    setTimeout(function () {
        console.log("End of next queue");
    }, 0);
}

foo();

/**

输出：
Start of queue
End of queue
Promise resolved
Promise resolved again
Start of next queue
End of next queue
Middle of queue

 */
