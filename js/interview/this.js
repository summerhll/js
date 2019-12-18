/**
 * 记录this面试问题
 */

//问题1
let obj1 = {
    name: "obj1_name",
    print: function () {
        return () => console.log(this.name);
    }
}

let obj2 = { name: 'obj2_name' };
obj1.print()(); //输出： obj1_name
obj1.print().call(obj2); //输出： obj1_name
obj1.print.call(obj2)();//输出： obj2_name


//问题2
function Foo () {
    getName = function () {
        console.log(1);
    };
    return this;
}

Foo.getName = function () {
    console.log(2);
}

Foo.prototype.getName = function () {
    console.log(3);
}

var getName = function () {
    console.log(4);

}
function getName () {
    console.log(5);
}
Foo.getName(); //输出2
getName(); //输出4
Foo().getName(); //输出1 Foo()执行后，导致getName变成输出1
getName();  //输出1
new Foo.getName(); //输出2
new Foo().getName();  //输出3 (new Foo()).getName()
new new Foo().getName(); //输出3  new (new Foo().getName)();








