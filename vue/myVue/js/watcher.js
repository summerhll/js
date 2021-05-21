class Watcher{
    constructor(vm, expr, cb){
        this.vm = vm;
        this.cb = cb;
        this.expr = expr;
        //先把旧值保存起来
        this.oldVal = this.getOldVal();
    }

    getOldVal(){
        Dep.target = this;
        const oldVal = compileUtil.getValue(this.expr, this.vm);
        Dep.target = null;
        return oldVal;
    }
    update(){
        const newVal = compileUtil.getValue(this.expr, this.vm);
        if( newVal != this.oldVal){
            this.cb(newVal);
        }

    }
}