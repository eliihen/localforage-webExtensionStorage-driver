/**
 * @jest-environment jsdom
 */

import localforage from 'localforage';

import localDriver from '../src/local';
import resetMocks from '../setupTests';
import iterator from '../lib/testIterator';

beforeEach(resetMocks);

it('should accept the driver into localForage', () => {
  return localforage.defineDriver(localDriver);
});

describe('local', () => {
  let testStore;

  beforeAll(() => {
    testStore = localforage.createInstance({
      name: 'localtest',
      driver: null,
    });

    return testStore
      .defineDriver(localDriver)
      .then(() => new Promise(resolve => setTimeout(resolve)))
      .then(() => testStore.setDriver('webExtensionLocalStorage'));
  });

  describe('clear', () => {
    it('should clear the store and call callback', () => {
      const spy = jest.fn();
      return testStore.clear(spy).then(() => {
        expect(spy).toHaveBeenCalled();
        expect(window.chrome.storage.local.clear).toHaveBeenCalled();
      });
    });

    it('should clear the store and call promise', () => {
      const result = testStore.clear();
      expect(result).toBeInstanceOf(Promise);

      return result.then(() => {
        expect(window.chrome.storage.local.clear).toHaveBeenCalled();
      });
    });
  });

  describe('setItem', () => {
    it('should set an item into the store and call callback', () => {
      const spy = jest.fn();
      return testStore.setItem('foo', 'bar', spy).then(() => {
        expect(spy).toHaveBeenCalled();
        expect(window.chrome.storage.local.set).toHaveBeenCalledWith({
          foo: 'bar'
        });
      });
    });

    it('should set an item into the store and call promise', () => {
      const result = testStore.setItem('foo', 'bar2');
      expect(result).toBeInstanceOf(Promise);

      return result.then(() => {
        expect(window.chrome.storage.local.set).toHaveBeenCalledWith({
          foo: 'bar2'
        });
      });
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the store and call callback', () => {
      const spy = jest.fn();
      return testStore.removeItem('foo', spy).then(() => {
        expect(spy).toHaveBeenCalled();
        expect(window.chrome.storage.local.remove).toHaveBeenCalledWith('foo');
      });
    });

    it('should remove an item from the store and call promise', () => {
      const result = testStore.removeItem('foo');
      expect(result).toBeInstanceOf(Promise);

      return result.then(() => {
        expect(window.chrome.storage.local.remove).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('getItem', () => {
    it('should get an item from the store and call callback', () => {
      const spy = jest.fn();
      return testStore.getItem('foo', spy).then(() => {
        expect(spy).toHaveBeenCalledWith(null, 'qrux');
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith('foo');
      });
    });

    it('should get an item from the store and call promise', () => {
      const result = testStore.getItem('foo');
      expect(result).toBeInstanceOf(Promise);

      return result.then(result => {
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith('foo');
        expect(result).toEqual('qrux');
      });
    });

    it('should return null in callback and promise if data is not set', () => {
      const spy = jest.fn();
      return testStore.getItem('bar', spy).then((promiseResult) => {

        // validate callback
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(null, null); // first null for no error, second for ret

        // validate promise
        expect(promiseResult).toBeNull();
      });
    });
  });

  describe('key', () => {
    it('should get a key from the store and call callback', () => {
      const spy = jest.fn();
      return testStore.key(0, spy).then(() => {
        expect(spy).toHaveBeenCalledWith('foobar');
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);

        return testStore.key(1, spy);
      }).then(() => {
        expect(spy).toHaveBeenCalledWith('walpole');
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
      });
    });

    it('should get a key from the store and call promise', () => {
      const result = testStore.key(0);
      expect(result).toBeInstanceOf(Promise);

      return result.then(result => {
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
        expect(result).toEqual('foobar');
      });
    });
  });

  describe('keys', () => {
    it('should get keys from the store and call callback', () => {
      const spy = jest.fn();
      return testStore.keys(spy).then(() => {
        expect(spy).toHaveBeenCalledWith(['foobar', 'walpole']);
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
      });
    });

    it('should get keys from the store and call promise', () => {
      const result = testStore.keys();
      expect(result).toBeInstanceOf(Promise);

      return result.then(result => {
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
        expect(result).toEqual(['foobar', 'walpole']);
      });
    });
  });

  describe('iterate', () => {
    it('should iterate over the store and call callback', () => {
      const spy = jest.fn();

      return testStore.iterate(iterator, spy).then(() => {
        expect(spy).toHaveBeenCalled();
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
      });
    });

    it('should iterate over the store and call promise', () => {
      const result = testStore.iterate(iterator);
      expect(result).toBeInstanceOf(Promise);

      return result.then(() => {
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('length', () => {
    it('should return the length of the store and call callback', () => {
      const spy = jest.fn();
      return testStore.length(spy).then(() => {
        expect(spy).toHaveBeenCalledWith(2);
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
      });
    });

    it('should return the length of the store and call promise', () => {
      const result = testStore.length();
      expect(result).toBeInstanceOf(Promise);

      return result.then(result => {
        expect(window.chrome.storage.local.get).toHaveBeenCalledWith(null);
        expect(result).toEqual(2);
      });
    });
  });
});
