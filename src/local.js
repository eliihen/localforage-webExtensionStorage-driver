import { getStorage, usePromise } from './utils';

export default {
  _driver: 'webExtensionLocalStorage',
  _support: !!(getStorage() && getStorage().local),
  _initStorage() {
    return Promise.resolve();
  },

  async clear(callback) {
    getStorage().local.clear();

    if (callback) callback();
  },

  async iterate(iterator, callback) {
    const items = await usePromise(getStorage().local.get, null);
    const keys = Object.keys(items);
    keys.forEach((key, i) => iterator({ [key]: items[key] }, i));

    if (callback) callback();
  },

  async getItem(key, callback) {
    let result = await usePromise(getStorage().local.get, key);
    result = typeof key === 'string' ? result[key] : result;

    if (callback) callback(result);
    return result;
  },

  async key(n, callback) {
    const results = await usePromise(getStorage().local.get, null);
    const key = Object.keys(results)[n];

    if (callback) callback(key);
    return key;
  },

  async keys(callback) {
    const results = await usePromise(getStorage().local.get, null);
    const keys = Object.keys(results);

    if (callback) callback(keys);
    return keys;
  },

  async length(callback) {
    const results = await usePromise(getStorage().local.get, null);
    const length = Object.keys(results).length;

    if (callback) callback(length);
    return length;
  },

  async removeItem(key, callback) {
    await usePromise(getStorage().local.remove, key);
    if (callback) callback();
  },

  async setItem(key, value, callback) {
    await usePromise(getStorage().local.set, { [key]: value });
    if (callback) callback();
  },
};

