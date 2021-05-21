const compileUtil = {
    getValue(key, vm){
        // return vm.$data[key]; //简易实现
        //getValue('person.name', vm)

        key = key.replace(/\s+/g, '');
        return key.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)

    },
    setValue(expr, vm, inputVal){
        expr = expr.replace(/\s+/g, '');
        return expr.split('.').reduce((data, currentVal) => {
             data[currentVal] = inputVal;
        }, vm.$data)


    },

    getContentVal(con, vm){
        //解析双花括号
        let reg = /\{\{(.+?)\}\}/g; //匹配{{}}
        return con.replace(reg, (...args) => {
            return this.getValue(args[1], vm);
        });
    },

    text(node, expr, vm){ //expr: msg
        let value;
        if(expr.indexOf("{{") != -1){
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                // key -> args[1]
                // obj -> this.vm.$data

                new Watcher(vm, args[1], (newVal) => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm));
                });
                return this.getValue(args[1], vm);
            });
        }else{
            value = this.getValue(expr, vm);
        }

        this.updater.textUpdater(node, value);
    },
    html(node, expr, vm){
        const value = this.getValue(expr, vm);
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, value);
        });
        this.updater.htmlUpdater(node, value);
        
    },
    model(node, expr, vm){
        const value = this.getValue(expr, vm);
        //绑定更新函数  数据=》视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, value);
        });

        //视图=》数据
        node.addEventListener("input", (e)=>{
            //设置值
            this.setValue(expr, vm, e.target.value);


        });

        this.updater.modelUpdater(node, value);

    },
    on(node, expr, vm, eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName, fn.bind(vm), false);

    },
   
    updater : {
        textUpdater(node, value){
            node.textContent = value;
        },
        htmlUpdater(node, value){
            node.innerHtml = value;
        },
        modelUpdater(node, value){
            node.value = value;
        }

    },

   

    


}