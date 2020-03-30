window.onload = function () {
    var data = {
        name: "111"
    }
    function defineReactive (obj, key) {
        let val = obj[key];
        Object.defineProperty(obj, key, {
            get () {
                console.log("getter...");
                console.log("当前值为： " + val);
                return val;
            },
            set (newValue) {
                console.log("setter...");
                console.log("当前值为：" + newValue);
                val = newValue

            }
        })
    }

    defineReactive(data, 'name');
    data.name
    data.name = '222'

}
