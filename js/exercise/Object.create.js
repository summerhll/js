function create =  function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
};