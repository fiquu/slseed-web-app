/**
 * Realtime service.
 *
 * @module services/realtime
 */

// import Ably from 'ably/browser/static/ably-commonjs.js';
const Ably = require('ably/browser/static/ably-commonjs'); // Won't work with import :/

import config from '@/configs/realtime';

let clients = 0;
let client;

/**
 * Connects the realtime client.
 *
 * @returns {Promise} The connection promise.
 */
function connect() {
  clients++;

  return new Promise((resolve, reject) => {
    if (!client) {
      client = new Ably.Realtime(config.key);
    }

    if (client.connection.state === 'connected') {
      console.info('Realtime client already connected.');

      resolve(client);

      return;
    }

    client.connection.on('connected', () => resolve(client));
    client.connection.on('failed', reject);
  });
}

/**
 * Closes the realtime client connection if no clients are connected.
 *
 * @returns {Promise} The connection promise.
 */
function disconnect() {
  return new Promise(resolve => {
    if (--clients > 0) {
      console.warn(`Not closing connection since there are ${clients} clients connected.`);

      resolve();

      return;
    }

    if (client) {
      client.connection.close();

      client.connection.on(stateChange => {
        if (stateChange.current === 'closed') {
          console.info('Realtime connection closed.');

          /* Remove all event listeners */
          client.connection.off();

          resolve();
        }
      });
    }
  });
}

/**
 * Subscribes to a topic on a channel.
 *
 * @param {String} channel The channel name to subscribe on.
 * @param {String} topic The topic name to subscribe to.
 * @param {Function} callback The callback for message received.
 *
 * @returns {Object} The channel object.
 */
function subscribe(channel, topic, callback) {
  const ch = client.channels.get(`${config.namespace}:${channel}`);

  console.info(`Subscribing to "${topic}" on "${config.namespace}:${channel}"`);

  ch.subscribe(topic, callback);

  return ch;
}

/**
 * Unsubscribes from a topic on a channel.
 *
 * @param {String} channel The channel name to unsubscribe on.
 * @param {String} topic The topic name to unsubscribe from.
 * @param {Function} callback The same callback provided for message received.
 *
 * @returns {Object} The channel object.
 */
function unsubscribe(channel, topic, callback) {
  const ch = client.channels.get(`${config.namespace}:${channel}`);

  console.info(`Unsubscribing from "${topic}" on "${config.namespace}:${channel}"`);

  ch.unsubscribe(topic, callback);

  return ch;
}

/**
 * Retrieves the current client.
 *
 * @returns {Object} Realtime client.
 */
function getClient() {
  return client;
}

export default {
  getClient,

  unsubscribe,
  disconnect,
  subscribe,
  connect
};
