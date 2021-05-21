class ComPile {

    constructor(vm) {
        this.el = vm.$el;
        this.vm = vm;

        //编译模版：本质是检查模板容器的每一个子节点，当遇到特殊标记时（双花括号，指令），对其进行解析。
        //思路： 遍历容器中所有的子节点：childNodes, 但是频繁地操作Dom元素会造成严重的性能问题。

        /** 
            解决办法： 通过文档片段来编译模板
            1. createDocumentFragment()方法，是用来创建一个虚拟的节点对象。
            2. DocumentFragment节点不属于文档树，它有如下特点
              1>当把该节点插入文档树时，插入的不是该节点本身，而是它所有的子孙节点。
              2>当添加各个dom元素时，如果现将这些元素添加到DocumentFragment中，在统一将DocumentFragment添加到页面，
              会减少页面的重排和重绘，进而提升页面渲染性能。
              3>使用appendChild 方法将dom树中的节点添加到DocumentFragment中时，会删除原来的节点。
        */

        // 1.将模板容器中的所有子节点添加到文档片段中
        const fragment = this.nodeToFragment();

        // 2.编译文档片段（解析{{}}、指令）
        this.compileFragment(fragment);

        // 3.将编译后的文档片段追加到模板容器中 
        this.el.appendChild(fragment);

    }

    //将模板容器中的所有子节点添加到文档片段中
    nodeToFragment() {
        //创建文档片段
        const f = document.createDocumentFragment();

        //将模板容器中的所有子节点添加到文档片段中
        while (this.el.firstChild) {
            f.appendChild(this.el.firstChild);
        }
        return f;
    }

    //编译文档片段（解析{{}}、指令）
    compileFragment(fragment) {
        const nList = fragment.childNodes;
        nList.forEach(node => {
            const nType = node.nodeType;
            if(nType === 1){ //元素节点， 解析指令
                this.compileElement(node)

            } else if(nType === 3){ //文档节点， 解析{{}}
                this.compileText(node);
            }
            
            //如果node有子节点，则递归调用compile方法
            if(node.childNodes && node.childNodes.length > 0){
                this.compileFragment(node)
            }
        })
    }

    //解析文档节点 {{}}
    compileText(node){ 
        const con = node.textContent;
        let reg = /\{\{(.+?)\}\}/g; //匹配文本节点
        if(reg.test(con)){
            const newVal = con.replace(reg, (...args) => {
                // key -> args[1]
                // obj -> this.vm.$data
                return this.vm.$data[args[1]];
            });
            node.textContent = newVal;
        }   
    }

    //解析元素节点
    compileElement(node){
       const attrs =  node.attributes;
       Array.from(attrs).forEach(attr => {
         const { name, value } = attr;
         if(this.isDirective(name)){ //是一个指令 v-text v-html v-model v-on:click
             const [, directive] = name.split('-'); //[v, model]
             const [dirName, eventName] = directive.split(":");// text html model on
             //更新数据 数据驱动视图
             compileUtil[dirName](node, value, this.vm, eventName);

            //删除有指令的标签上的属性
            node.removeAttribute("v-" + directive);


            //  if(directive === "model"){
            //      //key => value
            //      //obj => this.vm.$data
            //      node.value =  this.vm.$data[value]
            //  }
         }else if(this.isEventName(name)){ //@click = "handleClick"
            let [, eventName ] = name.split('@');
            compileUtil['on'](node, value, this.vm, eventName);
         }
       })
    }

    //是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-');
    }
    //是否是事件函数
    isEventName(attrName){
        return attrName.startsWith('@');

    }

}