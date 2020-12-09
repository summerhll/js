class MyVue {
    constructor(options){
        this.$data = options.data;
        this.$el = document.querySelector(options.el);

        //1.数据代理
        this.proxyData();

        //2.数据劫持

        //3.模版编译
        new ComPile(this);
        
        
       

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