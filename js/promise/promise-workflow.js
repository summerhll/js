//promise 工作流测试代码

//resolve
function asyncFunction () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('async resoleve');
        }, 100)

    })
}

asyncFunction().then((res) => {
    console.log("resoleve:" + res); //resoleve:async resoleve
}, (res) => {
    console.log("reject:" + res);
}).catch(res => {
    console.log("error:" + res);
})


//reject
function asyncFunction () {
    return new Promise((resolve, reject) => {
        reject('async reject');
    })
}

asyncFunction().then((res) => {
    console.log("resoleve:" + res);
}, (res) => {
    console.log("reject:" + res); //reject:async reject
}).catch(res => {
    console.log("error:" + res);
})

//catch
function asyncFunction () {
    return new Promise((resolve, reject) => {
        reject('async catch');
    })
}

asyncFunction().then((res) => {
    console.log("resoleve:" + res);
}).catch(res => {
    console.log("catch:" + res); //catch:async catch
})
