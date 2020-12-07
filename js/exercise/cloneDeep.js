const cloneDeep = (target, hash = new WeakMap()) => {
    // 对于传入参数处理
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    // 哈希表中存在直接返回  解决循环引用
    if (hash.has(target)) return hash.get(target);



    // 支持函数
    if (obj instanceof Function) {
        return function () {
            return obj.apply(this, arguments)
        }
    }
    // 支持日期
    if (obj instanceof Date) return new Date(obj)
    // 支持正则对象
    if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
    // 还可以增加其他对象，比如：Map, Set等，根据情况判断增加即可，面试点到为止就可以了



    const cloneTarget = Array.isArray(target) ? [] : {};
    hash.set(target, cloneTarget);

    // 针对Symbol属性
    const symKeys = Object.getOwnPropertySymbols(target);
    if (symKeys.length) {
        symKeys.forEach(symKey => {
            if (typeof target[symKey] === 'object' && target[symKey] !== null) {
                cloneTarget[symKey] = cloneDeep1(target[symKey]);
            } else {
                cloneTarget[symKey] = target[symKey];
            }
        })
    }
    for (const i in target) {
        if (Object.prototype.hasOwnProperty.call(target, i)) {
            cloneTarget[i] =
                typeof target[i] === 'object' && target[i] !== null ?
                cloneDeep1(target[i], hash) :
                target[i];
        }
    }
    return cloneTarget;
}