/**
 * Local Storage service module.
 *
 * @module services/local-storage
 */

const { localStorage } = window;

export type JSONValue = object | string | number | object[] | string[] | number[] | null | undefined;

export interface LocalStorage {
  /**
   * Retrieves a key name by it's index.
   *
   * @param {number} index The index key name to retrieve.
   */
  key(index: number): string | null;

  /**
   * Gets a value from local storage by it's key name.
   *
   * @param {string} key The key to retrieve the value from.
   * @param {string} def The default value to return if key is empty.
   *
   * @returns {any} The retrieved value parsed as JSON if possible.
   */
  get(key: string, def?: JSONValue): JSONValue;

  /**
   * Sets a value into local storage. The value can be anything as it is
   * stringified to JSON, if possible, before being saved.
   *
   * @param {string} key The local storage key name to set.
   * @param {any} val The value to set the key to.
   */
  set(key: string, val: JSONValue): void;

  /**
   * Removes a key and its value.
   *
   * @param {string} key The key to delete.
   */
  remove(key: string): void;

  /**
   * Clears the local storage.
   */
  clear(): void;
}

export default Object.freeze<LocalStorage>({
  set(key: string, val: JSONValue): void {
    let value: string;

    try {
      value = JSON.stringify(val);
    } catch (ex) {
      value = String(val);
    }

    localStorage.setItem(key, value);
  },

  get(key: string, def?: JSONValue): JSONValue {
    const data = String(localStorage.getItem(key));
    let parsed: JSONValue;

    try {
      parsed = JSON.parse(data);
    } catch (ex) {
      parsed = data;
    }

    if (!parsed) {
      return def;
    }

    return parsed;
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  key(index: number): string | null {
    return localStorage.key(index);
  },

  clear(): void {
    localStorage.clear();
  }
});