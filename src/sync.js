import { getStorage, usePromise } from './utils';

export default {
  _driver: 'webExtensionSyncStorage',
  _support: !!(getStorage() && getStorage().sync),
  _initStorage() {
    return Promise.resolve();
  },

  async clear(callback) {
    getStorage().sync.clear();

    if (callback) callback();
  },

  async iterate(iterator, callback) {
    const items = await usePromise(getStorage().sync.get, null);
    const keys = Object.keys(items);
    keys.forEach((key, i) => iterator({ [key]: items[key] }, i));

    if (callback) callback();
  },

  async getItem(key, callback) {
    let result = await usePromise(getStorage().sync.get, key);
    result = typeof key === 'string' ? result[key] : result;

    if (callback) callback(result);
    return result;
  },

  async key(n, callback) {
    const results = await usePromise(getStorage().sync.get, null);
    const key = Object.keys(results)[n];

    if (callback) callback(key);
    return key;
  },

  async keys(callback) {
    const results = await usePromise(getStorage().sync.get, null);
    const keys = Object.keys(results);

    if (callback) callback(keys);
    return keys;
  },

  async length(callback) {
    const results = await usePromise(getStorage().sync.get, null);
    const length = Object.keys(results).length;

    if (callback) callback(length);
    return length;
  },

  async removeItem(key, callback) {
    await usePromise(getStorage().sync.remove, key);
    if (callback) callback();
  },

  async setItem(key, value, callback) {
    await usePromise(getStorage().sync.set, { [key]: value });
    if (callback) callback();
  },
};

