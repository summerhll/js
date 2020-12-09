const compileUtil = {
    text(node, con, vm){
        let value = 
    },
fajkhfhf    
    updater : 
        textUpdater(node, value){
            node.textContent = value;
        }

    },

    getValue(key, vm){
        // return vm.$data[key]; //简易实现
        //getValue('person.name', vm)

        key = key.replace(/\s+/g, '');
        return key.split('.').reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)

    },

    getContentVal(con, vm){
        //解析双花括号
        let reg = /\{\{(.+?)\}\}/g; //匹配{{}}
        return con.replace(reg, (...args) => {
            return this.getValue(args[1], vm);
        });

    }


}