export default {
  _driver: 'webExtensionSyncStorage',
  _support: !!(chrome && chrome.storage && chrome.storage.sync),
  _initStorage() {
    return Promise.resolve();
  },
  clear(callback) {
    browser.storage.sync.clear();

    if (callback) callback();

    return Promise.resolve();
  },
  iterate(iterator, callback) {
    return browser.storage.sync
      .get(null)
      .then(items => {
        const keys = Object.keys(items);

        keys.forEach((key, i) => iterator({ [key]: items[key] }, i));

        if (callback) callback();
      });
  },
  getItem(key, callback) {
    return browser.storage.sync
      .get(key)
      .then(result => (
        typeof key === 'string' ? result[key] : result
      ))
      .then(callback);
  },
  key(n, callback) {
    return browser.storage.sync
      .get(null)
      .then(results => {
        const key = Object.keys(results)[n];

        if (callback) callback(key);

        return key;
      });
  },
  keys(callback) {
    return browser.storage.sync
      .get(null)
      .then(results => {
        const keys = Object.keys(results);

        if (callback) callback(keys);

        return keys;
      });
  },
  length(callback) {
    return browser.storage.sync
      .get(null)
      .then(results => {
        const length = Object.keys(results).length;

        if (callback) callback(length);

        return length;
      });
  },
  removeItem(key, callback) {
    return browser.storage.sync
      .remove(key)
      .then(callback);
  },
  setItem(key, value, callback) {
    return browser.storage.sync
      .set({ [key]: value })
      .then(callback);
  },
};

