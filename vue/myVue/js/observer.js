class Observer{
    constructor(data){
        this.observe(data);
    }
    observe(data){
        /** 
         {
             person: {
                 name : '张三',
                 fav : {
                     a: "爱好"
                 }
             }
         }
        */

         if(data && typeof data === "object"){
             Object.keys(data).forEach(key => {
                 this.defineReactive(data, key, data[key]);
             })
         }  
    }

    defineReactive(obj, key, value){
        //递归遍历
        this.observe(value);
        const dep = new Dep();

        //劫持并监听所有的属性
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get(){
                //订阅数据变化时，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: (newVal) => {
                this.observe(newVal);
                if(newVal !== value){
                    value = newVal;
                }
                //Dep通知变化
                dep.notify();

            }
        })
    }
}