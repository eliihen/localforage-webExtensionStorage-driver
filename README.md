# LocalForage WebExtension chrome.storage driver

[![Build Status](https://travis-ci.org/esphen/localforage-webExtensionStorage-driver.svg?branch=master)](https://travis-ci.org/esphen/localforage-webExtensionStorage-driver)
[![npm version](https://badge.fury.io/js/localforage-webextensionstorage-driver.svg)](https://badge.fury.io/js/localforage-webextensionstorage-driver)

This project adds a webextension driver to localForage

## Usage

```javascript
import localforage from 'localforage';
import syncDriver from 'localforage-webextensionstorage-driver/sync';

localforage
  .defineDriver(syncDriver)
  .then(() => localforage.setDriver('webExtensionSyncStorage'));
// When this promise resolves, a new driver should be set
```

## API

|Import Path                                 |Driver Name (`setDriver`)|Description                      |
|--------------------------------------------|-------------------------|---------------------------------|
|localforage-webextensionstorage-driver/local|webExtensionLocalStorage |chrome/browser.local storage area|
|localforage-webextensionstorage-driver/sync |webExtensionSyncStorage  |chrome/browser.sync storage area |
