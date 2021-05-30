let myPromise = require('./myPromise');

//普通用法
// let promise = new myPromise((resolve, reject) => {
//     //throw new Error('失败')
//     resolve("hello1");
// }).then(data => {
//     console.log(data);
// }, err => {
//     console.log("err", err);
// })


// let promise = new myPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("hello2");
//     }, 1000);

// }).then(data => {
//     console.log(data);
// }, err => {
//     console.log("err", err);
// })

let p = new myPromise((resolve, reject) =>{
    resolve(100);
});



let promise2 = p.then(data =>{
    return new myPromise((resolve, reject) => {
        setTimeout(()=>{
         reject('hello')
        }, 1000)
    })

})
promise2.then(data => {
    return data;
}, err =>{
    console.log("err " + err);
    return 10;
}).then(data =>{
    console.log('s ' + data);
    
})
