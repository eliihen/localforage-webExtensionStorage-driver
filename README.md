# LocalForage WebExtension chrome.storage driver

[![Build Status](https://travis-ci.org/esphen/localforage-webExtensionStorage-driver.svg?branch=master)](https://travis-ci.org/esphen/localforage-webExtensionStorage-driver)
[![npm version](https://badge.fury.io/js/localforage-webextensionstorage-driver.svg)](https://badge.fury.io/js/localforage-webextensionstorage-driver)

This project adds a webextension driver to localForage

## Usage

### Using a module bundler:

```javascript
import localforage from 'localforage';
import syncDriver from 'localforage-webextensionstorage-driver/sync';

localforage
  .defineDriver(syncDriver)
  .then(() => localforage.setDriver('webExtensionSyncStorage'));
// When this promise resolves, a new driver should be set
```

### Using plain javascript:

This project was not originally intended to be used without a module bundler
like webpack, so the result will be a larger file if you do it this way.
However, if you wish to do so, you can find a browser compatible file on the
[releases][releases] page.

There is an example of how use this [here][example].


## Install
```bash
$ npm install --save localforage-webextensionstorage-driver
```

## API

|Import Path                                 |Driver Name (`setDriver`)|Description                      |
|--------------------------------------------|-------------------------|---------------------------------|
|localforage-webextensionstorage-driver/local|webExtensionLocalStorage |chrome/browser.local storage area|
|localforage-webextensionstorage-driver/sync |webExtensionSyncStorage  |chrome/browser.sync storage area |

[releases]: https://github.com/esphen/localforage-webExtensionStorage-driver/releases
[example]: https://github.com/esphen/localforage-driver-example

