#promise
参考链接： https://www.kancloud.cn/kancloud/promises-book/44257

promise的功能是可以将复杂的异步处理轻松地进行模式化。

## promise 状态
Pending: promise对象刚被创建后的初始化状态。
Fullfilled: resolve(成功)时。
Rejected: reject(失败)时。

promise对象的状态，从_Pending_转换为_Fulfilled_或_Rejected_之后， 这个promise对象的状态就不会再发生任何变化。
也就是说，Promise与Event等不同，在.then 后执行的函数可以肯定地说只会被调用一次。

## promise.then
promise.then(onFulfilled, onRejected)
resolve(成功)时：onFulfilled 会被调用,
reject(失败)时：onRejected 会被调用。
onFulfilled、onRejected 两个都为可选参数。

promise.then 成功和失败时都可以使用。 另外在只想对异常进行处理时可以采用 promise.then(undefined, onRejected) 这种方式，只指定reject时的回调函数即可。 不过这种情况下 promise.catch(onRejected) 应该是个更好的选择。

## promise.all
Promise.all 接收一个 promise对象的数组作为参数，当这个数组里的所有promise对象全部变为resolve状态的时候，它才会去调用 .then 方法。
传递给 Promise.all 的promise并不是一个个的顺序执行的，而是同时开始、并行执行的。

例如：调用 Promise.all([request.comment(), request.people()])
则 .then 得到的promise数组的执行结果的顺序是固定的，即[commnet, people].

如果参数中的任何一个promise为reject的话，则整个Promise.all调用会立即终止，并返回一个reject的新的promise对象。

## promise.race
Promise.race 接收一个 promise对象的数组作为参数，只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。
Promise.race 在第一个promise对象变为Fulfilled之后，并不会取消其他promise对象的执行。

## promise.then vs promise.catch
promise.catch 也可以理解为 promise.then(undefined, onRejected);

1. 使用  promise.then(onFulfilled, onRejected) 的话，在 onFulfilled 中发生异常的话，在 onRejected 中是捕获不到这个异常的。

.then 方法中的onRejected参数所指定的回调函数，实际上针对的是其promise对象或者之前的promise对象，而不是针对 .then 方法里面指定的第一个参数，即onFulfilled所指向的对象。

2.在 promise.then(onFulfilled).catch(onRejected) 的情况下，.then 中产生的异常能在 .catch 中捕获
