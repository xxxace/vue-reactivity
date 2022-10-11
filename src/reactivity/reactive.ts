import { isObject } from '@/shared/util';
import { mutableHandler } from './proxyHandler';

export function reactive(target: object) {
    // 将目标装换成响应式对象，Proxy
    return createReactiveObject(target, mutableHandler);
}

const proxyMap = new WeakMap();

function createReactiveObject(target: object, proxyHandler: ProxyHandler<object>) {
    if (!isObject(target)) {
        return target;
    }

    const cacheProxy = proxyMap.get(target);
    if (cacheProxy) {
        return cacheProxy;
    }

    const proxy = new Proxy(target, proxyHandler);
    proxyMap.set(target, proxy);

    return proxy;
}