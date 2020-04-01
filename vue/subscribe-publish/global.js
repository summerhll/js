/**
 * 全局 发布-订阅模式对象
 */

window.onload = function () {
    var Event = (function () {
        var list = {};
        var listen = function (key, fn) {
            if (!list[key]) {
                list[key] = [];
            }
            list[key].push(fn);
        }

        var trigger = function () {
            let key = Array.prototype.shift.call(arguments);
            let fns = list[key]
            if (!fns || fns.length == 0) {
                return;
            }
            for (var i = 0; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        }

        var remove = function (key, fn) {
            var fns = list[key];
            if (!fns) {
                return;
            }
            if (!fn) {
                fns && (fns.length = 0);
            } else {
                for (var i = 0; i < fns.length; i++) {
                    var _fn = fns[i];
                    if (_fn == fn) {
                        fns.splice(i, 1);
                    }
                }
            }
        }

        return {
            listen,
            trigger,
            remove
        }
    })();

    var callback = function (size) {
        console.log("尺码为:" + size);
    }
    Event.listen("color", callback);
    Event.trigger("color", 42);
    Event.remove("color", callback);

    this.setTimeout(() => {
        Event.trigger("color", 42); //不生效
        Event.listen("size", callback);
        Event.trigger("size", 33);

    }, 1000)



}
