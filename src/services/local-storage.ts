const { localStorage } = window;

export type JSONValue = unknown | string | number | unknown[] | string[] | number[] | null | undefined;

export default Object.freeze({
  /**
   * Sets a value into local storage. The value can be anything as it is
   * stringified to JSON, if possible, before being saved.
   *
   * @param {string} key The local storage key name to set.
   * @param {any} val The value to set the key to.
   */
  set(key: string, val: JSONValue): void {
    let value: string;

    try {
      value = JSON.stringify(val);
    } catch (ex) {
      value = String(val);
    }

    localStorage.setItem(key, value);
  },

  /**
   * Gets a value from local storage by it's key name.
   *
   * @param {string} key The key to retrieve the value from.
   * @param {string} def The default value to return if key is empty.
   *
   * @returns {any} The retrieved value parsed as JSON if possible.
   */
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

  /**
   * Removes a key and its value.
   *
   * @param {string} key The key to delete.
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * Retrieves a key name by it's index.
   *
   * @param {number} index The index key name to retrieve.
   *
   * @returns {string|null} The key name if exists.
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
