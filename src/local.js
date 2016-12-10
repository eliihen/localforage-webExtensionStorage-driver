export default {
  _driver: 'webExtensionLocalStorage',
  _support: !!chrome && !!chrome.storage && !!chrome.storage.local,
  _initStorage() {
    return Promise.resolve();
  },
  clear(callback) {
    chrome.storage.local.clear();

    if (callback) callback();

    return Promise.resolve();
  },
  iterate(iterator, callback) {
    return chrome.storage.local
      .get(null)
      .then(JSON.parse)
      .then(items => {
        const keys = Object.keys(items);

        keys.forEach((key, i) => iterator({ [key]: items[key] }, i));

        if (callback) callback();
      });
  },
  getItem(key, callback) {
    return chrome.storage.local
      .get(key)
      .then(JSON.parse)
      .then(callback);
  },
  key(n, callback) {
    return chrome.storage.local
      .get(null)
      .then(JSON.parse)
      .then(results => {
        const key = Object.keys(results)[n];

        if (callback) callback(key);

        return key;
      });
  },
  keys(callback) {
    return chrome.storage.local
      .get(null)
      .then(JSON.parse)
      .then(results => {
        const keys = Object.keys(results);

        if (callback) callback(keys);

        return keys;
      });
  },
  length(callback) {
    return chrome.storage.local
      .get(null)
      .then(JSON.parse)
      .then(results => {
        const length = Object.keys(results).length;

        if (callback) callback(length);

        return length;
      });
  },
  removeItem(key, callback) {
    return chrome.storage.local
      .remove(key)
      .then(callback);
  },
  setItem(key, value, callback) {
    return chrome.storage.local
      .set({[key]: JSON.stringify(value)})
      .then(callback);
  }
}

