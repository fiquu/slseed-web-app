/**
 * Registries service module.
 *
 * @module services/registries
 */
import { KEYS } from '@/services/consts';

/**
 * Checks if a Registry's unique identifier is of a new one.
 *
 * @param {String} _id The unique identifier to check for.
 *
 * @returns {Boolean} Whether the unique identifier is of a new one.
 */
export function isNew(_id) {
  return /^new_[\w\d]+$/.test(_id);
}

/**
 * Generates a valid data storage key.
 *
 * @param {String} _id The unique identifier to generate for.
 *
 * @returns {String} The generated storage key.
 */
export function getDataStoreKey(_id) {
  return KEYS.REGISTRIES.CORE.STORAGE_DATA.replace('%s', _id);
}

/**
 * Generates a valid meta storage key.
 *
 * @param {String} _id The unique identifier to generate for.
 *
 * @returns {String} The generated storage key.
 */
export function getMetaStoreKey(_id) {
  return KEYS.REGISTRIES.CORE.STORAGE_META.replace('%s', _id);
}

export default {
  getDataStoreKey,
  getMetaStoreKey,
  isNew
};
