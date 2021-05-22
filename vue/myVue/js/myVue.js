class MyVue {
    constructor(options){
        this.$options = options;
        this.$data = options.data;
        this.$el = options.el;
        if(this.$el){  
            //1.实现一个数据观察者 数据劫持
            new Observer(this.$data);
            //2.实现一个指令解析器 模板编译
            new ComPile(this.$el, this);
            //3.数据代理
            this.proxyData();
        }
    }

    //数据代理 访问vm.key 实际上访问的是 vm.$data.key
    proxyData(){
        for(const key in this.$data){
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: false,
                get(){
                    return this.$data[key];
                },
                set(newVal){
                    this.$data[key] = newVal;
    
                }
            })
        }
    }
}