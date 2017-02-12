/**
 * Need to invoke a function at runtime instead of import-time to make tests
 * pass with mocked browser and chrome objects
 */
export function getStorage() {
  return (window.browser && browser.storage)
    || (window.chrome && chrome.storage);
}

/**
 * Need to invoke a function at runtime instead of import-time to make tests
 * pass with mocked browser and chrome objects
 */
function usesPromises() {
  const storage = getStorage();
  try {
    return storage
      && storage.local.get
      && storage.local.get()
      && typeof storage.local.get().then === 'function';
  } catch(e) {
    return false;
  }
}

/**
 * Converts a callback-based API to a promise based API.
 * For now we assume that there is only one arg in addition to the callback
 */
export function usePromise(fn, arg) {
  if (usesPromises()) {
    return fn(arg);
  }

  return new Promise(resolve => {
    fn(arg, (...data) => {
      resolve(...data);
    });
  });
}

