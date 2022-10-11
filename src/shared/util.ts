export const isObject = (val: any) => val !== null && typeof val === 'object';
export const isSymbol = (val: any) => typeof val === 'symbol';
export const isString = (val: any) => typeof val === 'string';
export const isArray = Array.isArray;
export const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;

export const hasChanged = (newValue, oldValue) => newValue !== oldValue;

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key) => hasOwnProperty.call(val, key);