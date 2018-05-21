(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['mustache'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        var mustach = require['mustache'];
        module.exports = factory(mustach);
    } else {
        root.UmdModule = factory(root.Mustache);
    }
}(this, function(mustache) {
    /// stuff
    return {}
}));