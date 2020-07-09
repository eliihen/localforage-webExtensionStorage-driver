import { getStorage, usePromise } from './utils';

export default function createDriver(name, property) {
  const storage = getStorage();
  const support = !!(storage && storage[property]);

  const driver = support ? storage[property] : {
    clear() {},
    get() {},
    remove() {},
    set() {},
  };
  const clear = driver.clear.bind(driver);
  const get = driver.get.bind(driver);
  const remove = driver.remove.bind(driver);
  const set = driver.set.bind(driver);

  return {
    _driver: name,
    _support: support,
    _initStorage() {
      return Promise.resolve();
    },

    async clear(callback) {
      clear();

      if (callback) callback();
    },

    async iterate(iterator, callback) {
      const items = await usePromise(get, null);
      const keys = Object.keys(items);
      keys.forEach((key, i) => iterator({ [key]: items[key] }, i));

      if (callback) callback();
    },

    async getItem(key, callback) {
      let result = await usePromise(get, key);
      result = typeof key === 'string' ? result[key] : result;
      result = result === undefined ? null : result;

      if (callback) callback(result);
      return result;
    },

    async key(n, callback) {
      const results = await usePromise(get, null);
      const key = Object.keys(results)[n];

      if (callback) callback(key);
      return key;
    },

    async keys(callback) {
      const results = await usePromise(get, null);
      const keys = Object.keys(results);

      if (callback) callback(keys);
      return keys;
    },

    async length(callback) {
      const results = await usePromise(get, null);
      const length = Object.keys(results).length;

      if (callback) callback(length);
      return length;
    },

    async removeItem(key, callback) {
      await usePromise(remove, key);
      if (callback) callback();
    },

    async setItem(key, value, callback) {
      await usePromise(set, { [key]: value });
      if (callback) callback();
    },
  };
}
