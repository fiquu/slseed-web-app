/**
 * Local Storage service module.
 *
 * @module services/local-storage
 */

const { localStorage } = window;

export interface LocalStorage {
  key(index: number): string | null;
  get(key: string, def?: any): any;
  set(key: string, val: any): void;
  remove(key: string): void;
  clear(): void;
}

export default Object.freeze<LocalStorage>({
  /**
   * Sets a value into local storage. The value can be anything as it is
   * stringified to JSON, if possible, before being saved.
   *
   * @param {String} key The local storage key name to set.
   * @param {Mixed} val The value to set the key to.
   */
  set(key: string, val: any) {
    let value;

    try {
      value = JSON.stringify(val);
    } catch (ex) {
      value = val;
    }

    localStorage.setItem(key, value);
  },

  /**
   * Gets a value from local storage by it's key name.
   *
   * @param {String} key The key to retrieve the value from.
   * @param {String} def The default value to return if key is empty.
   *
   * @returns {Mixed} The retrieved value parsed as JSON if possible.
   */
  get(key: string, def?: any): any {
    const data: string = String(localStorage.getItem(key));
    let parsed: any;

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

  /**
   * Removes a key and its value.
   *
   * @param {String} key The key to delete.
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * Retrieves a key name by it's index.
   *
   * @param {Number} index The index key name to retrieve.
   */
  key(index: number): string | null {
    return localStorage.key(index);
  },

  /**
   * Clears the local storage.
   */
  clear(): void {
    localStorage.clear();
  }
});
