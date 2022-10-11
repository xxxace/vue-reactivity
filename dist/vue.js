
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueReactivity = {}));
})(this, (function (exports) { 'use strict';

    function computed() {
    }

    function effect() {
    }

    var isObject = function (val) { return val !== null && typeof val === 'object'; };
    var isSymbol = function (val) { return typeof val === 'symbol'; };
    var isString = function (val) { return typeof val === 'string'; };
    var isArray = Array.isArray;
    var isIntegerKey = function (key) { return isString(key) &&
        key !== 'NaN' &&
        key[0] !== '-' &&
        '' + parseInt(key, 10) === key; };
    var hasChanged = function (newValue, oldValue) { return newValue !== oldValue; };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasOwn = function (val, key) { return hasOwnProperty.call(val, key); };

    function createGetter() {
        return function get(target, key, receiver) {
            var value = Reflect.get(target, key, receiver);
            // 如果是Symbol则直接返回
            if (isSymbol(key)) {
                return value;
            }
            // 依赖收集
            // 取值时是对象则转换成proxy对象，vue2是一上来就递归转换，veu3则是取值才转换。
            if (isObject(value)) {
                return reactive(value);
            }
            return value;
        };
    }
    function createSetter() {
        return function set(target, key, value, receiver) {
            var oldValue = target[key];
            var hadKey = isArray(key) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
            // vue2不支持新增属性
            var result = Reflect.set(target, key, value, receiver);
            if (!hadKey) {
                // 新增属性
                console.log('// 新增属性');
            }
            else if (hasChanged(result, oldValue)) {
                // 修改属性
                console.log('// 修改属性');
            }
            return result;
        };
    }
    var get = createGetter();
    var set = createSetter();
    var mutableHandler = {
        get: get,
        set: set
    };

    function reactive(target) {
        // 将目标装换成响应式对象，Proxy
        return createReactiveObject(target, mutableHandler);
    }
    var proxyMap = new WeakMap();
    function createReactiveObject(target, proxyHandler) {
        if (!isObject(target)) {
            return target;
        }
        var cacheProxy = proxyMap.get(target);
        if (cacheProxy) {
            return cacheProxy;
        }
        var proxy = new Proxy(target, proxyHandler);
        proxyMap.set(target, proxy);
        return proxy;
    }

    function ref() {
    }

    exports.computed = computed;
    exports.effect = effect;
    exports.reactive = reactive;
    exports.ref = ref;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vue.js.map
