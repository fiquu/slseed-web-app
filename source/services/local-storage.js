/**
 * Local Storage service module.
 *
 * @module services/local-storage
 */

import is from 'fi-is';

export default {
  /**
   * Sets a value into local storage. The value can be anything as it is
   * stringified to JSON, if possible, before being saved.
   *
   * @param {String} key The local storage key name to set.
   * @param {Mixed} val The value to set the key to.
   */
  set(key, val) {
    if (typeof key !== 'string') {
      throw new Error('The storage key must be a [String]!');
    }

    let value;

    try {
      value = JSON.stringify(val);
    } catch (ex) {
      value = val;
    }

    window.localStorage.setItem(key, value);
  },

  /**
   * Gets a value from local storage by it's key name.
   *
   * @param {String} key The key to retrieve the value from.
   * @param {String} def The default value to return if key is empty.
   *
   * @returns {Mixed} The retrieved value parsed as JSON if possible.
   */
  get(key, def) {
    if (typeof key !== 'string') {
      throw new Error('The storage key must be a [String]!');
    }

    const data = window.localStorage.getItem(key);
    let parsed;

    try {
      parsed = JSON.parse(data);
    } catch (ex) {
      parsed = data;
    }

    if (is.empty(parsed)) {
      return def;
    }

    return parsed;
  },

  /**
   * Removes a key and its value.
   *
   * @param {String} key The key to delete.
   */
  remove(key) {
    if (typeof key !== 'string') {
      throw new Error('The storage key must be a [String]!');
    }

    window.localStorage.removeItem(key);
  },

  /**
   * Retrieves a key name by it's index.
   *
   * @param {Number} index The index key name to retrieve.
   */
  key(index) {
    window.localStorage.key(index);
  },

  /**
   * Clears the local storage.
   */
  clear() {
    window.localStorage.clear();
  }
};
