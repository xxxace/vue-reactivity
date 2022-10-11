import { hasChanged, hasOwn, isArray, isIntegerKey, isObject, isSymbol } from '@/shared/util';
import { reactive } from './reactive';

function createGetter() {
    return function get(target, key, receiver) {
        const value = Reflect.get(target, key, receiver);

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
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const oldValue = target[key];
        const hadKey = isArray(key) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        // vue2不支持新增属性
        const result = Reflect.set(target, key, value, receiver);

        if (!hadKey) {
            // 新增属性
            console.log('// 新增属性')
        } else if (hasChanged(result, oldValue)) {
            // 修改属性
            console.log('// 修改属性')
        }

        return result;
    }
}

const get = createGetter();
const set = createSetter();

export const mutableHandler = {
    get,
    set
}