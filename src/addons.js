Function.prototype.bind = Function.prototype.bind || function (context) {
    var args = Array.prototype.slice.call(arguments, 1);
    var func = this;
    return function () {
        var add_args = Array.prototype.slice.call(arguments);
        return func.apply(context, args.concat(add_args));
    }
};