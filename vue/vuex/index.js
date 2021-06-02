
//简易的vuex


let Vue;

//自定义遍历函数
let myForEach = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        callback(key, obj[key]);
    })
}
class Store {
    constructor(options) {
        let vm = new Vue({
            data: {
                state: options.state
            }
        })

        let getters = options.getters; //获取用户传入的getters
        this.getters = {};
        myForEach(getters, (getterName, value) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    //todo 实现双向绑定
                    return value(this.state);
                }
            })
        })



        //发布订阅
        //订阅：将函数订阅到数组中
        //发布： 将数组中的函数依次执行
        let mutations = option.mutations;
        this.mutations = {};

        myForEach(mutations, (mutationName, value) =>{
            this.mutations[mutationName] = (payload) => {
                value(this.state, payload);

            }
        })

        let actions = options.actions;
        this.actions = {};
        myForEach(actions, (actionName, value) => {
            this.actions[actionName] = (payload) =>{
                value(this, payload);
            }
        })
    }

    //获取实例上的state属性，就会执行此方法
    get state() {
        return this.vm.state;
    }

    commit = (mutationName, payload)=>{ //this 指向当前store的实例
        this.mutations[mutationName](payload);
    }

    dispatch = (actionName, payload) => {
        this.actions[actionName](payload);
    }

}

const install = (_Vue) => { //Vue构造函数
    Vue = _Vue; //Vue构造函数

    //所有根实例的子组件才有$store方法
    Vue.mixin({ //抽取公共逻辑
        beforeCreate() { //组件的创建过程是先父后子

            //把父组件的store属性放到每个组件的实例上
            if (this.$options.store) { //根实例
                this.$store = this.$options.store;

            } else {
                this.$store = this.$parent && this.$parent.$store;
            }


        },
    })

}

export default {
    Store,
    install

}