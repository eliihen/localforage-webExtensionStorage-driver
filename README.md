# LocalForage WebExtension chrome.storage driver

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

